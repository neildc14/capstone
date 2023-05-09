import React, { useState, useContext } from "react";
import {
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  ModalBody,
  GridItem,
  Grid,
  Select,
  useToast,
} from "@chakra-ui/react";
import ModalContainer from "../global/ModalContainer";
import { UilEdit } from "@iconscout/react-unicons";
import useSelect from "../../hooks/useSelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelAmbulanceCard = ({
  ambulance_data,
  license_plate,
  borderRadius = "md",
}) => {
  const [isOpenUpdate, setOpenUpdate] = useState(false);
  const [selectValue, handleChangeSelect] = useSelect(ambulance_data?.status);
  const [toastStatus, setToastStatus] = useState(null);
  const [mutationFunctionType, setMutationFunctionType] = useState("");
  const status = ambulance_data?.status;

  const toast = useToast();
  const queryClient = useQueryClient();

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };

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
      `${ENDPOINT}ambulance/all/${ambulance_data?._id}`,
      data,
      config
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
      queryClient.invalidateQueries(["ambulance"]);
    },
  });

  const handleEditModal = () => {
    setOpenUpdate(!isOpenUpdate);
    setMutationFunctionType("UPDATE");
  };

  const handleClickUpdateStatus = (e) => {
    e.preventDefault();

    const body = {
      license_plate: ambulance_data?.license_plate,
      status: selectValue,
    };
    mutation.mutate(body);
    setToastStatus("updated");
    setOpenUpdate(!isOpenUpdate);
  };

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={isOpenUpdate ? "orange.300" : "white"}
        borderRadius={borderRadius}
      >
        <CardBody>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            <GridItem>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                License Plate:
                <Text as="span" ps={2} fontWeight="normal">
                  {license_plate}
                </Text>
              </Heading>
            </GridItem>
            <GridItem>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Status:
                <Text as="span" ps={2} fontWeight="normal">
                  {status}
                </Text>
              </Heading>
            </GridItem>
            <GridItem alignSelf="flex-end">
              <Flex gap={2} justifyContent="flex-end">
                <Button
                  size="sm"
                  aria-label="Edit ambulance details"
                  leftIcon={<UilEdit />}
                  onClick={handleEditModal}
                >
                  Update
                </Button>
              </Flex>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>

      <ModalContainer
        header="License Plate"
        header_detail={license_plate}
        isOpen={isOpenUpdate}
        onClose={handleEditModal}
      >
        <ModalBody my={4}>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Status:
          </Heading>
          <Select mb={4} onChange={handleChangeSelect} value={selectValue}>
            <option value="available">Available</option>
            <option value="travelling">Travelling</option>
            <option value="maintenance">Maintenance</option>
          </Select>
          <Button
            size={{ base: "sm", md: "md" }}
            width="100%"
            bgColor="custom.primary"
            _hover={{ bgColor: "orange.500" }}
            color="white"
            fontWeight="semibold"
            onClick={handleClickUpdateStatus}
          >
            Update
          </Button>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default PersonnelAmbulanceCard;
