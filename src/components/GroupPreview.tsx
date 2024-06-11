import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ApplicationRole } from "types/Auth";
import { Group } from "types/Group";
import ProtectedContent from "./ProtectedContent";
import ThreeDotsMenu from "./ThreeDotsMenu";

interface GroupPreviewProps {
  group: Group;
  handleRemoveGroup: (groupId: string) => void;
  handleLeaveGroup: (groupId: string) => void;
}

const GroupPreview: React.FC<GroupPreviewProps> = ({
  group,
  handleRemoveGroup,
  handleLeaveGroup
}) => {
  return (
    <Card
      overflow={"hidden"}
      boxShadow={"5px 9px 21px 16px rgba(158,153,158,0.3)"}
      minH={200}
      position={"relative"}
    >
      <CardHeader bg='blueviolet' p={0}>
        <Flex
          align={"center"}
          gap={2}
          justify={"space-between"}
          px={4}
          pt={4}
          pb={10}
        >
          <Text
            fontWeight={600}
            fontSize={30}
            as={"h2"}
            noOfLines={1}
            maxWidth={{ base: 200, md: 300 }}
          >
            {group.title}
          </Text>
          <Box zIndex={2}>
            <Menu>
              <MenuButton>
                <ThreeDotsMenu />
              </MenuButton>
              <MenuList>
                <ProtectedContent
                  roles={[ApplicationRole.TEACHER, ApplicationRole.ADMIN]}
                >
                  <MenuItem onClick={() => handleRemoveGroup(group.id)}>
                    Remove
                  </MenuItem>
                </ProtectedContent>
                <ProtectedContent roles={[ApplicationRole.STUDENT]}>
                  <MenuItem onClick={() => handleLeaveGroup(group.id)}>
                    Leave the group
                  </MenuItem>
                </ProtectedContent>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        {group?.teacherName && (
          <Text
            mt={{ base: 4, md: 0 }}
            noOfLines={1}
            maxW={{ base: 136, sm: 220 }}
            fontWeight={500}
            fontSize={"md"}
          >
            {group.teacherName}
          </Text>
        )}
        <Avatar
          position={"absolute"}
          top={12}
          right={{ base: 10, sm: 14 }}
          size={"xl"}
          name={group.teacherName}
        />
        <Box
          as={Link}
          to={`/groups/${group.id}`}
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={1}
        />
      </CardBody>
    </Card>
  );
};

export default GroupPreview;
