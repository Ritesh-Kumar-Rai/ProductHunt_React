import { Badge, Button, Container, Dialog, Flex, IconButton, Text, TextField, Tooltip } from '@radix-ui/themes';
import React from 'react';
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";


const Search_Filter = () => {

    // const [img,setImg] = React.useState('');

   /* React.useEffect(()=>{
        const controller = new AbortController();
        const url = 'https://dummyjson.com/products?limit=10&skip=0&delay=5000';
        fetch(url, { signal: controller?.signal})
        .then((res) => res.json())
        .then((res)=>{
            console.log(res);
            setImg(res?.products[0]?.thumbnail);
        })
        .catch(console.error);

        return () => controller.abort();

    },[]);*/
    
    return (
        <section>
            <Container mb='5'>
                <Flex gap='2' align='center' justify='between'>

                    <TextField.Root placeholder="Search the products…" size='3' className='w-full'>
                        <TextField.Slot side='right'>
                            <IconButton variant='soft' color='cyan' onClick={() => alert('search btn clicked')}>
                                <FaSearch height={16} width={16} /> 
                            </IconButton>
                        </TextField.Slot>
                    </TextField.Root>
                    {/* filter component */}
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
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Name
                                    </Text>
                                    <TextField.Root
                                        defaultValue="Freja Johnsen"
                                        placeholder="Enter your full name"
                                    />
                                </label>
                                <label>
                                    <Text as="div" size="2" mb="1" weight="bold">
                                        Email
                                    </Text>
                                    <TextField.Root
                                        defaultValue="freja@example.com"
                                        placeholder="Enter your email"
                                    />
                                </label>
                            </Flex>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="red" style={{cursor: 'pointer'}}>
                                        Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button style={{cursor: 'pointer'}}>Save</Button>
                                </Dialog.Close>
                            </Flex>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>

                {/* badges  */}
                <Flex gap='2' className='mt-2' align='center' justify='end' wrap='wrap'>
                    <Badge color='indigo' radius='large'><b>Category:</b> Electronics <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150'cursor='pointer' /></Badge>
                    <Badge color='red' radius='large'><b>Color:</b> Red <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='blue' radius='large'><b>Brand:</b> Samsung <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='gold' radius='large'><b>Rating:</b> 3+ <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='mint' radius='large'><b>Price:</b> ₹4500+ <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Badge color='grass' radius='large'><b>Stock Status:</b> InStock <RiCloseCircleFill className='hover:scale-150 transition-transform duration-150' cursor='pointer' /></Badge>
                    <Button variant='soft' color='crimson' size='1' radius='full' style={{cursor: 'pointer'}}> <MdFilterAltOff /> Clear All</Button>
                </Flex>
            </Container>
        </section>
    )
}

export default Search_Filter;