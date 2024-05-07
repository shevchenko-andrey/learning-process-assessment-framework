export type QuestionType = "unselected" | "radio" | "checkboxes";

export type Test = {
  id: string;
  title: string;
  questions: Question[];
  answers: Answer[];
};

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  options: Option[];
};

export type Option = {
  id: string;
  title: string;
};

export type Answer = {
  questionId: string;
  optionId: string;
};
