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
  useDisclosure,
} from "@chakra-ui/react";
import { UilEye, UilTrashAlt } from "@iconscout/react-unicons";
import RequestCardDetailsModal from "./RequestCardDetailsModal";

const RequestCard = ({ bgColor = "gray.50" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card as="form" my={2} bgColor={bgColor}>
        <CardBody>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4 }}
          >
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam,
              autem?
            </Text>
            <Flex width="100%" gap="1rem" justifyContent={{ base: "end" }}>
              <Button size="sm" leftIcon={<UilEye />} onClick={onOpen}>
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
      <RequestCardDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default RequestCard;
