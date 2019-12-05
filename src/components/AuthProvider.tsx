import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AppContext } from "../store/Store";
import { URL_CONFIG } from "../utils/constants";

interface AuthProviderProps {
  Component: React.FunctionComponent<any>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ Component }) => {
  const { state } = useContext(AppContext);

  return state.isLoged ? (
    <Component />
  ) : (
    <Redirect to={URL_CONFIG.LOGS_LOGIN.path} />
  );
};

export default AuthProvider;
