import React, { useState, useMemo } from "react";
import {
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  ModalBody,
  IconButton,
  GridItem,
  Grid,
  useToast,
} from "@chakra-ui/react";
import ModalContainer from "./ModalContainer";
import { UilEye, UilEdit, UilTrashAlt } from "@iconscout/react-unicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const DriverCard = ({ driver_data, name, borderRadius = "md" }) => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenUpdate, setOpenUpdate] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  const [mutationFunctionType, setMutationFunctionType] = useState("");

  const toast = useToast();
  const queryClient = useQueryClient();

  const memoizedData = useMemo(() => {
    return driver_data;
  }, [driver_data]);

  const id = memoizedData?._id;

  const email = memoizedData?.email;
  const firstname = memoizedData?.firstname;
  const lastname = memoizedData?.lastname;
  const fullname = firstname + " " + lastname;
  const user_type = memoizedData?.user_type;

  const handleMutationFunctionType = (data) => {
    let axiosMethod;

    switch (mutationFunctionType) {
      case "UPDATE":
        axiosMethod = axios.put;
        break;
      case "DELETE":
        axiosMethod = axios.delete;
    }

    return axiosMethod(
      `${ENDPOINT}auth/users/drivers/${driver_data?._id}`,
      data
    );
  };

  const mutation = useMutation({
    mutationFn: handleMutationFunctionType,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Ambulance update.",
        description: `Ambulance status is marked as ${toastStatus}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["drivers"]);
    },
  });

  const handleViewModal = () => {
    setOpen(!isOpen);
  };

  const handleEditModal = () => {
    setOpenUpdate(!isOpenUpdate);
    setMutationFunctionType("UPDATE");
  };

  const handleDeleteModal = () => {
    setOpenDelete(!isOpenDelete);
    setMutationFunctionType("DELETE");
  };

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={isOpen ? "orange.300" : "white"}
        borderRadius={borderRadius}
      >
        <CardBody>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            alignItems="center"
            gap={4}
          >
            <GridItem>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Driver:
                <Text as="span" ps={2} fontWeight="normal">
                  {name}
                </Text>
              </Heading>
            </GridItem>
            <GridItem>
              <Flex gap={2} justifyContent="flex-end">
                <Button
                  size="sm"
                  display="inline-flex"
                  gap={1}
                  width={{ base: "100%", md: "inherit" }}
                  px={6}
                  bgColor="custom.primary"
                  color="white"
                  _hover={{ bgColor: "orange.500" }}
                  onClick={handleViewModal}
                >
                  <UilEye color="white" /> View
                </Button>
                <IconButton
                  size="sm"
                  aria-label="Edit driver details"
                  onClick={handleEditModal}
                  icon={<UilEdit />}
                />
                <IconButton
                  size="sm"
                  aria-label="Delete driver details"
                  onClick={handleDeleteModal}
                  icon={<UilTrashAlt />}
                />
              </Flex>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      <ModalContainer
        header="Driver ID"
        header_detail={id}
        isOpen={isOpen}
        onClose={handleViewModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Driver:
            <Text
              as="span"
              ps={2}
              fontWeight="normal"
              textTransform="capitalize"
            >
              {fullname}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Email:
            <Text as="span" ps={2} fontWeight="normal">
              {email}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Type:
            <Text as="span" ps={2} fontWeight="normal">
              {user_type}
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>

      <ModalContainer
        header="Requestor ID"
        header_detail="pqoerjflsdakfn"
        isOpen={isOpenUpdate}
        onClose={handleEditModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Driver:
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Nero
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>

      <ModalContainer
        header="Requestor ID"
        header_detail="pqoerjflsdakfn"
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Driver:
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Nero
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default React.memo(DriverCard);
