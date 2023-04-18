import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { UilSearch } from "@iconscout/react-unicons";

const SearchBar = ({
  memoizedData,
  setSearch,
  placeholder,
  noResultMessage,
}) => {
  const [searchedTerm, setSearchTerm] = useState([]);
  const [showNoRequest, setShowNoRequest] = useState(false);

  const searchData = (data, searchTerm) => {
    return data.filter((obj) =>
      Object.values(obj).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch([]);

    if (value === "") {
      setSearchTerm([]);
      setShowNoRequest(false);
      return;
    }
    const data = searchData(memoizedData, value);
    setSearchTerm(data);
    setShowNoRequest(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSearch(searchedTerm);

    if (searchedTerm.length === 0) {
      setShowNoRequest(true);
    } else {
      setShowNoRequest(false);
    }
  };
  return (
    <Flex flexDirection="column">
      <Box
        as="form"
        display="inline-flex"
        flex="1"
        gap={2}
        onSubmit={handleSearchSubmit}
      >
        <Input
          type="search"
          size="sm"
          flex="1"
          placeholder={placeholder}
          onChange={handleSearchInput}
        />
        <Button type="submit" display="inline-flex" gap={2} size="sm">
          <UilSearch size="16px" /> Search
        </Button>
      </Box>
      <Text fontSize="sm" color="orange.500" opacity={showNoRequest ? 1 : 0}>
        {noResultMessage}
      </Text>
    </Flex>
  );
};

export default SearchBar;
