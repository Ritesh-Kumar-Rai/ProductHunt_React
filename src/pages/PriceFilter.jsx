import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { Flex, Text, Box } from "@radix-ui/themes";
import Utility from "../Utils/Utility";

// Utility function for formatting currency
const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

const PriceFilter = ({ minLimit = 0, maxLimit = 5000, selectedPriceRange = [], onChange }) => {

    const [range, setRange] = useState(selectedPriceRange.length ? selectedPriceRange : [minLimit, maxLimit]); // user selected price range for filter


    // Main update function with validation
    const updateRange = (newMin, newMax) => {
        if (newMin > newMax) [newMin, newMax] = [newMax, newMin]; // auto-swap
        newMin = Math.max(minLimit, newMin);
        newMax = Math.min(maxLimit, newMax);
        setRange([newMin, newMax]);
    };

    const handleInputChange = (index, value) => {
        const newValue = +value || 0;
        if (index === 0) updateRange(newValue, range[1]);
        else updateRange(range[0], newValue);
    };

    // Notify parent (onValueCommit or onBlur)
    const notifyParent = useMemo(() => Utility.debounce((newRange) => {
        if (onChange) onChange(newRange);
        console.log(newRange)
    }, 300), [onChange]);

    return (
        <Box className="w-full p-4 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900">
            <Text weight="bold" size="3" className="mb-2 block">
                Price Range
            </Text>

            {/* Slider */}
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                min={minLimit}
                max={maxLimit}
                step={50}
                value={range}
                onValueChange={(values) => updateRange(values[0], values[1])}
                onValueCommit={(values) => notifyParent(values)}
            >
                <Slider.Track className="bg-gray-300 dark:bg-gray-700 relative grow rounded-full h-[4px]">
                    <Slider.Range className="absolute bg-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-4 h-4 bg-white border-2 border-indigo-500 rounded-full hover:scale-110 transition-transform"
                    aria-label="Min Price"
                />
                <Slider.Thumb
                    className="block w-4 h-4 bg-white border-2 border-indigo-500 rounded-full hover:scale-110 transition-transform"
                    aria-label="Max Price"
                />
            </Slider.Root>

            {/* Display values */}
            <Flex justify="between" mt="3" align="center">
                <Box>
                    <Text size="2" weight='bold' mr='1' color="gray">Min</Text>
                    <input
                        type="number"
                        min={minLimit}
                        max={maxLimit}
                        step={50}
                        value={range[0]}
                        onChange={(e) => handleInputChange(0, e.target.value)}
                        onBlur={() => notifyParent(range)}
                        className="w-24 mt-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 p-1 text-center bg-white dark:bg-gray-800"
                    />
                </Box>
                <Text size="2" color="gray" className="mx-2">to</Text>
                <Box>
                    <Text size="2" weight='bold' mr='1' color="gray">Max</Text>
                    <input
                        type="number"
                        min={minLimit}
                        max={maxLimit}
                        step={50}
                        value={range[1]}
                        onChange={(e) => handleInputChange(1, e.target.value)}
                        onBlur={() => notifyParent(range)}
                        className="w-24 mt-1 text-sm rounded-md border border-gray-300 dark:border-gray-700 p-1 text-center bg-white dark:bg-gray-800"
                    />
                </Box>
            </Flex>

            {/* Display formatted range */}
            <Text size="2" color="gray" mt="2" className="block text-center">
                {formatPrice(range[0])} - {formatPrice(range[1])}
            </Text>
        </Box>
    );
};

export default PriceFilter;
