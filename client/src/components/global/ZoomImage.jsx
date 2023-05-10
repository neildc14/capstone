import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  AspectRatio,
  Box,
} from "@chakra-ui/react";
export default function ZoomImage({ isOpen, onClose, image }) {
  return (
    <Modal onClose={onClose} size={{ base: "full", md: "4xl" }} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Box zIndex={2000000} color="#FF7A00">
          <ModalCloseButton />
        </Box>
        <ModalBody p={3}>
          <AspectRatio
            ratio={{ base: 1, md: 16 / 9 }}
            overflow="hidden"
            my={{ base: 10, md: 0 }}
          >
            <Image src={image} postion="center" width="100%" height="100%" />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
