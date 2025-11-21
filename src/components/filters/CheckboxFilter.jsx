import { CheckboxGroup, Flex, ScrollArea, Text } from "@radix-ui/themes";

// here data_list is array which contains all cat_lists, while selectedDataFilter is State & setSelectedDataFilter is setterMethod for state.
// This component can be used by category filter and brand name filter 
const CheckboxFilter = ({ data_list = [], selectedDataFilter, setSelectedDataFilter, label_name = '', height = 120, color_for_checkboxes, className = '' }) => {

    return (
        <Flex direction="column" gap="2" className={className}>
            <Text size="2" weight="bold" mb="1">{label_name}</Text>
            <ScrollArea type="hover" scrollbars="vertical" style={{ height }}>

                <CheckboxGroup.Root
                    variant="soft"
                    color={color_for_checkboxes}
                    value={selectedDataFilter}
                    onValueChange={setSelectedDataFilter}
                    name="category-filter-options"
                >
                    <Flex direction="row" gap="3" wrap="wrap">
                        {data_list.length ? data_list?.map((data_name) => <CheckboxGroup.Item key={data_name} value={data_name}>{data_name}</CheckboxGroup.Item>) : <div className="h-20 w-full flex items-center justify-center" style={{ color: 'red' }}><b>No data to display {label_name}!</b></div>}
                    </Flex>
                </CheckboxGroup.Root>
            </ScrollArea>
        </Flex>
    )
}

export default CheckboxFilter;