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
    <Modal onClose={onClose} size="4xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <Box zIndex={2000000} color="#FF7A00">
          <ModalCloseButton />
        </Box>
        <ModalBody p={3}>
          <AspectRatio ratio={16 / 9} overflow="hidden">
            <Image
              src={image}
              postion="center"
              mx="auto"
              width="100%"
              height="100%"
            />  
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
