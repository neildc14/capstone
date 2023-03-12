import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { UilEye, UilTrashAlt } from "@iconscout/react-unicons";

const RequestCard = () => {
  return (
    <Card as="form" my={2} bgColor="gray.50">
      <CardBody>
        <Flex justifyContent="space-between">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam,
            autem?
          </Text>
          <Flex gap="1rem">
            <Button size="sm" leftIcon={<UilEye />}>
              View
            </Button>
            <Button
              size="sm"
              bgColor="red.500"
              color="gray.50"
              leftIcon={<UilTrashAlt />}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default RequestCard;
