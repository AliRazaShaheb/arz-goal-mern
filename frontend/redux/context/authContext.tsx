import { createContext, useContext, useReducer } from "react";
import { contextPrividerPropsTypes } from "./types";

const userContext = createContext("");

const ContextProvider = (props: contextPrividerPropsTypes) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <userContext.Provider value={"something"}>
      {props.children}
    </userContext.Provider>
  );
};

const useAuthData = () => {
  const context = useContext(userContext);

  if (context === undefined) {
    throw new Error("please use 'useAuthData Hook' inside ContextProvider");
  }

  return context;
};

export { ContextProvider, useAuthData };
