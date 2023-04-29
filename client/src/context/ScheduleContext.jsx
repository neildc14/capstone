import { createContext, useState, useEffect } from "react";

const ScheduleContext = createContext({
  status: "",
  ambulance: "",
  ambulance_plate: "",

  updateScheduleData: () => {},
});

export const ScheduleProvider = ({ children }) => {
  const [responseData, setResponseData] = useState({
    status: "",
    ambulance: "",
    ambulance_plate: "",
  });

  const updateScheduleData = (newData) => {
    setResponseData({ ...responseData, ...newData });
  };

  useEffect(() => {
    let schedule = localStorage.getItem("schedule");
    if (schedule) {
      const parsed_schedule = JSON.parse(schedule);

      setResponseData({
        status: parsed_schedule.status,
        ambulance: parsed_schedule.ambulance,
        ambulance_plate: parsed_schedule.ambulance_plate,
      });
    }
  }, []);
  return (
    <ScheduleContext.Provider value={{ ...responseData, updateScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
