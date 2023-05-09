import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  Select,
  Heading,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import ThemeButton from "../components/global/ThemeButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Logo from "../components/global/Logo";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const SignUp = () => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);
  const toast = useToast();

  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [value, selectChange] = useSelect("requestor");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const signUpUser = (user) => {
    return axios.post(`${ENDPOINT}auth/signup`, user);
  };

  const postSchedule = (user) => {
    return axios.post(`${ENDPOINT}schedule/all_schedule`, user);
  };

  const scheduleMutation = useMutation({
    mutationFn: postSchedule,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      localStorage.setItem("schedule", JSON.stringify(response.data));

      let userLoggedIn = localStorage.getItem("user");
      const parsed_user_data = JSON.parse(userLoggedIn);
      window.location.href = `/${parsed_user_data.user_type}`;
    },
  });

  const mutation = useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      console.log(error);

      let errors = error.response.data.validationErrors;
      const [firstNameErr] = errors.filter(
        (error) => error.field === "firstname"
      );
      const [lastNameErr] = errors.filter(
        (error) => error.field === "lastname"
      );
      const [emailErr] = errors.filter((error) => error.field === "email");
      const [passwordErr] = errors.filter(
        (error) => error.field === "password"
      );
      console.log(firstNameErr);
      setFirstNameError(firstNameErr);
      setLastNameError(lastNameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
    },
    onSuccess: (response) => {
      if (response.data.user_type === "ambulance_personnel") {
        scheduleMutation.mutate({
          scheduled_personnel: response.data.id,
        });
      }
      toast({
        title: "User registered.",
        description: "You have been successfully registered.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      if (response.data.user_type !== "ambulance_personnel") {
        window.location.href = `/${response.data.user_type}`;
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      user_type: value,
    };
    mutation.mutate(body);
  };

  return (
    <Container height="100%" maxW="full" px={0} position="relative">
      <Box position="absolute" top="5px" right="10px">
        <ThemeButton />
      </Box>
      <Flex
        flexDirection={{ base: "column", md: "row-reverse" }}
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Box
          height="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={{ md: "70%", lg: "50%" }}
          px={{ base: "1.5rem", md: "2rem", lg: "4rem" }}
          overflowY="scroll"
        >
          <Heading
            as="h2"
            mt={6}
            mb={10}
            fontSize="2xl"
            textAlign="center"
            fontFamily="'Roboto', sans-serif"
          >
            Sign up for an account.
          </Heading>

          <Box as="form" onSubmit={handleSubmit}>
            <FormControl my={2} isInvalid={firstNameError}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                name="firstname"
                {...bindFirstName}
              />
              {firstNameError && (
                <FormErrorMessage>{firstNameError.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={2} isInvalid={lastNameError}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                name="lastname"
                {...bindLastName}
              />
              {lastNameError && (
                <FormErrorMessage>{lastNameError.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={2} isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size={{ base: "sm", md: "md" }}
                name="email"
                {...bindEmail}
              />
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
                  {...bindPassword}
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

            <FormControl my={2}>
              <FormLabel>User Type</FormLabel>
              <Select
                value={value}
                size={{ base: "sm", md: "md" }}
                name="user_type"
                onChange={selectChange}
              >
                <option value="requestor">Requestor</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              w="100%"
              my={6}
              bgColor="teal.700"
              color="white"
              _hover={{ bgColor: "teal.800" }}
            >
              Sign up
            </Button>
          </Box>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link as={RouterLink} to="/" color="blue.500" fontWeight="semibold">
              Login
            </Link>
          </Text>
        </Box>

        <Box
          height="100vh"
          width="100%"
          display={{ base: "none", md: "block" }}
          bgColor="teal.900"
        >
          <Logo />
        </Box>
      </Flex>
    </Container>
  );
};

export default SignUp;
