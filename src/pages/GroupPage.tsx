import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import MembersTab from "components/MembersTab";
import TestsTab from "components/TestsTab";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GroupService from "services/GroupService";
import { Group } from "types/Group";

const GroupPage: React.FC = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);

  const fetchGroup = useCallback(async () => {
    if (!groupId) {
      return;
    }
    const group = await GroupService.getGroupById(groupId);
    setGroup(group);
  }, [groupId]);

  useEffect(() => {
    fetchGroup();
  }, [groupId, fetchGroup]);

  return (
    <>
      <Flex flex={1} direction={"column"} position={"relative"}>
        <Breadcrumb size={"lg"} separator={"/"}>
          <BreadcrumbItem>
            <BreadcrumbLink to='/groups' as={Link}>
              Groups
            </BreadcrumbLink>
          </BreadcrumbItem>
          {group && (
            <BreadcrumbItem>
              <BreadcrumbLink as={Link}>{group.title}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Tabs isLazy mt={4} variant='enclosed'>
          <TabList>
            <Tab>Tests</Tab>
            <Tab>Grades</Tab>
            <Tab>Members</Tab>
          </TabList>
          {group && (
            <TabPanels>
              <TabPanel p={0}>
                <TestsTab groupId={group.id} />
              </TabPanel>

              <TabPanel>
                <p>GradesTab</p>
              </TabPanel>

              <TabPanel p={0}>
                <MembersTab group={group} />
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Flex>
    </>
  );
};

export default GroupPage;
