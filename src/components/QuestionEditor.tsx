import {
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Select,
  Stack,
  Text
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { Test } from "types/Test";
import OptionEditor from "./OptionEditor";

interface QuestionEditorProps {
  index: number;
  form: UseFormReturn<Test>;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ index, form }) => {
  const questionType = form.watch(`questions.${index}.type`);

  return (
    <>
      <Stack>
        <Flex align={"center"} gap={2}>
          <Text>Question:</Text>
          <Editable defaultValue={"Untitled question"}>
            <EditablePreview />
            <EditableTextarea {...form.register(`questions.${index}.title`)} />
          </Editable>
        </Flex>
        <Flex align={"center"} gap={2}>
          <Text>Type:</Text>
          <Select
            {...form.register(`questions.${index}.type`)}
            placeholder='Select option'
            maxW={"fit-content"}
          >
            <option value='radio'>One choice</option>
            <option value='checkboxes'>Multiple choice</option>
          </Select>
        </Flex>
        <Stack>
          {questionType && (
            <>
              <Text>Options:</Text>
              <OptionEditor index={index} form={form} />
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default QuestionEditor;
