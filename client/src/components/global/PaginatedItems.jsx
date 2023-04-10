import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import AdministratorRequestCard from "../administrator/AdministratorPendingRequestCard";
import { Box, Flex } from "@chakra-ui/react";

const PaginatedItems = ({ itemsPerPage, items, children }) => {
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
      {children(currentItems)}
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

export default React.memo(PaginatedItems);
