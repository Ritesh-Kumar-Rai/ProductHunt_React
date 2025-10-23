import { createContext, useCallback, useContext, useMemo, useState } from "react";

// custom error for filter context
class FilterContextError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "FilterContextError";
    };
};

const defaultFilters = {
    category: [], //[c1,c2, ...]
    brand: [],//[b1,b2, ...]
    rating: '',
    stockConsidered: '',
    priceRange: [], // [min,max]
};

const defaultValues = {
    searchQuery: '',
    setSearchQuery: () => { },
    appliedFilters: defaultFilters,
    updateAppliedFilters: () => { },
    resetFilters: () => { },
}; // default/blueprint values for context


const FilterContext = createContext(defaultValues);


// Provider
function FilterContextProvider({ children }) {

    const [search_query, set_search_query] = useState('');

    const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

    // method to update specific filters by it's keyname
    const updateAppliedFilters = useCallback((key, value) => {
        if (!key) return;

        setAppliedFilters((prev) => {
            return { ...prev, [key]: value ?? defaultFilters[key] }
        });
    }, []);

    // method to reset the all filters
    const resetFilters = useCallback(() => {
        setAppliedFilters(defaultFilters);
    }, []);


    // memoised context-values which will use in provider
    const contextValues = useMemo(() => ({
        searchQuery: search_query,
        setSearchQuery: set_search_query,
        appliedFilters,
        updateAppliedFilters,
        resetFilters
    }), [search_query, appliedFilters, updateAppliedFilters, resetFilters]);


    return (
        <FilterContext.Provider value={contextValues}>
            {children}
        </FilterContext.Provider>
    );
};

// custom hook
function useFilterContext() {
    const context_values = useContext(FilterContext);
    if (!context_values) {
        throw new FilterContextError("the FilterContext must used in Provider!");
    }

    return context_values;
}

export { FilterContextProvider, useFilterContext };