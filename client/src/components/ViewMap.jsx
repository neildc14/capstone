import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../utils/osm-provider";
import "leaflet/dist/leaflet.css";

const findLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
      },
      () => {
        console.log("Geolocation failed.");
      }
    );
  } else {
    console.log("Geolocation not supported.");
  }
};

findLocation();

const ViewMap = () => {
  // const [position, setPosition] = useState({});

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setPosition(position.coords);
  //       },
  //       () => {
  //         console.log("Geolocation failed.");
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation not supported.");
  //   }
  // }, [navigator.geolocation]);

  // console.log(position.latitude, position.longitude);

  return (
    <Box w="100%" h="100vh">
      <MapContainer
        center={{
          lat: 15.975838,
          lng: 121.03351,
        }}
        zoom={10}
      >
        <TileLayer url={osm.mapTiler.url} />
        <Marker position={{ lat: 15.975838, lng: 121.03351 }}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default ViewMap;
