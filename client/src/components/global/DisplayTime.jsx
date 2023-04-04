import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { UilClock } from "@iconscout/react-unicons";

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    dateTime
  );

  return (
    <Box display="inline-flex" alignItems="center" gap={2}>
      <UilClock color="#ff7a00" size="24px" />
      {formattedDateTime}
    </Box>
  );
};

export default DateTime;
