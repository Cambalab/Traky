import React, { useContext } from "react";
import { Redirect } from "react-router";
import { AppContext } from "../../store/Store";
import { LOGS_LOGIN_URL_CONFIG } from "../../utils/constants";
import {selectUserIsLogged} from "../../store/selectors/user";

interface AuthProviderProps {
  Component: React.FunctionComponent<any>;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ Component, ...props }) => {
  const { state } = useContext(AppContext);
  const isLogged = selectUserIsLogged(state);

  return isLogged ? (
    <Component {...props} />
  ) : (
    <Redirect to={LOGS_LOGIN_URL_CONFIG.path} />
  );
};

export default AuthProvider;
