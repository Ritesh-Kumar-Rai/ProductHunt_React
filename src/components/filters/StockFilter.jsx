import { Flex, RadioCards, Text } from "@radix-ui/themes";


const StockFilter = () => {
    return (
        <Flex direction="column" gap="2">
            <Text size="2" weight="bold" mb="1">Stock Availability</Text>
            <RadioCards.Root color="green" size='1'>
                <RadioCards.Item value="in-stock"><span className="text-green-600">In Stock</span></RadioCards.Item>
                <RadioCards.Item value="outoff-stock"><span className="text-red-600">Out of Stock</span></RadioCards.Item>
            </RadioCards.Root>
        </Flex>
    )
}

export default StockFilter