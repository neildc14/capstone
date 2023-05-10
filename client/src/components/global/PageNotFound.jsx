import { Image, Box } from "@chakra-ui/react";
import pagenotfound from "../../assets/images/pagenotfound.png";
export default function PageNotFound() {
  return (
    <Box height="100%" overflow="hidden">
      <Image src={pagenotfound} height="50%" mx="auto" overflow="hidden" />
    </Box>
  );
}
