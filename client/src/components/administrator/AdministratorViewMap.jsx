import React, { useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../../utils/osm-provider";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import { Button, Box, Flex } from "@chakra-ui/react";
import L from "leaflet";
import AuthContext from "../../context/AuthContext";

import ambulance_icon from "../../assets/icons/ambulance3.png";
import patient_icon from "../../assets/icons/patient3.png";
import building_icon from "../../assets/icons/government.png";

const SOCKET_ENDPOINT = import.meta.env.VITE_REACT_APP_SOCKET_ENDPOINT;

const AdministratorViewMap = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [socket, setSocket] = useState(null);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);

  useEffect(() => {
    const newSocket = io(SOCKET_ENDPOINT);

    newSocket.on("connect", () => {
      console.log(`Connected with socket id ${newSocket.id}`);
      newSocket.emit("join_rooms", {
        rooms: ["admin"],
      });
    });

    newSocket.on("receive_location", (data) => {
      console.log(`Received location data: ${data.lat}, ${data.lng}`);
      setLocations((prevLocations) => [
        ...prevLocations,
        {
          name: data.name,
          user_type: data.user_type,
          lat: data.lat,
          lng: data.lng,
          rooms: data.rooms,
        },
      ]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, ["admin"]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          name: "Office",
          user_type: parsed_user_data.user_type,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          rooms: ["admin"], // Emit to the patient/driver room
        };
        socket.emit("send_location", locationData);

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, ["admin", socket]);

  const ambulanceIcon = new L.Icon({
    iconUrl: ambulance_icon,
    iconRetinaUrl: ambulance_icon,
    iconSize: [35, 35],
  });

  const patientIcon = new L.Icon({
    iconUrl: patient_icon,
    iconRetinaUrl: patient_icon,
    iconSize: [35, 35],
  });

  const buildingIcon = new L.Icon({
    iconUrl: building_icon,
    iconRetinaUrl: building_icon,
    iconSize: [40, 40],
  });

  const iconByUserType = (userType) => {
    if (userType === "ambulance_personnel") {
      return ambulanceIcon;
    }
    if (userType === "requestor") {
      return patientIcon;
    }
    return buildingIcon;
  };

  console.log(locations);
  return (
    <>
      <Flex gap={4} mb={2}>
        <Button
          size="md"
          mb={{ base: 2, md: 4 }}
          width={{ base: "100%", md: "inherit" }}
          onClick={() => setLocations([])}
        >
          Clear locations
        </Button>
      </Flex>
      {latitude !== 0 && longitude !== 0 && (
        <Box w="100%" h="100vh" overflowY="hidden">
          <MapContainer
            center={{
              lat: latitude,
              lng: longitude,
            }}
            zoom={10}
          >
            <TileLayer url={osm.mapTiler.url} />
            {locations
              .filter((location) => location.rooms.includes("admin"))
              .map((location, index) => (
                <Marker
                  key={index}
                  position={{ lat: location.lat, lng: location.lng }}
                  icon={iconByUserType(location.user_type)}
                >
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
          </MapContainer>
        </Box>
      )}
    </>
  );
};
export default AdministratorViewMap;
