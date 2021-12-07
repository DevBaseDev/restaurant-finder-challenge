import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue, green, orange, blueGrey } from '@mui/material/colors';
import get from "lodash/get";

const colorsByGrade = {
  A: blue[500],
  B: green[500],
  C: orange[500],
  N: blueGrey[500],
};

function RestaurantItem(props) {
  const { item } = props;
  const grade = get(item, "grades[0].grade", "").substring(0, 1);

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{
          bgcolor: colorsByGrade[grade],
        }}>
          {grade}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.borough}
            </Typography>
            {` — ${item.address.street}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default RestaurantItem;
