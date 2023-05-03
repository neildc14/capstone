import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../../utils/osm-provider";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Button, Box } from "@chakra-ui/react";
// import ambulanceIcon from "../../assets/icons/ambulance2.png";
// import patientIcon from "../../assets/icons/patient2.png";

const ViewMap = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [socket, setSocket] = useState(null);
  const { id, user, user_type } = useParams();

  useEffect(() => {
    const newSocket = io(
      "http://localhost:4000" || "https://staging-capstone.onrender.com/"
    );

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
        <Box w="100%" h="100vh">
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
