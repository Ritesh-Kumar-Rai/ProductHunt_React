import { Badge, Button, Container, Dialog, Flex, IconButton, Separator, TextField, Tooltip } from '@radix-ui/themes';
import { useMemo, useRef, useState } from 'react';

import { FaSearch, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import RatingsFilter from './filters/RatingsFilter';
import StockFilter from './filters/StockFilter';
import PriceFilter from './filters/PriceFilter';
import CheckboxFilter from './filters/CheckboxFilter';
import { useFilterContext } from '../context/FilterContext';

const minLimit = 0;
const maxLimit = 5000;

class SearchFilterError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "SearchFilterError";
    };
};

const colorsOfBadges = {
    category: 'indigo',
    brand: 'tomato',
    rating: 'gold',
    stockConsidered: 'grass',
    priceRange: 'mint'
};

const Search_Filter = ({ all_brands_list, categories_list = [] }) => {

    const [selectedCategory, setSelectedCategory] = useState([]); // user selected categories for filter
    const [selectedBrand, setSelectedBrand] = useState([]); // user selected brands for filter
    const [selectedRating, setSelectedRating] = useState('0'); // user selected rating for filter 
    const [selectedStockAvailability, setSelectedStockAvailability] = useState(''); // user selected rating for filter
    const [selectedRange, setSelectedRange] = useState([minLimit, maxLimit]); // user selected price range for filter


    const { setSearchQuery, appliedFilters, updateAppliedFilters, resetFilters } = useFilterContext(); // getting values from filterContext

    const searchInput = useRef(null);

    const handleSearch = () => {
        try {
            const input_value = searchInput.current.value;
            setSearchQuery(input_value);

        } catch (error) {
            console.error(error);
        }
    };

    const onApplyFilters = () => {
        updateAppliedFilters('category', selectedCategory);
        updateAppliedFilters('brand', selectedBrand);
        if (selectedRating != '0') {
            updateAppliedFilters('rating', selectedRating);
        } else if (appliedFilters.rating != '0') {
            updateAppliedFilters('rating');
        }
        updateAppliedFilters('stockConsidered', selectedStockAvailability);
        if (selectedRange[0] !== minLimit || selectedRange[1] !== maxLimit) {
            updateAppliedFilters('priceRange', selectedRange);
        } else if (appliedFilters.priceRange != [minLimit, maxLimit]) {
            updateAppliedFilters('priceRange');
        }
    };

    // if (!searchQuery.length) {
    //     if (searchInput.current && searchInput.current.value.length) {
    //         alert(searchInput.current.value.length)
    //         searchInput.current.value = '';
    //     }
    // }

    // function to reset all states/filters
    const onClearAll = () => {
        resetFilters();
        setSelectedCategory([]);
        setSelectedBrand([]);
        setSelectedRating('0');
        setSelectedStockAvailability('');
        setSelectedRange([minLimit, maxLimit]);
    };

    const onClearOne = (keyname) => {
        try {
            if (!keyname) throw SearchFilterError("`keyname` required before deletion of filter!");

            updateAppliedFilters(keyname);;

            switch (keyname) {
                case 'category':
                    setSelectedCategory([]);
                    break;
                case 'brand':
                    setSelectedBrand([]);
                    break;
                case 'rating':
                    setSelectedRating('0');
                    break;
                case 'stockConsidered':
                    setSelectedStockAvailability('');
                    break;
                case 'priceRange':
                    setSelectedRange([minLimit, maxLimit]);
                    break;
                default:
                    throw new SearchFilterError(`None of the KeyName was matched for '${keyname}' keyname!`);
            };
        } catch (error) {
            console.error(`${error.name} -> ${error.message}`);
        }
    };

    const hasActiveFilters = useMemo(() => {
        return Object.entries(appliedFilters).some(([_, value]) => {
            if (Array.isArray(value)) {
                return value.length > 0 && value.some(v => v !== null && v !== undefined);
            }
            if (typeof value === 'string') {
                return value.trim() !== '' && value !== '0';
            }
            return Boolean(value);
        });
    }, [appliedFilters]);


    return (
        <section>
            <Container mb='5'>
                <Flex gap='2' align='center' justify='between'>

                    {/* searchbar component */}
                    <TextField.Root placeholder="Search the products…" ref={searchInput} size='3' className='w-full'>
                        <TextField.Slot side='right'>
                            <IconButton variant='soft' color='cyan' onClick={handleSearch}>
                                <FaSearch height={16} width={16} />
                            </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                    {/* filters dialog */}
                    <Dialog.Root>
                        <Tooltip content="apply filters to products">
                            <Dialog.Trigger>
                                <IconButton variant='soft' style={{ cursor: 'pointer' }}> <FaFilter /> </IconButton>
                            </Dialog.Trigger>
                        </Tooltip>

                        <Dialog.Content maxWidth="450px">
                            <Dialog.Title>Apply Filter</Dialog.Title>
                            <Dialog.Description size="2" mb="4" color='gray'>
                                The selected filters will be applied to search results and list of products both.
                            </Dialog.Description>
                            <Flex direction="column" gap="3">
                                <Separator mb='2' size='4' />

                                {/* filter components */}
                                {/* filter for category */}
                                <CheckboxFilter data_list={categories_list} selectedDataFilter={selectedCategory} setSelectedDataFilter={setSelectedCategory} label_name='Category' color_for_checkboxes='gray' className="py-2 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900" />
                                {/* filter for brand names */}
                                <CheckboxFilter data_list={all_brands_list} selectedDataFilter={selectedBrand} setSelectedDataFilter={setSelectedBrand} label_name='Brand' height={100} className='py-2' />
                                <RatingsFilter selectedRating={selectedRating} setSelectedRating={setSelectedRating} />
                                <StockFilter selectedStock={selectedStockAvailability} setSelectedStock={setSelectedStockAvailability} />
                                <PriceFilter minLimit={minLimit} maxLimit={maxLimit} selectedPriceRange={selectedRange} onChange={setSelectedRange} />
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="red" style={{ cursor: 'pointer' }}>
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClick={onApplyFilters} style={{ cursor: 'pointer' }}>Apply</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>

                {/* badges  */}
                <Flex gap='2' className='mt-2' align='center' justify='end' wrap='wrap'>

                    {Object?.entries(appliedFilters).map(([key, value]) => {

                        if (value.length) {
                            if (Array.isArray(value)) {
                                const organisedValue = value.toSpliced(2).toString().replaceAll(',', ', '); // only 2 value in a string

                                const visibleValues = value.slice(0, 2);
                                const remainingCount = Math.max(0, value.length - 2);


                                return <Badge key={key} color={colorsOfBadges[key]} radius='large'
                                    title={key + ': ' + value.join(', ')}><b>{key}:</b>
                                    <span className='max-w-[180px] font-medium truncate'>
                                        {visibleValues.join(', ')}
                                    </span>
                                    {value.length > 2 && <span className='font-bold bg-inherit p-0.5 rounded-sm'>{remainingCount}+</span>}
                                    <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150 shrink-0' cursor='pointer'
                                        onClick={() => onClearOne(key)} /></Badge>;
                            } else {
                                return <Badge key={key} color={colorsOfBadges[key]} radius='large'><b>{key}:</b> {value} <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer'
                                    onClick={() => onClearOne(key)} /></Badge>;
                            }
                        }
                        return null;
                    })}
                    {hasActiveFilters && <Button variant='soft' color='crimson' size='1' radius='full' onClick={onClearAll} style={{ cursor: 'pointer' }}> <MdFilterAltOff /> Clear All</Button>}
                </Flex>
            </Container>
        </section >
    )
}

export default Search_Filter;