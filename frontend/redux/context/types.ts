import { ReactNode } from "react";

export interface contextPrividerPropsTypes {
  children: ReactNode;
}


export interface initialStateTypes{
    user: any;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    message: string;
}