import React, { useState, useEffect } from "react";
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
  Heading,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import ThemeButton from "../components/global/ThemeButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Logo from "../components/global/Logo";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const toast = useToast();

  const loginnUpUser = (user) => {
    return axios.post(`${ENDPOINT}auth/login`, user);
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
    mutationFn: loginnUpUser,
    onError: (error) => {
      console.log(error.response.data === "Incorrect password");
      if (error.response.data === "User account not found.") {
        setIncorrectEmail(error.response.data);
      }
      if (error.response.data === "Incorrect password") {
        setIncorrectPassword(error.response.data);
      }
    },

    onSuccess: (response) => {
      if (response.data.user_type === "ambulance_personnel") {
        scheduleMutation.mutate({
          scheduled_personnel: response.data.id,
        });
      }
      toast({
        title: "User logged in.",
        description: "You have been successfully  logged in.",
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
      email: email,
      password: password,
    };
    mutation.mutate(body);
  };

  const showHidePassword = () => setShow(!show);

  return (
    <Container position="relative" height="100%" maxW="full" px={0}>
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
        >
          <Heading
            as="h1"
            mt={6}
            mb={10}
            fontSize="2xl"
            textAlign="center"
            fontFamily="'Roboto', sans-serif"
          >
            Log in to your account.
          </Heading>

          <Box as="form" onSubmit={handleSubmit}>
            <FormControl my={2} isInvalid={incorrectEmail}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size={{ base: "sm", md: "md" }}
                {...bindEmail}
              />
              {incorrectEmail && (
                <FormErrorMessage>User not found.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={2} isInvalid={incorrectPassword}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  size={{ base: "sm", md: "md" }}
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
              {incorrectPassword && (
                <FormErrorMessage>Incorrect Password.</FormErrorMessage>
              )}
            </FormControl>

            <Button
              type="submit"
              w="100%"
              my={6}
              bgColor="green.800"
              color="white"
              _hover={{ bgColor: "green.900" }}
            >
              Log in
            </Button>
          </Box>

          <Text fontSize="sm">
            Doesn't have an account?{" "}
            <Link
              as={RouterLink}
              to="/account/signup"
              color="blue.500"
              fontWeight="semibold"
            >
              Signup
            </Link>
          </Text>
        </Box>

        <Box
          height="100vh"
          width="100%"
          display={{ base: "none", md: "block" }}
          bgColor="green.900"
        >
          <Logo />
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
