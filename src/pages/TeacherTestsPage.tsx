import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import TestPreview from "components/TestPreview";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import TestService from "services/TestService";
import { Test } from "types/Test";
import { v4 as uuid } from "uuid";

const TeacherTestsPage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);

  const addTest = () => {
    const newTest: Test = {
      id: uuid(),
      title: "Untitled Test",
      questions: [],
      answers: []
    };
    setTests([...tests, newTest]);
  };

  const fetchTests = useCallback(async () => {
    const tests = await TestService.getAllTests();
    setTests(tests);
  }, []);

  const updateTest = async (update: Test) => {
    await TestService.updateTest(update);
    await fetchTests();
  };

  const deleteTest = async (id: string) => {
    await TestService.deleteTest(id);
    await fetchTests();
  };

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return (
    <>
      <Flex flex={1} direction={"column"} position={"relative"}>
        <Text fontWeight={500} fontSize={"lg"}>
          Create a test
        </Text>
        <Flex onClick={addTest}>
          <Center
            as='button'
            color={"gray.400"}
            borderColor={"gray.400"}
            borderStyle={"dashed"}
            borderRadius={"md"}
            borderWidth={3}
            p={6}
            _hover={{ borderColor: "primary", color: "primary" }}
          >
            <FaPlus size={30} />
          </Center>
        </Flex>
        {tests.length === 0 && (
          <Text py={10}>You don't have any tests yet</Text>
        )}
        <Stack as={"ul"} py={4}>
          {tests.map((test) => (
            <Box key={test.id} as={"li"} mt={4}>
              <TestPreview
                test={test}
                updateTest={updateTest}
                deleteTest={deleteTest}
              />
            </Box>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default TeacherTestsPage;
