import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import { MdAssignment } from "react-icons/md";
import { Link } from "react-router-dom";
import ThreeDotsMenu from "./ThreeDotsMenu";

interface TestCardProps {
  testId: string;
  title: string;
  onClickMenu: () => void;
}

const TestCard: React.FC<TestCardProps> = ({ testId, title, onClickMenu }) => {
  return (
    <Card boxShadow={"5px 9px 21px 16px rgba(158,153,158,0.3)"}>
      <CardBody>
        <Flex align={"center"} justify={"space-between"}>
          <Flex
            flex={1}
            as={Link}
            to={`/tests/${testId}`}
            align={"center"}
            gap={2}
          >
            <Box bg={"gray"} borderRadius={"100%"} p={2}>
              <MdAssignment color={"white"} />
            </Box>
            <Text
              noOfLines={1}
              textOverflow={"ellipsis"}
              maxWidth={{ base: 160, sm: "100%" }}
            >
              {title}
            </Text>
          </Flex>

          <ThreeDotsMenu onClickMenu={onClickMenu} />
        </Flex>
      </CardBody>
    </Card>
  );
};

export default TestCard;
