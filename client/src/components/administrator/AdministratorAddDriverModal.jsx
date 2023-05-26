import React, { useState, useContext } from "react";
import ModalContainer from "../global/ModalContainer";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Box,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorAddDriverModal = ({ handleOpenModal, isOpen }) => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const toast = useToast();
  const queryClient = useQueryClient();

  const makeDriver = (new_driver) => {
    return axios.post(`${ENDPOINT}auth/signup`, new_driver);
  };

  const mutation = useMutation({
    mutationFn: makeDriver,
    onError: (error) => {
      console.log(error);

      if (error.response?.data?.validationErrors) {
        let errors = error.response?.data?.validationErrors;

        const [passwordErr] = errors.filter(
          (error) => error.field === "password"
        );

        setPasswordError(passwordErr);
      }

      if (error.response?.data.includes("This email is already in use.")) {
        setEmailError({ message: "This email is already in use." });
      }
    },
    onSuccess: () => {
      toast({
        title: "Driver registered.",
        description: "Driver is successfully registered.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["admin_all_informations"]);
      handleOpenModal();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutation.mutate(data);
  };

  return (
    <ModalContainer
      header="REGISTER"
      header_detail="New Driver"
      isOpen={isOpen}
      onClose={handleOpenModal}
    >
      <ModalBody my={4}>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl mb={2}>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="firstname" required />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastname" required />
          </FormControl>
          <FormControl mb={2} isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" required />
            {emailError && (
              <FormErrorMessage>{emailError.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl my={2} isInvalid={passwordError}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                size={{ base: "sm", md: "md" }}
                name="password"
                required
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={showHidePassword}
                >
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordError && (
              <FormErrorMessage>{passwordError.message}</FormErrorMessage>
            )}
          </FormControl>

          <Input type="hidden" name="user_type" value="ambulance_personnel" />

          <Button
            type="submit"
            mt={4}
            width="100%"
            bgColor="custom.primary"
            color="white"
            _hover={{ bgColor: "orange.500" }}
          >
            Submit
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

AdministratorAddDriverModal.propTypes = {
  handleOpenModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default React.memo(AdministratorAddDriverModal);
