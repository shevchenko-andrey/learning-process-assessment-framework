import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import UserService from "services/UserService";
import { ApplicationRole } from "types/Auth";
import { ApplicationUser } from "types/User";
import SearchInput from "./SearchInput";

interface MemberEditorProps {
  members: ApplicationUser[];
  addMember: (studentId: string) => void;
}

const MemberEditor: React.FC<MemberEditorProps> = ({ members, addMember }) => {
  const [query, setQuery] = useState<string>("");
  const [students, setStudents] = useState<ApplicationUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const memberIds = useMemo(() => members.map(({ id }) => id), [members]);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading((prev) => !prev);
      const students = await UserService.getAllUsers({
        role: ApplicationRole.STUDENT
      });
      setStudents(students.filter(({ id }) => !memberIds.includes(id)));
      setIsLoading((prev) => !prev);
    };
    fetchStudents();
  }, [memberIds]);

  const filteredStudents = students.filter(
    ({ email, id }) =>
      email.includes(query) && !members.some((member) => member.id === id)
  );

  return (
    <Box minH={200} overflowY={"auto"}>
      <SearchInput
        placeholder='Search students'
        query={query}
        onChange={setQuery}
      />

      <Box mt={4}>
        {filteredStudents.length === 0 && !isLoading && (
          <Box as={"span"}>No students available</Box>
        )}
        {filteredStudents.map(({ id, email }) => (
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
              {email}
            </Text>
            <Box>
              <Button onClick={() => addMember(id)}>
                <IoPersonAdd />
              </Button>
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default MemberEditor;
