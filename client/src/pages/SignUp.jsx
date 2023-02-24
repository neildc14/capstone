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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useInput from "../hooks/useInput";
import useSelect from "../hooks/useSelect";
import ThemeButton from "../components/ThemeButton";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);

  const [firstName, bindFirstName] = useInput();
  const [lastName, bindLastName] = useInput();
  const [email, bindEmail] = useInput();
  const [password, bindPassword] = useInput();
  const [value, selectChange] = useSelect();

  return (
    <Container height="100%" maxW="full" px={0} position="relative">
      <ThemeButton />
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

          <Box as="form">
            <FormControl my={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                {...bindFirstName}
              />
            </FormControl>

            <FormControl my={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                size={{ base: "sm", md: "md" }}
                {...bindLastName}
              />
            </FormControl>

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

            <FormControl my={2}>
              <FormLabel>User Type</FormLabel>
              <Select
                value={value}
                size={{ base: "sm", md: "md" }}
                onChange={selectChange}
              >
                <option value="Requestor">Requestor</option>
                <option value="Ambulance Personnel">Ambulance Personnel</option>
                <option value="Administrator">Administrator</option>
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
          bgColor="red.700"
        ></Box>
      </Flex>
    </Container>
  );
};

export default SignUp;
