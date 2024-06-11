import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import GroupService from "services/GroupService";
import { ApplicationRole } from "types/Auth";
import { Group } from "types/Group";
import MemberCard from "./MemberCard";
import MemberEditor from "./MemberEditor";
import ProtectedContent from "./ProtectedContent";
import { ApplicationUser } from "types/User";

interface MembersTabProps {
  group: Group;
}

const MembersTab: React.FC<MembersTabProps> = ({ group }) => {
  const [members, setMembers] = useState<ApplicationUser[]>([]);
  const { isOpen, onToggle } = useDisclosure();

  const fetchGroupMembers = useCallback(async () => {
    const members = await GroupService.getAllGroupMembers(group.id);
    setMembers(members);
  }, [group.id]);

  const handleAddMember = async (studentId: string) => {
    const isMemberExist = members.some(
      (member) => member.id === studentId
    );
    if (isMemberExist) return;
    await GroupService.addMembersToGroup(group.id, studentId);
    await fetchGroupMembers();
  };

  const handleRemoveMember = async (studentId: string) => {
    await GroupService.removeMemberFromGroup(group.id, studentId);
    await fetchGroupMembers();
  };

  useEffect(() => {
    fetchGroupMembers();
  }, [group.id, fetchGroupMembers]);

  return (
    <>
      <ProtectedContent
        roles={[ApplicationRole.ADMIN, ApplicationRole.TEACHER]}
      >
        <Flex
          as={"button"}
          justify={"space-between"}
          align={"center"}
          gap={2}
          my={4}
          onClick={onToggle}
        >
          <IoMdPersonAdd size={40} />
          <Text>Add members</Text>
        </Flex>
      </ProtectedContent>

      {members.map(({ id, email }) => (
        <Box key={id} mt={4}>
          <MemberCard
            email={email ?? "No email found"}
            studentId={id}
            handleRemoveMember={handleRemoveMember}
          />
        </Box>
      ))}
      <Modal isCentered isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <ModalHeader>Add members</ModalHeader>
            <MemberEditor members={members} addMember={handleAddMember} />

            <ModalCloseButton onClick={onToggle} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MembersTab;
