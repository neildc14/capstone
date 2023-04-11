import React, { useState } from "react";
import ModalContainer from "../global/ModalContainer";
import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Box,
  Button,
} from "@chakra-ui/react";

const AdministratorAddAmbulanceModal = ({ handleOpenModal, isOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    console.log(data);
  };

  return (
    <ModalContainer
      header="REGISTER"
      header_detail="New Ambulance "
      isOpen={isOpen}
      onClose={handleOpenModal}
    >
      <ModalBody my={4}>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>License Plate</FormLabel>
            <Input type="text" name="license_plate" />
          </FormControl>
          <Button
            type="sumbmit"
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

export default React.memo(AdministratorAddAmbulanceModal);
