export type Group = {
  id: string;
  title: string;
  teacherName?: string;
  members: string[]
};

export type Member = {
  id: string;
  studentId: string;
  email?: string;
};
