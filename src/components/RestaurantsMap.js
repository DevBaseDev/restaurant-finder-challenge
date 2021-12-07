import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { Wrapper } from "@googlemaps/react-wrapper";
import MarkersMap from "./MarkersMap";
import Loading from "./Loading";

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);  
    }
  }, [marker, options]);

  return null;
};

const useStyles = makeStyles({
  map: {
    position: "relative",
    margin: 16,
  },
});

function RestaurantsMap(props) {
  const { data, onAddMarker, isLoading } = props;

  const classes = useStyles();

  const handleOnClick = (event) => {
    onAddMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  }

  return (
    <Wrapper
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      render={(status => (
        status === "LOADING" && null
      ))}
    >
      <Box className={classes.map}>
        {isLoading && <Loading />}
        <MarkersMap markers={data} onClick={handleOnClick}>
          {data.map((marker, i) => (
            <Marker
              key={i}
              title={marker.title}
              label={marker.label}
              position={marker.position}
            />
          ))}
        </MarkersMap>
      </Box>
    </Wrapper>
  )
}

export default RestaurantsMap;
