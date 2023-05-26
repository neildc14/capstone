import { useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import Authorization from "../utils/auth";
import ScheduleContext from "../context/ScheduleContext";

const SOCKET_ENDPOINT = import.meta.env.VITE_REACT_APP_SOCKET_ENDPOINT;

const FetchLocation = () => {
  const { parsed_user_data } = Authorization();
  const [socket, setSocket] = useState(null);
  const { status, ambulance_plate } = useContext(ScheduleContext);

  useEffect(() => {
    const newSocket = io(SOCKET_ENDPOINT);
    if (status !== "off-duty") {
      newSocket.on("connect", () => {
        console.log(`Connected with socket id ${newSocket.id}`);
        newSocket.emit("join_rooms", {
          rooms: ["admin"],
        });
      });

      setSocket(newSocket);

      return () => newSocket.disconnect();
    }
  }, [status]);

  useEffect(() => {
    if (status !== "off-duty") {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const locationData = {
            name: `Ambulance: ${ambulance_plate},  Driver:${parsed_user_data?.fullName}`,
            user_type: "ambulance_personnel",
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            rooms: ["admin"],
          };
          socket.emit("send_location", locationData);
        },
        (error) => {
          console.error(error);
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [socket, parsed_user_data, status]);
};

export default FetchLocation;
