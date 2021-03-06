import React, { useState, createContext } from "react";

export const ActualMapContext = createContext();

export const ActualMapContextProvider = (props) => {
  const [map, setActualMap] = useState({ name: "", handicap: "", id: "" });

  return (
    <ActualMapContext.Provider value={[map, setActualMap]}>
      {props.children}
    </ActualMapContext.Provider>
  );
};
