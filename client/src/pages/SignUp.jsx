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
  Image,
  Grid,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import ThemeButton from "../components/global/ThemeButton";
import ARMSlogo1 from "../assets/images/ARMSlogo1.png";
import ARMSlogo2 from "../assets/images/ARMSlogo2.png";
import ARMSwhite from "../assets/images/ARMSwhite.png";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const SignUp = () => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);
  const toast = useToast();

  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [value, selectChange] = useSelect();
  console.log({ value });

  const signUpUser = (user) => {
    return axios.post(`${ENDPOINT}auth/signup`, user);
  };

  const mutation = useMutation({
    mutationFn: signUpUser,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      toast({
        title: "User registered.",
        description: "You have been successfully registered.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = `/${value}`;
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
        >
          <Heading as="h1" mt={6} mb={10} fontSize="2xl" textAlign="center">
            Sign up your account.
          </Heading>

          <Box as="form" onSubmit={handleSubmit}>
            <FormControl my={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                name="firstname"
                {...bindFirstName}
              />
            </FormControl>

            <FormControl my={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                name="lastname"
                {...bindLastName}
              />
            </FormControl>

            <FormControl my={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size={{ base: "sm", md: "md" }}
                name="email"
                {...bindEmail}
              />
            </FormControl>

            <FormControl my={2}>
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
                <option value="ambulance_personnel">Ambulance Personnel</option>
                <option value="administrator">Administrator</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              w="100%"
              my={6}
              bgColor="red.600"
              color="white"
              _hover={{ bgColor: "red.700" }}
            >
              Sign up
            </Button>
          </Box>

          <Text fontSize="sm">
            Already have an account?{" "}
            <Link
              as={RouterLink}
              to="/account/login"
              color="blue.500"
              fontWeight="semibold"
            >
              Login
            </Link>
          </Text>
        </Box>

        <Box
          height="100vh"
          width="100%"
          display={{ base: "none", md: "block" }}
          bgColor="teal.700"
        ></Box>
      </Flex>
    </Container>
  );
};

export default SignUp;
