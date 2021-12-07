import React, { useEffect, useState, useCallback } from "react";
import get from "lodash/get";
import { useApolloClient } from '@apollo/client';
import { loader } from 'graphql.macro';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import RestaurantsList from "../components/RestaurantsList";
import RestaurantsMap from "../components/RestaurantsMap";
import SubmitRestaurantDiaog from "../components/SubmitRestaurantDialog";
import useQueryParams from "../hooks/useQueryParams";
import SearchBox from "../components/SearchBox";

// const restaurantsPageQuery = loader("../graphql/restaurant/restaurantsPageQuery.gql");

const INCREMENT = 10;

function Home() {
  const client = useApolloClient();
  const [query, setQuery] = useQueryParams();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const currentLimit = parseInt(query.limit || 10, 10);

  const fetchRestaurants = useCallback(async (search = "", limit = INCREMENT) => {
    // TODO: Implement this method using apollo client
  }, [client]);

  const handleLoadMore = () => {
    // TODO: Implement this method
  };

  const handleSuccess = () => {
    setSelectedPosition(null);
    setIsAlertVisible(true);
  };
  
  const handleHideAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsAlertVisible(false);
  };

  return (
    <Container>
      <Snackbar open={isAlertVisible} autoHideDuration={6000} onClose={handleHideAlert}>
        <Alert onClose={handleHideAlert} severity="success" sx={{ width: '100%' }}>
          Restaurant succesfully registered!
        </Alert>
      </Snackbar>
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12} sm={8}>
          <RestaurantsMap
            data={restaurants.map((item) => ({
              label: get(item, "grades[0].grade", "").substring(0, 1),
              title: item.name,
              position: {
                lat: item.address.coord[1],
                lng: item.address.coord[0],
              }
            }))}
            onAddMarker={(position) => {
              setSelectedPosition(position);
            }}
            isLoading={isLoading}
          />
          <SubmitRestaurantDiaog
            selectedPosition={selectedPosition}
            onCancel={() => setSelectedPosition(null)}
            onSubmit={handleSuccess}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SearchBox
            value={query.search}
            onSearch={(value) => {
              setQuery({
                limit: INCREMENT,
                search: value,
              });
              fetchRestaurants(value, INCREMENT);
            }}
          />
          <RestaurantsList
            data={restaurants}
            onLoadMore={handleLoadMore}
            hasMore={restaurants.length === currentLimit}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;