import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import GroupService from "services/GroupService";
import { Group } from "types/Group";
import SearchInput from "./SearchInput";

interface WidgetJoinGroupProps {
  handleRefetchAllGroups: () => void;
}

const WidgetJoinGroup: React.FC<WidgetJoinGroupProps> = ({
  handleRefetchAllGroups
}) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const { currentUser } = useAuth();

  const fetchAvailableGroups = useCallback(async () => {
    setIsLoading((prev) => prev);
    const groups = await GroupService.getAllAvailableToJoinGroups();
    setGroups(groups);
    setIsLoading((prev) => !prev);
  }, []);

  const handleJoinGroup = async (groupId: string) => {
    await GroupService.addMemberToGroup(groupId, currentUser?.uid ?? "");
    await fetchAvailableGroups();
    await handleRefetchAllGroups();
  };

  useEffect(() => {
    fetchAvailableGroups();
  }, [fetchAvailableGroups]);

  const filteredGroups = groups.filter(({ title }) => title.includes(query));

  return (
    <Box minH={200} overflowY={"auto"}>
      <SearchInput
        placeholder='Search available groups'
        query={query}
        onChange={setQuery}
      />

      <Box mt={4}>
        {filteredGroups.length === 0 && !isLoading && (
          <Box as={"span"}>No groups available</Box>
        )}
        {filteredGroups.map(({ id, title }) => (
          <Flex
            key={id}
            align={"center"}
            justify={"space-between"}
            _notLast={{ marginBottom: 2 }}
            p={2}
          >
            <Text
              noOfLines={1}
              textOverflow={"ellipsis"}
              maxW={{ base: "170px", sm: "100%" }}
            >
              {title}
            </Text>
            <Box>
              <Button onClick={() => handleJoinGroup(id)}>
                <MdGroupAdd />
              </Button>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default WidgetJoinGroup;
