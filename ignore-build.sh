#!/usr/bin/env bash
#
# ignore-build.sh
# Exit 0 to SKIP the build (when only non-code files changed)
# Exit 1 to CONTINUE the build (when code changed or when skipping is unsafe)
#
# Behaviour:
# - Only attempts to skip builds for Vercel production deployments (VERCEL_ENV=production).
# - For other environments (preview, development, or unset) it will return 1 so builds continue.
# - It fetches enough git history (Vercel does a shallow clone) to compare commits reliably.
# - Adjust the PATHS variable to include any other docs/config files you want to treat as "non-code".
#
# NOTE: Update the PATHS list if you want to add LICENSE, CONTRIBUTING.md, etc.

set -eu

# Files/directories that are considered "docs/config" only
PATHS=("docs/" "README.md")

# If you want to run this for previews too, change this to allow preview
# Currently we only allow skipping for production deployments to be safer.
if [ "${VERCEL_ENV:-}" != "production" ]; then
  # Not production – do not skip builds (return non-zero so Vercel proceeds)
  exit 1
fi

# Ensure we have enough history to compare; Vercel shallow-clones with depth=10 by default.
# Try to fetch more history safely (no-op if already present).
git fetch --no-tags --depth=50 origin +refs/heads/*:refs/remotes/origin/* >/dev/null 2>&1 || true

# Determine the commit range to compare.
# Prefer comparing HEAD against main (or origin/main) when available, otherwise fallback to HEAD^.
BASE=""
if git rev-parse --verify origin/main >/dev/null 2>&1; then
  BASE="origin/main"
elif git rev-parse --verify main >/dev/null 2>&1; then
  BASE="main"
else
  # fallback to previous commit
  BASE="HEAD^"
fi

# Build the git diff command with the selected paths
DIFF_CMD=(git diff --quiet "$BASE" HEAD -- "${PATHS[@]}")

# The logic:
# - If there are NO changes outside the specified PATHS, we want to skip.
# - git diff --quiet returns 0 when there are NO differences in the specified paths.
# To determine "only docs changed" we check if any non-doc files changed by using a reverse check:
#
# Strategy:
# 1) Check if there are any changes outside PATHS by running `git diff --name-only $BASE HEAD`
# 2) Filter out the PATHS and see if anything remains.
#
CHANGED_FILES=$(git diff --name-only "$BASE" HEAD || true)

if [ -z "$CHANGED_FILES" ]; then
  # No changes at all — nothing to build
  exit 0
fi

# Check if any changed file is NOT inside one of the PATHS entries
non_doc_changed=0
while IFS= read -r file; do
  skip=0
  for p in "${PATHS[@]}"; do
    # treat directory paths and file paths
    if [[ "$p" == */ ]]; then
      # directory pattern: check prefix
      if [[ "$file" == "$p"* ]]; then skip=1; break; fi
    else
      # file: exact or path suffix
      if [[ "$file" == "$p" ]]; then skip=1; break; fi
    fi
  done
  if [ $skip -eq 0 ]; then
    non_doc_changed=1
    break
  fi
done <<< "$CHANGED_FILES"

if [ $non_doc_changed -eq 0 ]; then
  # Only PATHS changed (docs/ README.md etc.) -> skip the build
  echo "Ignored build: only documentation/config files changed."
  exit 0
else
  # Some code or other files changed -> proceed with build
  exit 1
fi
