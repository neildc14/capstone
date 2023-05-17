import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Authorization from "../utils/auth";

const SOCKET_ENDPOINT = import.meta.env.VITE_REACT_APP_SOCKET_ENDPOINT;

const FetchLocation = () => {
  const { parsed_user_data } = Authorization();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_ENDPOINT);
    newSocket.on("connect", () => {
      console.log(`Connected with socket id ${newSocket.id}`);
      newSocket.emit("join_rooms", {
        rooms: ["admin"],
      });
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          name: parsed_user_data?.fullName,
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
  }, [socket, parsed_user_data]);
};

export default FetchLocation;
