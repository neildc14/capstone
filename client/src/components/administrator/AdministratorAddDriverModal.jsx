import React, { useState } from "react";
import ModalContainer from "../global/ModalContainer";
import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Box,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const AdministratorAddDriverModal = ({ handleOpenModal, isOpen }) => {
  const [show, setShow] = useState(false);
  const showHidePassword = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    console.log(data);
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
            <Input type="text" name="firstname" />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="lastname" />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl my={2}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                size={{ base: "sm", md: "md" }}
                name="password"
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

export default React.memo(AdministratorAddDriverModal);
