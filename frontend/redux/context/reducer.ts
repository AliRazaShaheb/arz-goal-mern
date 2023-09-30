import { initialStateTypes } from "./types";

export const localSt = typeof window !== "undefined" && localStorage.getItem("user");
export const user = JSON.parse(localSt || "{}");

export const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


export const reducer = (state:initialStateTypes, action)=>{

}