import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";

const MobileSidebar = ({ isOpen, onClose, header, bgColor, children }) => {
  return (
    <>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bgColor={bgColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader>{header}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileSidebar;
