import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { IoChatbubbleEllipses, IoPersonRemoveSharp } from "react-icons/io5";
import { ApplicationRole } from "types/Auth";
import ProtectedContent from "./ProtectedContent";

interface MemberCardProps {
  email: string;
  studentId: string;
  handleRemoveMember: (studentId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  email,
  studentId,
  handleRemoveMember
}) => {
  return (
    <Flex
      p={2}
      border={"1px solid #cad1da"}
      borderRadius={8}
      shadow={"md"}
      gap={2}
      justify={"space-between"}
      align={"center"}
    >
      <Flex align={"center"} gap={2}>
        <Avatar name={email} />

        <Text
          maxWidth={{ base: 160, sm: "100%" }}
          textOverflow={"ellipsis"}
          noOfLines={1}
        >
          {email}
        </Text>
      </Flex>

      <ProtectedContent
        roles={[ApplicationRole.ADMIN, ApplicationRole.TEACHER]}
      >
        <Box p={2} as={"button"} onClick={() => handleRemoveMember(studentId)}>
          <IoPersonRemoveSharp />
        </Box>
      </ProtectedContent>
      <ProtectedContent roles={[ApplicationRole.STUDENT]}>
        <Box p={2} as={"a"} href={`mailto:${email.toLowerCase()}`}>
          <IoChatbubbleEllipses size={20} />
        </Box>
      </ProtectedContent>
    </Flex>
  );
};

export default MemberCard;
