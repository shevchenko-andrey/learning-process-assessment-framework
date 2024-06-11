import { useCallback, useEffect, useState } from "react";
import TestService from "services/TestService";
import { Test } from "types/Test";
import { v4 as uuid } from "uuid";

export const useTestManagement = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setIsLoading((prev) => !prev);
    const tests = await TestService.getAllTests();
    setTests(tests);
    setIsLoading((prev) => !prev);
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
  return { tests, isLoading, addTest, updateTest, deleteTest };
};
