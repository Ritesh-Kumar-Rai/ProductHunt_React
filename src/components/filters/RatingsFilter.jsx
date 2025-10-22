import { Flex, Select, Text } from "@radix-ui/themes";
import { FaStar } from "react-icons/fa6";

const RatingsFilter = () => {
    return (
        <Flex direction="column" gap="2" className="py-2 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-900">
            <Text size='2' weight='bold' mb='1' mr='2'>Ratings</Text>
            <Select.Root defaultValue="0">
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="0">Select Ratings</Select.Item>
                    <Select.Item value="2">
                        <span className="flex items-center gap-2">
                            <FaStar color="gold" />   2.0 and above
                        </span>
                    </Select.Item>
                    <Select.Item value="3">
                        <span className="flex items-center gap-2">
                            <FaStar color="gold" />   3.0 and above
                        </span>
                    </Select.Item>
                    <Select.Item value="4">
                        <span className="flex items-center gap-2">
                            <FaStar color="gold" />   4.0 and above
                        </span>
                    </Select.Item>
                </Select.Content>
            </Select.Root>
        </Flex>
    )
}

export default RatingsFilter;