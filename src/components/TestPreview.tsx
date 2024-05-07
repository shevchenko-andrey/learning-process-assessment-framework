import {
  Box,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { Test } from "types/Test";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import TestEditor from "./TestEditor";

interface TestPreviewProps {
  test: Test;
  updateTest: (update: Test) => void;
  deleteTest: (id: string) => void;
}

const TestPreview: React.FC<TestPreviewProps> = ({
  test,
  updateTest,
  deleteTest
}) => {
  const [editable, setEditable] = useState<boolean>(false);

  const { isOpen, onToggle } = useDisclosure();

  const toggleEditable = () => {
    setEditable((prev) => !prev);
  };

  const handleDeleteTest = () => {
    onToggle();
    deleteTest(test.id);
  };

  return (
    <>
      <Card boxShadow={"5px 9px 21px 16px rgba(158,153,158,0.3)"}>
        <CardBody>
          <Stack>
            {!editable && (
              <>
                <Flex gap={2} align={"center"}>
                  <Text>Title:</Text>
                  <Text>{test.title}</Text>
                </Flex>
                <Flex gap={2} align={"center"}>
                  <Text>Questions:</Text>
                  <Text>{test.questions.length}</Text>
                </Flex>
              </>
            )}
            {editable && (
              <TestEditor
                updateTest={updateTest}
                deleteTest={handleDeleteTest}
                test={test}
              />
            )}
          </Stack>
          <Box
            onClick={toggleEditable}
            position={"absolute"}
            right={4}
            top={4}
            as={"button"}
          >
            <MdModeEditOutline />
          </Box>
        </CardBody>
      </Card>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onToggle={onToggle}
        onDelete={handleDeleteTest}
      />
    </>
  );
};

export default TestPreview;
