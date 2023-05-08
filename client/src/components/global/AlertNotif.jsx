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
} from "@chakra-ui/react";

import React from "react";

const AlertNotif = ({ isOpen, handleOpenModal, newRequestCount }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOpenModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pt={10} pb={5} px={5}>
            <Alert
              py={10}
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                New Request!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                <Text fontWeight="bold" fontSize="xl">
                  {newRequestCount}
                </Text>{" "}
                New request has been submitted by the requestor(s). Please check
                your dashboard for more details.
              </AlertDescription>
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AlertNotif;
