import React from "react";
import { Heading, Card, CardBody, Flex, Text } from "@chakra-ui/react";

const PanelCard = ({ total, title, type, bgColor }) => {
  return (
    <Card
      flex={{ md: "1" }}
      bgColor={bgColor}
      py={4}
      boxShadow=" 0px 3px 4px rgba(0, 0, 0, 0.25)"
    >
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

export default PanelCard;
