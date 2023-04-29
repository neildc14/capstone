import React, { useContext, useState, useEffect } from "react";
import { Box, Flex, Divider, useMediaQuery, useToast } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import DateTime from "../components/global/DisplayTime";
import ThemeButton from "../components/global/ThemeButton";
import PersonnelSettings from "../components/ambulance-personnel/PersonnelSettings";
import PersonnelDesktopSettings from "../components/ambulance-personnel/PersonnelDesktopSettings";
import NotifBell from "../components/global/NotifBell";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelHeader = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const toast = useToast();
  const [personnelStatus, setPersonnelStatus] = useState("");
  const [schedule, setScheduleID] = useState(null);
  const [ambulanceID, setAmbulanceID] = useState(undefined);
  const [ambulancePlate, setAmbulancePlate] = useState(undefined);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };

  const headers = {
    Authorization: `Bearer ${parsed_user_data?.token}`,
  };

  const fetchAvailableAmbulance = async () => {
    const response = await axios.get(`${ENDPOINT}ambulance/all`, { headers });
    return response.data;
  };

  const { data, error, refetch, isLoading, isFetching } = useQuery(
    ["ambulance"],
    fetchAvailableAmbulance,
    {
      refetchOnWindowFocus: true,
      enabled: false,
    }
  );

  const filterAmbulance = () => {
    let available = [];
    if (Array.isArray(data)) {
      available = data?.filter(
        (req) => req.status === "available" && req.assigned === false
      );
    }

    return available[0];
  };
  const available = filterAmbulance();

  useEffect(() => {
    const schedule = localStorage.getItem("schedule");
    setScheduleID(JSON.parse(schedule));
  }, [schedule]);

  useEffect(() => {
    refetch();
  }, [user]);

  useEffect(() => {
    let ambulance_id = localStorage.getItem("ambulance_id");
    let ambulance = localStorage.getItem("ambulance");

    if (
      ambulance_id === null ||
      ambulance_id === undefined ||
      ambulance_id === "undefined" ||
      ambulance === undefined
    ) {
      localStorage.setItem("ambulance_id", JSON.stringify(available?._id));
      localStorage.setItem("ambulance", JSON.stringify(available));
    }
  }, [available]);

  const updateSchedule = async (data) => {
    const response = await axios.put(
      `${ENDPOINT}schedule/all_schedule/${schedule?._id}`,
      data,
      config
    );
    return response;
  };

  const scheduleMutation = useMutation({
    mutationFn: updateSchedule,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response.data);
      const currentSchedule = JSON.parse(localStorage.getItem("schedule"));

      const updatedSchedule = {
        ...currentSchedule,
        status: response.data.status,
        ambulance: response.data.ambulance,
        ambulance_plate: response.data.ambulance_plate,
      };

      localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
      setAmbulanceID(currentSchedule.ambulance);
      setAmbulancePlate(currentSchedule.ambulance_plate);

      toast({
        title: "Schedule update.",
        description: `Schedule is successfully updated`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const changeStatusHandler = (e) => {
    setPersonnelStatus(e.target.value);
    console.log(schedule.ambulance);
    scheduleMutation.mutate({
      status: e.target.value,
      ambulance: ambulanceID,
    });
  };

  const handleLogOut = () => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("schedule");
      localStorage.removeItem("ambulance_id");
      localStorage.removeItem("ambulance");
      navigate("/account/login");
    }
  };

  return (
    <Box as="header" overflow="hidden">
      <Flex
        mx={{ base: 4 }}
        justifyContent="space-between"
        alignItems="baseline"
      >
        {!isLargerThan768 && <TopNav />}
        {isLargerThan768 && <DateTime />}
        <Flex alignItems="baseline" gap="4px" me={{ md: 4 }} ms="auto">
          <NotifBell />
          <ThemeButton />
          {isLargerThan768 ? (
            <PersonnelDesktopSettings
              handleLogOut={handleLogOut}
              changeStatusHandler={changeStatusHandler}
              parsed_user_data={parsed_user_data}
            />
          ) : (
            <PersonnelSettings
              handleLogOut={handleLogOut}
              changeStatusHandler={changeStatusHandler}
              parsed_user_data={parsed_user_data}
            />
          )}
        </Flex>
      </Flex>
      <Divider mb={4} />
    </Box>
  );
};

export default PersonnelHeader;
