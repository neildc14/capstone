import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../../utils/osm-provider";
import "leaflet/dist/leaflet.css";

const ViewMap = () => {
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        () => {
          console.log("Geolocation failed.");
        }
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }, [navigator.geolocation]);

  console.log(longitude, latitude);

  return (
    <>
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
            <Marker position={{ lat: latitude, lng: longitude }}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      )}
    </>
  );
};

export default React.memo(ViewMap);
