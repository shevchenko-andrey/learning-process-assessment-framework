import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Test } from "types/Test";
import { v4 as uuid } from "uuid";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import QuestionEditor from "./QuestionEditor";

interface TestEditorProps {
  test: Test;
  updateTest: (update: Test) => void;
  deleteTest: () => void;
}

const TestEditor: React.FC<TestEditorProps> = ({
  test,
  updateTest,
  deleteTest
}) => {
  const form = useForm<Test>({
    mode: "onBlur",
    defaultValues: test
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDeleteModal, onToggle: onToggleDeleteModal } =
    useDisclosure();

  const {
    fields: questions,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: "questions"
  });

  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const handleUpdateQuestion = async (questionIndex: number) => {
    await setQuestionIndex(questionIndex);
    onOpen();
  };

  const addQuestion = async () => {
    await new Promise(() => {
      append({
        id: uuid(),
        title: "Untitled question",
        options: [],
        type: "unselected"
      });
      setQuestionIndex(questionIndex);
    });
  };

  const handleDeleteQuestion = async () => {
    await new Promise(() => {
      onToggleDeleteModal();
      onClose();
      remove(questionIndex);
    });
  };

  return (
    <Stack as={"form"} onSubmit={form.handleSubmit((test) => updateTest(test))}>
      <Flex gap={2} align={"center"}>
        <Text>Title:</Text>
        <Editable defaultValue={test.title}>
          <EditablePreview />
          <EditableInput px={2} {...form.register("title")} />
        </Editable>
      </Flex>
      <Text>Questions:</Text>
      <Stack direction={"row"} wrap={"wrap"} gap={2}>
        {questions.map(({ id }, index) => (
          <Button
            key={id}
            p={4}
            type='button'
            w={"fit-content"}
            onClick={() => handleUpdateQuestion(index)}
          >
            {index + 1}
          </Button>
        ))}

        <Button p={4} type='button' w={"fit-content"} onClick={addQuestion}>
          <FaPlus size={10} />
        </Button>
      </Stack>
      <ButtonGroup>
        <Button
          type='submit'
          maxW={"fit-content"}
          bg={"gray.300"}
          _hover={{ bg: "blue.300" }}
        >
          Save
        </Button>
        <Button
          onClick={deleteTest}
          maxW={"fit-content"}
          bg={"gray.300"}
          _hover={{ bg: "red.300" }}
        >
          Delete
        </Button>
      </ButtonGroup>
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit question</ModalHeader>
          <ModalBody>
            {questions[questionIndex]?.id && (
              <QuestionEditor
                key={questions[questionIndex].id}
                index={questionIndex}
                form={form}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup w={"100%"}>
              <Button
                bg={"red.200"}
                maxW={"fit-content"}
                onClick={onToggleDeleteModal}
                _hover={{ bg: "red.400" }}
              >
                Delete
              </Button>
              <Button
                bg={"blue.200"}
                maxW={"fit-content"}
                onClick={onClose}
                _hover={{ bg: "blue.400" }}
              >
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmDeleteModal
        isOpen={isOpenDeleteModal}
        onToggle={onToggleDeleteModal}
        onDelete={handleDeleteQuestion}
      />
    </Stack>
  );
};

export default TestEditor;
