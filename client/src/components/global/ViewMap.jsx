import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../../utils/osm-provider";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Button, Box } from "@chakra-ui/react";
import L from "leaflet";

import ambulance_icon from "../../assets/icons/ambulance3.png";
import patient_icon from "../../assets/icons/patient3.png";

const SOCKET_ENDPOINT = import.meta.env.VITE_REACT_APP_SOCKET_ENDPOINT;

const ViewMap = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [socket, setSocket] = useState(null);
  const { id, user, user_type } = useParams();

  useEffect(() => {
    const newSocket = io(SOCKET_ENDPOINT);

    newSocket.on("connect", () => {
      console.log(`Connected with socket id ${newSocket.id}`);
      newSocket.emit("patient_driver_room", id);
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
          room: data.room,
        },
      ]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [id]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData = {
          name: user,
          user_type: user_type,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          room: [id, "admin"], // Emit to the patient/driver room
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
  }, [id, socket]);

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

  const iconByUserType = (userType) => {
    if (userType === "ambulance_personnel") {
      return ambulanceIcon;
    }
    return patientIcon;
  };
  return (
    <>
      <Button
        size="md"
        mb={{ base: 2, md: 4 }}
        width={{ base: "100%", md: "inherit" }}
        onClick={() => setLocations([])}
      >
        Clear locations
      </Button>
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
              .filter((location) => location.room.includes(id))
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
export default ViewMap;
