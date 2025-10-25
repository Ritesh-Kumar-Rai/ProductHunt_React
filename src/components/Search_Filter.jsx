import { Badge, Button, Container, Dialog, Flex, IconButton, Separator, TextField, Tooltip } from '@radix-ui/themes';
import { useRef, useState } from 'react';

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

const Search_Filter = ({ all_brands_list, categories_list = [] }) => {

    const [selectedCategory, setSelectedCategory] = useState([]); // user selected categories for filter
    const [selectedBrand, setSelectedBrand] = useState([]); // user selected brands for filter
    const [selectedRating, setSelectedRating] = useState('0'); // user selected rating for filter 
    const [selectedStockAvailability, setSelectedStockAvailability] = useState(''); // user selected rating for filter
    const [selectedRange, setSelectedRange] = useState([minLimit, maxLimit]); // user selected price range for filter


    const { setSearchQuery, updateAppliedFilters, resetFilters } = useFilterContext(); // getting values from filterContext

    const searchInput = useRef(null);

    const handleSearch = () => {
        try {
            const input_value = searchInput.current.value;
            console.log(input_value, typeof (input_value), input_value.length);
            setSearchQuery(input_value);

        } catch (error) {
            console.error(error);
        }
    };

    const onApplyFilters = () => {
        updateAppliedFilters('category', selectedCategory);
        updateAppliedFilters('brand', selectedBrand);
        if (parseFloat(selectedRating) > 1) updateAppliedFilters('rating', selectedRating);
        updateAppliedFilters('stockConsidered', selectedStockAvailability);
        if (selectedRange[0] !== minLimit && selectedRange[1] !== maxLimit) updateAppliedFilters('priceRange', selectedRange);
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
                    <Badge color='indigo' radius='large'><b>Category:</b> Electronics <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='red' radius='large'><b>Color:</b> Red <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='blue' radius='large'><b>Brand:</b> Samsung <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='gold' radius='large'><b>Rating:</b> 3+ <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='mint' radius='large'><b>Price:</b> ₹4500+ <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' onClick={() => setSelectedRange([])} /></Badge>
                    <Badge color='grass' radius='large'><b>Stock Status:</b> InStock <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Button variant='soft' color='crimson' size='1' radius='full' onClick={onClearAll} style={{ cursor: 'pointer' }}> <MdFilterAltOff /> Clear All</Button>
                </Flex>
            </Container>
        </section>
    )
}

export default Search_Filter;