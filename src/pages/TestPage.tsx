import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const TestPage: React.FC = () => {
  const { id: testId } = useParams<{ id: string }>();
  return (
    <>
      <Flex flex={1} direction={"column"} position={"relative"}>
        Test page testId = {testId}
      </Flex>
    </>
  );
};

export default TestPage;
