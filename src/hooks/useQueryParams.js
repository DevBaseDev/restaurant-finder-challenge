import React from "react";
import { useSearchParams } from "react-router-dom";

function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const setValue = React.useCallback(
    (newValue, options) => {
      const params = new URLSearchParams(searchParams);
      for (let key in newValue) {
        params.set(key, encodeURIComponent(newValue[key]))
      }
      setSearchParams(params, options);
    },
    [searchParams, setSearchParams]
  );

	const params = {};

	for (let [key, value] of searchParams.entries()) {
		params[key] = value;
	}

  return [params, setValue];
}

export default useQueryParams;
