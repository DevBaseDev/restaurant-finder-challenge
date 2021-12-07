import { useState, useEffect } from "react";
import { useApolloClient } from '@apollo/client';
import { loader } from 'graphql.macro';

// const createRestaurantMutation = loader("../graphql/restaurant/createRestaurantMutation.gql");

const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json";

const parseAddressComponents = (address) => {
  const building = address.address_components.find((item) => item.types.includes("street_number"));
  const street = address.address_components.find((item) => item.types.includes("route"));
  const zipCode = address.address_components.find((item) => item.types.includes("postal_code"));
  const borough = address.address_components.find((item) => item.types.includes("sublocality_level_1"));

  return {
    address: {
      building: building.long_name,
      coord: [address.geometry.location.lng, address.geometry.location.lat],
      street: street.long_name,
      zipcode: zipCode.long_name,
    },
    borough: borough.long_name,
  }
};

function useRestaurant(position) {
  const [location, setLocation] = useState({});
  const client = useApolloClient();

  const geoCodePosition = async ({ lat, lng }) => {
    try {
      const res = await fetch(`${geocodeURL}?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
      const data = await res.json();

      if (data.status === "OK") {
        return parseAddressComponents(data.results[0])
      }

      return null;
    } catch(err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    if (position) {
      geoCodePosition(position).then((data) => {
        setLocation(data);
      });
    }
  }, [position]);

  /**
   * Helper used to create a restaurant through GraphQL API
   * @param {Object} restaurant
   */
  const onCreateRestaurant = async (restaurant) => {
    const variables = {
      ...location,
      ...restaurant,
      created_at: new Date(),
    };

    // TODO: Implement this mutation using apollo client
  };

  return {
    location,
    onCreateRestaurant,
  }
}

export default useRestaurant;
