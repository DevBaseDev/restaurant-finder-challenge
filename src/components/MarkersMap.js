import React, { useEffect, useRef, useState } from "react";

function MarkersMap({onClick, children, options}) {
  const ref = useRef();
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {
        zoom: 10,
        center: { lat: 40.7202108,lng: -73.9397034 }
      }));
    }
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }
    }
  }, [map, onClick]);

  return (
    <React.Fragment>

      <div
        ref={ref}
        style={{ flexGrow: "1", height: 650 }}
      />

      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </React.Fragment>
  );
}

export default MarkersMap;
