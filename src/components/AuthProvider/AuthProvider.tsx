import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AppContext } from "../../store/Store";
import { LOGS_SETTINGS_URL_CONFIG } from "../../utils/constants";

interface AuthProviderProps {
  Component: React.FunctionComponent<any>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ Component, ...props }) => {
  const { state } = useContext(AppContext);

  return state.isLoged ? (
    <Component {...props} />
  ) : (
    <Redirect to={LOGS_SETTINGS_URL_CONFIG.path} />
  );
};

export default AuthProvider;
