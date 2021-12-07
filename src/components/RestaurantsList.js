import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import RestaurantItem from "./RestaurantItem";

const useStyles = makeStyles({
  list: {
    width: '100%',
    maxWidth: 360,
    maxHeight: 550,
    overflowY: "scroll",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
  }
});

function RestaurantsList(props) {
  const { data, onLoadMore, hasMore, isLoading } = props;

  const styles = useStyles();

  return (
    <React.Fragment>
      <List className={styles.list}>
        {data.map((item, index) => (
          <React.Fragment key={item._id}>
            <RestaurantItem item={item} />
            {(index !== data.length -1) && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
      {(hasMore || isLoading) && (
        <Box className={styles.footer}>
          <Button disabled={isLoading} onClick={onLoadMore}>
            Load more
            {isLoading && (
              <React.Fragment>
                &nbsp;
                <CircularProgress size={15} />
              </React.Fragment>
            )}
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}

export default RestaurantsList;
