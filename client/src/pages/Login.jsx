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
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import ThemeButton from "../components/ThemeButton";

const Login = () => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);

  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();

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
          <Heading as="h1" mt={6} mb={10} fontSize="2xl" textAlign="center">
            Log in to your account.
          </Heading>

          <Box as="form">
            <FormControl my={2}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                size={{ base: "sm", md: "md" }}
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

            <Button
              type="submit"
              w="100%"
              my={6}
              bgColor="green.600"
              color="white"
              _hover={{ bgColor: "green.700" }}
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
          bgColor="green.700"
        ></Box>
      </Flex>
    </Container>
  );
};

export default Login;
