import { Select } from "@radix-ui/themes";

const SortSelect = ({ sortOption, setSortOption }) => {
    return (
        <Select.Root value={sortOption} onValueChange={setSortOption}>
            <Select.Trigger />
            <Select.Content position="popper">
                <Select.Item value="relevance">Relevance</Select.Item>
                <Select.Item value="price-asc">Price: Low → High</Select.Item>
                <Select.Item value="price-desc">Price: High → Low</Select.Item>
                <Select.Item value="rating-desc">Rating: High → Low</Select.Item>
                <Select.Item value="title-asc">Alphabetical (A–Z)</Select.Item>
                <Select.Item value="title-desc">Alphabetical (Z–A)</Select.Item>
                <Select.Item value="discount-desc">Better Discount</Select.Item>
            </Select.Content>

        </Select.Root>
    )
}

export default SortSelect;