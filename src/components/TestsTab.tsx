import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useTestManagement } from "hooks/useTestManagement";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import GroupService from "services/GroupService";
import { ApplicationRole } from "types/Auth";
import { Test } from "types/Test";
import ProtectedContent from "./ProtectedContent";
import SearchInput from "./SearchInput";
import TestCard from "./TestCard";

interface TestTabProps {
  groupId: string;
}

const TestTab: React.FC<TestTabProps> = ({ groupId }) => {
  const [query, setQuery] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const { tests } = useTestManagement();
  const [isLoading, setIsLoading] = useState(false);
  const [groupTests, setGroupTests] = useState<Test[]>([]);

  const fetchGroupTests = useCallback(async () => {
    setIsLoading((prev) => !prev);
    const groupTests = await GroupService.getAllGroupTests(groupId);
    setGroupTests(groupTests);
    setIsLoading((prev) => !prev);
  }, [groupId]);

  const assignTest = async (testId: string) => {
    await GroupService.assignTest({ groupId, testId });
    await fetchGroupTests();
  };

  useEffect(() => {
    fetchGroupTests();
  }, [fetchGroupTests]);

  const filteredTests = useMemo(
    () =>
      tests.filter(
        ({ title, id }) =>
          title.includes(query) && groupTests.every((test) => test.id !== id)
      ),
    [groupTests, query, tests]
  );

  return (
    <>
      <ProtectedContent
        roles={[ApplicationRole.ADMIN, ApplicationRole.TEACHER]}
      >
        <Flex
          rightIcon={<MdAssignmentAdd />}
          mt={4}
          as={Button}
          gap={2}
          onClick={onToggle}
        >
          <Text>Assign a test</Text>
        </Flex>
        {groupTests.length === 0 && !isLoading && (
          <Text py={10}>You don't have any group tests yet</Text>
        )}
      </ProtectedContent>
      <Stack as={"ul"} py={4}>
        {groupTests.map((test) => (
          <Box key={test.id} as={"li"} mt={4}>
            <TestCard
              testId={test.id}
              title={test.title}
              onClickMenu={console.log}
            />
          </Box>
        ))}
      </Stack>
      <Modal size={"full"} isOpen={isOpen} onClose={onToggle}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Assign a test</ModalHeader>
          <ModalBody>
            <SearchInput
              placeholder='Search tests'
              query={query}
              onChange={setQuery}
            />
            {filteredTests.map((test) => (
              <Box
                p={4}
                boxShadow={"5px 9px 21px 16px rgba(158,153,158,0.3)"}
                key={test.id}
                as={"li"}
                mt={4}
              >
                <Flex justify={"space-between"} align={"center"}>
                  <Box>
                    <Text>{test.title}</Text>
                    <Text>Questions: {test.questions.length}</Text>
                  </Box>
                  <Button onClick={() => assignTest(test.id)}>
                    <Text>Assign</Text>
                  </Button>
                </Flex>
              </Box>
            ))}
            {filteredTests.length === 0 && (
              <Flex mt={4} align={"center"} gap={2}>
                <Text>Tests is not found.</Text>

                <Text color={"#61c6d8"} as={Link} to={"/teacher/tests"}>
                  Create a test?
                </Text>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TestTab;
