import {
  Box,
  Button,
  Checkbox,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Select,
  Text
} from "@chakra-ui/react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { IoIosRemoveCircle } from "react-icons/io";
import { Option, Test } from "types/Test";
import { v4 as uuid } from "uuid";

interface OptionEditorProps {
  index: number;
  form: UseFormReturn<Test>;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

const OptionEditor: React.FC<OptionEditorProps> = ({ index, form }) => {
  const {
    fields: options,
    remove,
    update
  } = useFieldArray({
    control: form.control,
    name: `questions.${index}.options`
  });

  const questionType = form.watch(`questions.${index}.type`);
  const addAnswer = (optionId: string, checked: boolean) => {
    const answer = {
      optionId,
      questionId: form.getValues(`questions.${index}.id`)
    };

    if (questionType === "radio") form.setValue(`answers`, [answer]);

    const answers = form
      .getValues(`answers`)
      .filter(({ optionId }) => optionId !== answer.optionId);

    if (checked) answers.push(answer);

    if (questionType === "checkboxes") form.setValue(`answers`, answers);
  };

  const addOption = () => {
    update(options.length, { id: uuid(), title: "" });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

  const updateOption = (optionIndex: number, option: Option) => {
    update(optionIndex, option);
  };
  return (
    <>
      <ul>
        {options.map((option, optionIndex) => (
          <li key={option.id}>
            <Box>
              <Flex gap={2} align={"center"}>
                <Text fontSize={"md"}>{alphabet[optionIndex]}</Text>
                <Editable defaultValue={`Option № ${optionIndex}`}>
                  <EditablePreview />
                  <EditableTextarea
                    onChange={() => updateOption(optionIndex, option)}
                  />
                </Editable>
                <button onClick={() => removeOption(optionIndex)}>
                  <IoIosRemoveCircle size={20} />
                </button>
              </Flex>
              {questionType === "checkboxes" && (
                <Checkbox
                  type='checkbox'
                  onChange={(e) => addAnswer(option.id, e.target.checked)}
                >
                  Right answer
                </Checkbox>
              )}
            </Box>
          </li>
        ))}
      </ul>
      {questionType !== "unselected" && (
        <Button maxW={"fit-content"} onClick={addOption}>
          Add option
        </Button>
      )}
      {questionType === "radio" && options.length !== 0 && (
        <Flex align={"center"} gap={4}>
          <Text>Right answer:</Text>
          <Select
            maxW={"fit-content"}
            onChange={(e) => addAnswer(e.target.value, true)}
          >
            {options.map((option, index) => (
              <option key={option.id} value={option.id}>
                {alphabet[index]}
              </option>
            ))}
          </Select>
        </Flex>
      )}
    </>
  );
};

export default OptionEditor;
