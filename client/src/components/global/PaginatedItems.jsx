import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import AdministratorRequestCard from "../administrator/AdministratorRequestCard";
import { Box, Flex } from "@chakra-ui/react";

const PaginatedItems = ({ itemsPerPage, items }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <Box mt={4}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel={"Prev"}
          renderOnZeroPageCount={null}
          pageClassName={"page-item"}
          activeClassName={"active"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
        />
      </Box>
    </>
  );
};

function Items({ currentItems }) {
  return (
    <>
      <Flex flexDirection="column" gap={2}>
        {currentItems &&
          currentItems.map((item) => (
            <AdministratorRequestCard
              key={item}
              bgColor="white"
              borderRadius="sm"
            />
          ))}
      </Flex>
    </>
  );
}

export default React.memo(PaginatedItems);
