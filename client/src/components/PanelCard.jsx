import React from "react";
import {
  Box,
  Heading,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Flex,
} from "@chakra-ui/react";

const PanelCard = ({ value, cardHeader, cardBody, bgColor }) => {
  return (
    <Card flex={{ md: "1" }} py={4} bgColor={bgColor}>
      <CardBody>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading as="h3" fontSize="3xl" color="orange.500">
            {cardBody}
          </Heading>
          <Heading as="h2" fontSize="lg" fontWeight="semibold">
            {cardHeader}
          </Heading>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PanelCard;
