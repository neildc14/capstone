import { Heading, AspectRatio, Box, Image, IconButton } from "@chakra-ui/react";
import { UilFocus } from "@iconscout/react-unicons";

export default function ReferralSlipImage({
  handleZoomInModal,
  referralSlipBlob,
}) {
  return (
    <>
      <Heading as="h6" mb={{ base: 4 }} fontSize="md" fontWeight="semibold">
        Referral Slip:
      </Heading>
      <AspectRatio ratio={16 / 9} onClick={handleZoomInModal}>
        <>
          <Box display="flex" justifyContent="center">
            <IconButton
              colorScheme="gray"
              icon={<UilFocus />}
              zIndex={10000}
              width="60px !important"
              height="60px !important"
              float="right !important"
              opacity={0.4}
            />
          </Box>
          <Image src={URL?.createObjectURL(referralSlipBlob)} />
        </>
      </AspectRatio>
    </>
  );
}
