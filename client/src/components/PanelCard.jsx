import React from "react";
import {
  Box,
  Heading,
  Divider,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

const PanelCard = ({ cardHeader, cardBody, bgColor }) => {
  return (
    <Card flex={{ md: "1" }} bgColor={bgColor}>
      <CardHeader>
        <Heading as="h2" fontSize="lg">
          {cardHeader}
        </Heading>
      </CardHeader>
      <CardBody pt={0}>
        <Heading as="h3" fontSize="5xl">
          {cardBody}
        </Heading>
      </CardBody>
    </Card>
  );
};

export default PanelCard;
