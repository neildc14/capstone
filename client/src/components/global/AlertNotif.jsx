import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import React from "react";

const AlertNotif = ({ isOpen, handleOpenModal, title, status, children }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOpenModal}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody pt={10} pb={5} px={5}>
            <Alert
              py={10}
              status={status}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {title}
              </AlertTitle>
              <AlertDescription maxWidth="sm">{children}</AlertDescription>
            </Alert>
            <Flex justifyContent="center" mt={4} alignItems="center">
              <Button
                size="sm"
                mx="auto"
                bgColor="teal.500"
                color="white"
                _hover={{ bgColor: "teal.600" }}
                onClick={handleOpenModal}
              >
                OK
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AlertNotif;
