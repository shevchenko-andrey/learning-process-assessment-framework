import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import AddButton from "components/AddButton";
import TestPreview from "components/TestPreview";
import { useTestManagement } from "hooks/useTestManagement";

const TeacherTestsPage: React.FC = () => {
  const { tests, isLoading, addTest, deleteTest, updateTest } =
    useTestManagement();

  return (
    <>
      <Flex flex={1} direction={"column"} position={"relative"}>
        <Text fontWeight={500} fontSize={"lg"}>
          Create a test
        </Text>
        <Flex>
          <AddButton onClick={addTest} />
        </Flex>
        {tests.length === 0 && !isLoading && (
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
