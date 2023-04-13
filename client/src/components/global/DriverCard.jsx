import React, { useState, useMemo } from "react";
import {
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  ModalBody,
  ModalFooter,
  IconButton,
  GridItem,
  Grid,
  useToast,
} from "@chakra-ui/react";
import ModalContainer from "./ModalContainer";
import { UilEye, UilTrashAlt } from "@iconscout/react-unicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const DriverCard = ({ driver_data, name, borderRadius = "md" }) => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [mutationFunctionType, setMutationFunctionType] = useState("");

  const toast = useToast();
  const queryClient = useQueryClient();

  const id = driver_data?.scheduled_personnel?._id ?? driver_data?._id;

  const {
    email = driver_data?.scheduled_personnel?.email,
    firstname = driver_data?.scheduled_personnel?.firstname,
    lastname = driver_data?.scheduled_personnel?.lastname,
    user_type = driver_data?.scheduled_personnel?.user_type,
  } = driver_data || {};

  const fullname = `${firstname} ${lastname}`;

  console.log(driver_data);

  const handleMutationFunctionType = (data) => {
    let axiosMethod;

    switch (mutationFunctionType) {
      case "UPDATE":
        axiosMethod = axios.put;
        break;
      case "DELETE":
        axiosMethod = axios.delete;
    }

    return axiosMethod(`${ENDPOINT}auth/users/drivers/${data}`);
  };

  const mutation = useMutation({
    mutationFn: handleMutationFunctionType,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Driver update.",
        description: `Ambulance status is successfully deleted.}`,
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

  const handleDeleteModal = (e) => {
    setOpenDelete(!isOpenDelete);
    setMutationFunctionType("DELETE");
  };

  const handleClickDeleteDriver = (e) => {
    e.preventDefault();
    mutation.mutate(id);
    setOpenDelete(!isOpenDelete);
  };

  return (
    <>
      {driver_data !== undefined && (
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
                    aria-label="Delete driver details"
                    onClick={handleDeleteModal}
                    icon={<UilTrashAlt />}
                  />
                </Flex>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      )}

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
              {fullname || driver_data.scheduled_pesonnel?.fullName}
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
        header="Driverr ID"
        header_detail={id}
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
      >
        <ModalBody my={4}>
          <Text my={4}>
            Are you sure that you want to delete this ambulance?
          </Text>
          <Button
            size={{ base: "sm", md: "md" }}
            width="100%"
            bgColor="red.600"
            _hover={{ bgColor: "red.700" }}
            color="white"
            fontWeight="semibold"
            onClick={handleClickDeleteDriver}
          >
            Delete
          </Button>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default DriverCard;
