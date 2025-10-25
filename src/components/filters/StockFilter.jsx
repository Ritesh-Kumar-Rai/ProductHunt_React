import { Flex, RadioCards, Text } from "@radix-ui/themes";


const StockFilter = ({ selectedStock, setSelectedStock }) => {
    return (
        <Flex direction="column" gap="2">
            <Text size="2" weight="bold" mb="1">Stock Availability</Text>
            <RadioCards.Root color="green" size='1' value={selectedStock} onValueChange={setSelectedStock}>
                <RadioCards.Item value="In Stock"><span className="text-green-600">In Stock</span></RadioCards.Item>
                <RadioCards.Item value="Low Stock"><span className="text-red-600">Low Stock</span></RadioCards.Item>
            </RadioCards.Root>
        </Flex>
    )
}

export default StockFilter