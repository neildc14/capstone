import React from "react";
import {
  Box,
  Heading,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
} from "@chakra-ui/react";

const PersonnelPanelCard = ({ total, title, type, bgColor }) => {
  return (
    <Card flex={{ md: "1" }} bgColor={bgColor} py={4}>
      <CardBody>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h3" fontSize="3xl" color="orange.500">
            {total}
          </Heading>
          <Heading as="h2" fontSize="lg" fontWeight="semibold">
            {title}
          </Heading>
          <Text fontSize="sm">{type}</Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PersonnelPanelCard;
