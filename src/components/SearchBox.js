import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import debounce from "lodash/debounce";

function SearchBox(props) {
  const { value, onSearch } = props;

  const [isSearching, setIsSearching] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const debouncedOnSearch = useCallback(debounce((newValue) => {
    setIsSearching(false);
    onSearch(newValue);
  }, 500), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSearch(data.get('search'))
  };

  const handleOnChange = (event) => {
    setIsSearching(true);
    setCurrentValue(event.target.value);
    debouncedOnSearch(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        margin="normal"
        required
        fullWidth
        id="search"
        name="search"
        placeholder="Search your restaurant"
        value={currentValue}
        onChange={handleOnChange}
        InputProps={{
          endAdornment: isSearching ? <CircularProgress size={15}/> : null,
        }}
      />
    </Box>
  );
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onSearch: PropTypes.func,
};

export default SearchBox;
