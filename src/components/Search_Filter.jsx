import { Badge, Button, Container, Dialog, Flex, IconButton, Separator, TextField, Tooltip } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { FaSearch, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import RatingsFilter from './filters/RatingsFilter';
import StockFilter from './filters/StockFilter';
import PriceFilter from '../pages/PriceFilter';
import CheckboxFilter from './filters/CheckboxFilter';


const Search_Filter = ({ all_brands_list }) => {

    const [categories, setCategories] = useState([]);// all list of available categories will get restored by useEffect api called
    const [selectedCategory, setSelectedCategory] = useState([]); // user selected categories for filter
    const [selectedBrand, setSelectedBrand] = useState([]); // user selected brands for filter

    useEffect(() => {
        const controller = new AbortController();
        const url = "https://dummyjson.com/products/category-list";

        fetch(url, { signal: controller?.signal })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setCategories(res);
            })
            .catch(console.error);

        return () => controller.abort();

    }, []);

    return (
        <section>
            <Container mb='5'>
                <Flex gap='2' align='center' justify='between'>

                    {/* searchbar component */}
                    <TextField.Root placeholder="Search the products…" size='3' className='w-full'>
                        <TextField.Slot side='right'>
                            <IconButton variant='soft' color='cyan' onClick={() => alert('search btn clicked')}>
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
                                <CheckboxFilter data_list={categories} selectedDataFilter={selectedCategory} setSelectedDataFilter={setSelectedCategory} label_name='Category' color_for_checkboxes='gray' className="py-2 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900" />
                                {/* filter for brand names */}
                                <CheckboxFilter data_list={all_brands_list} selectedDataFilter={selectedBrand} setSelectedDataFilter={setSelectedBrand} label_name='Brand' height={100} className='py-2' />
                                <RatingsFilter />
                                <StockFilter />
                                <PriceFilter />



                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="red" style={{ cursor: 'pointer' }}>
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button style={{ cursor: 'pointer' }}>Apply</Button>
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
                    <Badge color='mint' radius='large'><b>Price:</b> ₹4500+ <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='grass' radius='large'><b>Stock Status:</b> InStock <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Button variant='soft' color='crimson' size='1' radius='full' style={{ cursor: 'pointer' }}> <MdFilterAltOff /> Clear All</Button>
                </Flex>
            </Container>
        </section>
    )
}

export default Search_Filter;