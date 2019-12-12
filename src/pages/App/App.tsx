import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { list, timer, contact } from "ionicons/icons";
import { AppPage, ILogs } from "../../utils/declarations";
import { getCurrentUser, getHours } from "../../utils/api";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables and global styles */
import "../../theme/variables.css";
import "../../styles/global.css";

/* Pages */
import LogsList from "../LogsList/LogsList";
import LogHourPage from "../LogHour/LogHourPage";
import LoginPage from "../Login/LoginPage";
import EditHourPage from "../../pages/EditHour/EditHourPage";

/* Components */
import Menu from "../../components/Menu/Menu";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import Notification from "../../components/ToastNotification/Notification";

/* Util functions and constant values */
import { URL_CONFIG, LOGS_EDIT_URL_CONFIG, LOGS_LIST_URL_CONFIG, LOGS_LOGIN_URL_CONFIG, LOGS_NEW_URL_CONFIG } from "../../utils/constants";
import { AppContext } from "../../store/Store";

const appPages: AppPage[] = [
  {
    title: URL_CONFIG.LOGS_LOGIN.name,
    url: URL_CONFIG.LOGS_LOGIN.path,
    icon: contact
  },
  {
    title: URL_CONFIG.LOGS_NEW.name,
    url: URL_CONFIG.LOGS_NEW.path,
    icon: timer
  },
  {
    title: URL_CONFIG.LOGS_LIST.name,
    url: URL_CONFIG.LOGS_LIST.path,
    icon: list
  }
];

const App: React.FC = () => {
  const currentUser = getCurrentUser();

  const { state, dispatch } = useContext(AppContext);
  const {showNotification} = state;
  
  const onSuccessGetHours = (res: ILogs[]) => {
    dispatch({
      type: "UPDATE_LIST",
      payload: res
    });
    dispatch({
      type: "UPDATE_LOADING",
      payload: false
    });
  };

  const onErrorGetHours = () => {
    dispatch({
      type: "UPDATE_ERROR",
      payload: true
    });
    dispatch({
      type: "UPDATE_LOADING",
      payload: false
    });
  };

  useEffect(() => {
    dispatch({
      type: "UPDATE_LOADING",
      payload: true
    });
    getHours(currentUser.id, onSuccessGetHours, onErrorGetHours);
  }, []);
  
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu/>
          <IonRouterOutlet id="main">
            <Route
              path={LOGS_LOGIN_URL_CONFIG.path}
              component={LoginPage}
              exact={true}
            />
            <Route
              path={LOGS_NEW_URL_CONFIG.path}
              render={(props) => <AuthProvider Component={LogHourPage} {...props}/>}
              exact={true}
            />
            <Route
              path={LOGS_LIST_URL_CONFIG.path}
              render={(props) => <AuthProvider Component={LogsList} {...props}/>}
              exact={true}
            />
            <Route path={LOGS_EDIT_URL_CONFIG.path} component={EditHourPage} />
            <Route
              path="/"
              render={() => (
                <Redirect to={LOGS_LOGIN_URL_CONFIG.path} exact={true} />
              )}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      {
        showNotification &&
        <Notification
          message={state.notificationOptions.message}
          duration={state.notificationOptions.duration}
          color={state.notificationOptions.color}
          header={state.notificationOptions.header}
          showCloseButton={state.notificationOptions.showCloseButton}
          closeButtonText={state.notificationOptions.closeButtonText}
          position={state.notificationOptions.position}
          isOpen={true}
        />
      }
    </IonApp>
  );
};

export default App;
