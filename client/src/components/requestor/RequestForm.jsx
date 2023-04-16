import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Card,
  Checkbox,
  Textarea,
  Flex,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useInput from "../../hooks/useInput";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;
const RequestForm = () => {
  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [location, bindLocation] = useInput();
  const [destination, bindDestination] = useInput();
  const [patientCondition, bindPatientCondition] = useInput();
  const [referralSlip, bindReferralSlip] = useInput();
  const [confirmation, setConfirrmation] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleConfirmationClick = () => {
    setConfirrmation(!confirmation);
  };

  const makeRequest = (new_request) => {
    return axios.post(`${ENDPOINT}request`, new_request);
  };

  const mutation = useMutation({
    mutationFn: makeRequest,
    onError: (error, variables, context) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Request created.",
        description: "Request is successfully created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      navigate("/requestor/");
    },
  });

  const isError = confirmation === false;

  const onRequestSubmit = (e) => {
    e.preventDefault();

    if (!confirmation || confirmation === "") {
      setConfirrmation(false);
      return;
    }

    const body = {
      first_name: firstName,
      last_name: lastName,
      pickup_location: location,
      transfer_location: destination,
      referral_slip: referralSlip,
      patient_condition: patientCondition,
      confirmation: confirmation,
    };
    mutation.mutate(body);
  };

  return (
    <Card
      width={{ base: "100%", md: "90%", lg: "70%" }}
      mx={{ base: "auto" }}
      p={4}
    >
      <Box as="form" onSubmit={onRequestSubmit} encType="multipart/form-data">
        <Heading
          mb={4}
          display="flex"
          alignItems="center"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="normal"
        >
          <UilFileInfoAlt color="#FF7A00" />{" "}
          <Text as="span">Request Form </Text>
        </Heading>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          gap={{ md: "2rem" }}
        >
          <FormControl my={2}>
            <FormLabel>
              First Name{" "}
              <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
                Pangalan
              </Text>
            </FormLabel>
            <Input
              required
              type="text"
              name="first_name"
              width="100%"
              size={{ base: "sm", md: "md" }}
              border="1px solid #C2BDBD"
              {...bindFirstName}
            />
          </FormControl>

          <FormControl my={2}>
            <FormLabel>
              Last Name{" "}
              <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
                Apelyido
              </Text>
            </FormLabel>
            <Input
              required
              type="text"
              name="last_name"
              width="100%"
              size={{ base: "sm", md: "md" }}
              border="1px solid #C2BDBD"
              {...bindLastName}
            />
          </FormControl>
        </Flex>

        <FormControl my={2}>
          <FormLabel>
            Location{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Lokasyon ng pagsusunduan
            </Text>{" "}
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            required
            type="text"
            name="pickup_location"
            width="100%"
            size={{ base: "sm", md: "md" }}
            border="1px solid #C2BDBD"
            {...bindLocation}
          />
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Destination{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Destinasyon na pagpupuntahan
            </Text>
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            required
            type="text"
            name="transfer_location"
            width="100%"
            size={{ base: "sm", md: "md" }}
            border="1px solid #C2BDBD"
            {...bindDestination}
          />
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Patient Condition{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Kondisyon ng pasyente
            </Text>
          </FormLabel>
          <Textarea
            required
            width="100%"
            name="patient_condtion"
            size={{ base: "sm", md: "md" }}
            border="1px solid #C2BDBD"
            {...bindPatientCondition}
          ></Textarea>
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Referral Slip{" "}
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            type="file"
            name="referral_slip"
            size={{ base: "sm", md: "md" }}
            border="1px solid #C2BDBD"
          />
        </FormControl>

        <FormControl my={2} isInvalid={isError}>
          <Checkbox checked={confirmation} onChange={handleConfirmationClick}>
            I hereby confirm that all the information above is true.{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Aking pinatutunayan na ang lahat ng impormasyong nakasaad ay
              totoo.
            </Text>
          </Checkbox>
          {isError && (
            <FormErrorMessage>Please confirm your request.</FormErrorMessage>
          )}
        </FormControl>

        <Flex justifyContent="flex-start" gap="2rem" width="100%">
          <Button
            type="submit"
            variant="outline"
            size={{ base: "sm", md: "md" }}
            width={{ base: "100%", md: "100%", lg: "50%" }}
            my={6}
            bgColor="gray.100"
            _hover={{ bgColor: "gray.200" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size={{ base: "sm", md: "md" }}
            width={{ base: "100%", md: "100%", lg: "50%" }}
            my={6}
            bgColor="#FF7A00"
            color="white"
            _hover={{ bgColor: "orange.500" }}
          >
            Make Request
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};

export default RequestForm;
