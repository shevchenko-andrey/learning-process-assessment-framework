import { Box } from "@chakra-ui/react";
import SearchInput from "components/SearchInput";
import UserCard from "components/UserCard";
import { useEffect, useMemo, useState } from "react";
import UserService from "services/UserService";
import { ApplicationUser } from "types/User";

const UsersPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<ApplicationUser[]>([]);

  const editUser = async (user: ApplicationUser) => {
    try {
      await UserService.updateUser(user);
      const users = await UserService.getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserService.getAllUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(
    () => users.filter((user) => user.email.includes(query)),
    [users, query]
  );

  return (
    <Box as='ul'>
      <SearchInput query={query} onChange={setQuery} />
      {filteredUsers.map((user) => (
        <Box mt={4} as='li' key={user.id}>
          <UserCard user={user} editUser={editUser} />
        </Box>
      ))}
    </Box>
  );
};

export default UsersPage;
