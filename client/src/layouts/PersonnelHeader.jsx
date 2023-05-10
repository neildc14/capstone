import React, { useContext, useState, useEffect } from "react";
import { Box, Flex, Divider, useMediaQuery, useToast } from "@chakra-ui/react";
import TopNav from "../components/TopNav";
import DateTime from "../components/global/DisplayTime";
import ThemeButton from "../components/global/ThemeButton";
import PersonnelSettings from "../components/ambulance-personnel/PersonnelSettings";
import PersonnelDesktopSettings from "../components/ambulance-personnel/PersonnelDesktopSettings";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ScheduleContext from "../context/ScheduleContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelHeader = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const [schedule, setSchedule] = useState(null);
  const { ambulance, updateScheduleData } = useContext(ScheduleContext);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);

  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const schedule = localStorage.getItem("schedule");
    setSchedule(JSON.parse(schedule));
  }, []);

  const updateData = (data) => {
    updateScheduleData({
      id: data._id,
      status: data.status,
      ambulance: data.ambulance,
      ambulance_plate: data.ambulance_plate,
    });
  };

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
      updateData(response.data);
      const currentSchedule = JSON.parse(localStorage.getItem("schedule"));

      const updatedSchedule = {
        ...currentSchedule,
        status: response.data.status,
        ambulance: response.data.ambulance,
        ambulance_plate: response.data.ambulance_plate,
      };

      localStorage.setItem("schedule", JSON.stringify(updatedSchedule));

      toast({
        title: "Schedule update.",
        description: `Schedule is successfully updated`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["ambulance"]);
      queryClient.invalidateQueries(["admin_all_informations"]);
    },
  });

  const changeStatusHandler = (e) => {
    console.log(schedule.ambulance);
    scheduleMutation.mutate({
      status: e.target.value,
      ambulance: ambulance,
    });
  };

  const handleLogOut = () => {
    scheduleMutation.mutate({
      status: "off-duty",
      ambulance: ambulance,
    });
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("schedule");
      localStorage.removeItem("ambulance_id");
      localStorage.removeItem("ambulance");
      navigate("/");
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

export default React.memo(PersonnelHeader);
