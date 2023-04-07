import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../../utils/osm-provider";
import "leaflet/dist/leaflet.css";

function findLocation() {
  let positionCoords;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        positionCoords = position.coords;
        return positionCoords;
      },
      () => {
        console.log("Geolocation failed.");
      }
    );
  } else {
    console.log("Geolocation not supported.");
  }
}

const positionCoords = findLocation();

const latitude = 15.975838;
const longitude = 121.03351;

const ViewMap = () => {
  const [position, setPosition] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position.coords);
        },
        () => {
          console.log("Geolocation failed.");
        }
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }, [navigator.geolocation]);

  console.log(position?.latitude, position?.longitude);

  return (
    <Box w="100%" h="100vh">
      {position !== undefined && (
        <MapContainer
          center={{
            lat: 15.975838,
            lng: 121.03351,
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
      )}
    </Box>
  );
};

export default React.memo(ViewMap);
