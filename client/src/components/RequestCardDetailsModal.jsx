import React, { useContext, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import ReferralSlip from "../utils/fetch-referral";
import ReferralSlipImage from "./global/ReferralSlipImage";

const RequestCardDetailsModal = ({
  request_data,
  onClose,
  isOpen,
  setZoomImage,
  handleZoomInModal,
}) => {
  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const headers = {
    Authorization: `Bearer ${parsed_user_data?.token}`,
  };

  const referralSlipBlob = ReferralSlip({
    referralSlip: request_data?.referral_slip,
    headers,
  });

  useEffect(() => {
    if (referralSlipBlob) {
      setZoomImage(URL?.createObjectURL(referralSlipBlob));
    }
  }, [referralSlipBlob]);

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={{ base: "xs", md: "md", lg: "lg" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="semibold" fontSize="md">
            Request ID:{" "}
            <Text as="span" fontWeight="normal">
              {request_data._id}
            </Text>
            <Divider bgColor="#FF7A00" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={{ base: 6 }}>
            <Heading
              as="h6"
              fontSize="md"
              mb={{ base: 4 }}
              fontWeight="semibold"
            >
              Requestor Name:{" "}
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {`${request_data.first_name} ${request_data.last_name}`}
              </Text>
            </Heading>
            <Heading
              as="h6"
              mb={{ base: 4 }}
              fontSize="md"
              fontWeight="semibold"
            >
              Pick-up Location:{" "}
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {request_data.pickup_location}
              </Text>
            </Heading>
            <Heading
              as="h6"
              mb={{ base: 4 }}
              fontSize="md"
              fontWeight="semibold"
            >
              Transfer Location:{" "}
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {request_data.transfer_location &&
                  request_data.transfer_location}
              </Text>
            </Heading>
            <Heading
              as="h6"
              mb={{ base: 4 }}
              fontSize="md"
              fontWeight="semibold"
            >
              Patient Condition:{" "}
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {request_data.patient_condition &&
                  request_data.patient_condition}
              </Text>
            </Heading>
            {referralSlipBlob && (
              <>
                <ReferralSlipImage
                  handleZoomInModal={handleZoomInModal}
                  referralSlipBlob={referralSlipBlob}
                />
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RequestCardDetailsModal;
