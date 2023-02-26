import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import {
  Box,
  Heading,
  Divider,
  useMediaQuery,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import RequestForm from "../components/requestor/RequestForm";
import ThemeButton from "../components/ThemeButton";
import Settings from "../components/Settings";

import RequestorSidebar from "../components/requestor/RequestorSidebar";
import RequestorMobileSidebar from "../components/requestor/RequestorMobileSidebar";
import DateTime from "../components/DisplayTime";

const RequestorDashboard = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenRequestForm, setOpenRequestForm] = useState(false);

  const toggleDashboard = () => {
    onOpen();
  };

  const handleRequestForm = () => {
    setOpenRequestForm(true);
  };

  const handleViewRequest = () => {
    setOpenRequestForm(false);
  };
  const handleViewMap = () => {
    setOpenRequestForm(false);
  };

  return (
    <>
      {!isLargerThan768 && (
        <React.Fragment>
          <TopNav toggleDashboard={toggleDashboard} />
          <Divider />
        </React.Fragment>
      )}

      <Flex flexDirection={{ base: "column", lg: "row" }} padding="0">
        {isLargerThan768 ? (
          <RequestorSidebar
            handleRequestForm={handleRequestForm}
            handleViewRequest={handleViewRequest}
            handleViewMap={handleViewMap}
          />
        ) : (
          <RequestorMobileSidebar
            isOpen={isOpen}
            onClose={onClose}
            handleRequestForm={handleRequestForm}
            handleViewRequest={handleViewRequest}
            handleViewMap={handleViewMap}
          />
        )}

        <Box width="100%" px={{ base: 0, mb: 4 }}>
          <Flex justifyContent="flex-end" alignItems="center" gap="4px" me={10}>
            <DateTime />
            <Settings />
            <ThemeButton />
          </Flex>
          <Divider mb={4} />
          {isOpenRequestForm && <RequestForm />}
        </Box>
      </Flex>
    </>
  );
};

export default RequestorDashboard;
