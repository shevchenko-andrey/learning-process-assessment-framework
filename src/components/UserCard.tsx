import { Avatar, Flex, Select, Stack, Text } from "@chakra-ui/react";
import { ApplicationRole } from "types/Auth";
import { ApplicationUser } from "types/User";

interface UserCardProps {
  user: ApplicationUser;
  editUser: (user: ApplicationUser) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  editUser
}) => {
  return (
    <Stack>
      <Flex align={"center"} gap={5}>
        <Avatar />
        <Text flex={1}>{user.email}</Text>
      </Flex>
      <Flex align={"center"} gap={4}>
        Role:
        <Select
          maxW={"fit-content"}
          value={user.role}
          onChange={(e) => editUser({...user, role: e.target.value as ApplicationRole})}
        >
          <option value={ApplicationRole.STUDENT}>Student</option>
          <option value={ApplicationRole.TEACHER}>Teacher</option>
          <option value={ApplicationRole.ADMIN}>Admin</option>
        </Select>
      </Flex>
    </Stack>
  );
};

export default UserCard;
