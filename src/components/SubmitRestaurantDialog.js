import React, { useState } from 'react';
import get from "lodash/get";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import useRestaurant from '../hooks/useRestaurant';

function SubmitRestaurantDiaog(props) {
  const {
    selectedPosition,
    onSubmit,
    onCancel,
  } = props;

  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { location, onCreateRestaurant } = useRestaurant(selectedPosition);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsCreating(true);

    try {
      await onCreateRestaurant({
        name,
        cuisine,
      });
      onSubmit();
      setName("");
      setCuisine("");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={!!selectedPosition} onClose={onCancel}>
      <DialogTitle>Add new restaurant</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Sign up your new restaurant and apply for a free-tax certificate!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          placeholder="Name"
          fullWidth
          variant="standard"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          value={cuisine}
          placeholder="Cuisine"
          fullWidth
          variant="standard"
          onChange={(event) => setCuisine(event.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          value={get(location, "address.street")}
          placeholder="Street"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={get(location, "address.building")}
          placeholder="Building"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={get(location, "address.zipcode")}
          placeholder="Zip Code"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={get(location, "borough")}
          placeholder="Borough"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isCreating} onClick={handleSubmit}>
          Submit
          {isCreating && (
            <React.Fragment>
              &nbsp;
              <CircularProgress size={15} />
            </React.Fragment>
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubmitRestaurantDiaog;
