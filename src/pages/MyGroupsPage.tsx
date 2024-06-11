import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import AddButton from "components/AddButton";
import GroupPreview from "components/GroupPreview";
import ProtectedContent from "components/ProtectedContent";
import WidgetJoinGroup from "components/WidgetJoinGroup";
import { useAuth } from "hooks/useAuth";
import { useCallback, useEffect, useState } from "react";
import GroupService from "services/GroupService";
import { ApplicationRole } from "types/Auth";
import { Group } from "types/Group";
import { v4 as uuid } from "uuid";

const TeacherGroupPage: React.FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [groups, setGroups] = useState<Group[]>([]);
  const { currentUser, role } = useAuth();

  const fetchGroups = useCallback(async () => {
    const groups = await GroupService.getAllUserGroups();
    setGroups(groups);
  }, []);

  const addGroup = async (group: Group) => {
    await GroupService.createGroup(group);
    await fetchGroups();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const title = data.get("title") as string;
    const teacherName = data.get("teacherName") as string;

    if (title && teacherName) {
      addGroup({ id: uuid(), title, teacherName, members: [] });
      onToggle();
    }
  };

  const handleRemoveGroup = async (groupId: string) => {
    await GroupService.deleteGroup(groupId);
    await fetchGroups();
  };
  const handleLeaveGroup = async (groupId: string) => {
    await GroupService.removeMemberFromGroup(groupId, currentUser?.uid ?? "");
    await fetchGroups();
  };

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <>
      <Flex flex={1} direction={"column"} position={"relative"}>
        <ProtectedContent
          roles={[ApplicationRole.ADMIN, ApplicationRole.TEACHER]}
        >
          <Text fontWeight={500} fontSize={"lg"}>
            Create a group
          </Text>
          <Flex>
            <AddButton onClick={onToggle} />
          </Flex>

          {groups.length === 0 && (
            <Text py={10}>You don't have any groups yet</Text>
          )}
        </ProtectedContent>
        <ProtectedContent roles={[ApplicationRole.STUDENT]}>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme={"blue"}>Join a group</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <WidgetJoinGroup handleRefetchAllGroups={fetchGroups} />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {groups.length === 0 && role === ApplicationRole.STUDENT && (
            <Text py={10}>You are not a member of any group yet</Text>
          )}
        </ProtectedContent>
        <Stack as={"ul"} py={4}>
          {groups.map((group) => (
            <Box key={group.id} as={"li"} mt={4}>
              <GroupPreview
                handleRemoveGroup={handleRemoveGroup}
                handleLeaveGroup={handleLeaveGroup}
                group={group}
              />
            </Box>
          ))}
        </Stack>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a group</ModalHeader>
          <ModalBody mb={4}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <Input
                  isRequired
                  type='text'
                  name={"title"}
                  placeholder='Group title'
                />
                <Input
                  isRequired
                  type='text'
                  name={"teacherName"}
                  placeholder='Teacher name'
                />

                <Button type={"submit"} colorScheme={"blue"}>
                  Create
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeacherGroupPage;
