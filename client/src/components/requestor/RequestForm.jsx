import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Card,
  Checkbox,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { UilFileInfoAlt } from "@iconscout/react-unicons";
const RequestForm = () => {
  return (
    <Card
      width={{ base: "100%", md: "90%", lg: "70%" }}
      mx={{ base: "auto" }}
      p={4}
    >
      <Box as="form">
        <Heading
          mb={4}
          display="flex"
          alignItems="center"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="normal"
        >
          <UilFileInfoAlt /> <Text as="span">Request Form </Text>
        </Heading>
        <Flex flexDirection="row" gap="2rem">
          <FormControl my={2}>
            <FormLabel>
              First Name{" "}
              <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
                Pangalan
              </Text>
            </FormLabel>
            <Input
              type="text"
              width="100%"
              size={{ base: "sm", md: "md" }}
              border="1px solid green"
              _hover={{ borderColor: "blue.600" }}
            />
          </FormControl>

          <FormControl my={2}>
            <FormLabel>
              Last Name{" "}
              <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
                Apelyido
              </Text>
            </FormLabel>
            <Input
              type="text"
              width="100%"
              size={{ base: "sm", md: "md" }}
              border="1px solid green"
              _hover={{ borderColor: "blue.600" }}
            />
          </FormControl>
        </Flex>

        <FormControl my={2}>
          <FormLabel>
            Location{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Lokasyon ng pagsusunduan
            </Text>{" "}
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            type="text"
            width="100%"
            size={{ base: "sm", md: "md" }}
            border="1px solid green"
            _hover={{ borderColor: "blue.600" }}
          />
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Destination{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Destinasyon na pagpupuntahan
            </Text>
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            type="text"
            width="100%"
            size={{ base: "sm", md: "md" }}
            border="1px solid green"
            _hover={{ borderColor: "blue.600" }}
          />
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Patient Condition{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Kondisyon ng pasyente
            </Text>
          </FormLabel>
          <Textarea
            width="100%"
            size={{ base: "sm", md: "md" }}
            border="1px solid green"
            _hover={{ borderColor: "blue.600" }}
          ></Textarea>
        </FormControl>

        <FormControl my={2}>
          <FormLabel>
            Referral Slip{" "}
            <Text as="span" color="gray.500" fontWeight="normal" fontSize="sm">
              (Optional)
            </Text>
          </FormLabel>
          <Input
            type="file"
            size={{ base: "sm", md: "md" }}
            border="1px solid green"
            _hover={{ borderColor: "blue.600" }}
          />
        </FormControl>

        <FormControl my={2}>
          <Checkbox defaultChecked>
            I hereby confirm that all the information above is true.{" "}
            <Text as="i" color="gray.600" fontWeight="thin" fontSize="sm">
              Aking pinatutunayan na ang lahat ng impormasyong nakasaad ay
              totoo.
            </Text>
          </Checkbox>
        </FormControl>

        <Flex justifyContent="flex-start" gap="2rem" width="100%">
          <Button
            type="submit"
            variant="outline"
            width={{ base: "100%", md: "100%", lg: "50%" }}
            my={6}
            bgColor="gray.200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            width={{ base: "100%", md: "100%", lg: "50%" }}
            my={6}
            bgColor="green.600"
            color="white"
            _hover={{ bgColor: "green.700" }}
          >
            Make Request
          </Button>
        </Flex>
      </Box>
    </Card>
  );
};

export default RequestForm;
