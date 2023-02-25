import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

const RequestForm = () => {
  return (
    <Box as="form" width={{ base: "100%", md: "50%", lg: "50%" }} mx="auto">
      <FormControl my={2}>
        <FormLabel>First Name</FormLabel>
        <Input type="text" width="100%" size={{ base: "sm", md: "md" }} />
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" width="100%" size={{ base: "sm", md: "md" }} />
      </FormControl>
      <FormControl my={2}>
        <FormLabel>Location </FormLabel>
        <Input type="text" width="100%" size={{ base: "sm", md: "md" }} />
      </FormControl>
      <FormControl my={2}>
        <FormLabel>
          Destination{" "}
          <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
            (Optional)
          </Text>
        </FormLabel>
        <Input type="text" width="100%" size={{ base: "sm", md: "md" }} />
      </FormControl>
      <FormControl>
        <FormLabel>
          Referral Slip{" "}
          <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
            (Optional)
          </Text>
        </FormLabel>
        <Input type="file" size={{ base: "sm", md: "md" }} />
      </FormControl>
      <Button
        type="submit"
        w="100%"
        my={6}
        bgColor="red.600"
        color="white"
        _hover={{ bgColor: "red.700" }}
      >
        Request
      </Button>
    </Box>
  );
};

export default RequestForm;
