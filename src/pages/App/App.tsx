import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import EditHourPage from "../../pages/EditHour/EditHourPage";
import LoginSettingsPage from "../LoginSettings/LoginSettingsPage";

/* Components */
import Menu from "../../components/Menu/Menu";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import Notification from "../../components/ToastNotification/Notification";

/* Util functions and constant values */
import { AppContext } from "../../store/Store";
import {
  LOGS_EDIT_URL_CONFIG,
  LOGS_LIST_URL_CONFIG,
  LOGS_NEW_URL_CONFIG,
  LOGS_SETTINGS_URL_CONFIG,
  KEY_VALIDATION_URL_CONFIG,
  KEY_INSTRUCTIONS_URL_CONFIG,
  EDIT_SETTINGS_URL_CONFIG
} from "../../utils/constants";
import KeyValidationPage from "../KeyValidation/keyValidation";
import KeyInstructionsPage from "../KeyInstructions/keyInstructions";
import {
  selectNotificationOptions,
  selectShowNotification
} from "../../store/selectors/notification";
import EditSettingsPage from "../EditSettings/EditSettingsPage";

const App: React.FC = () => {
  const { state } = useContext(AppContext);
  const notificationOptions = selectNotificationOptions(state);
  const showNotification = selectShowNotification(state);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route
              path={LOGS_SETTINGS_URL_CONFIG.path}
              component={LoginSettingsPage}
              exact={true}
            />
            <Route
              path={EDIT_SETTINGS_URL_CONFIG.path}
              render={props => (
                <AuthProvider Component={EditSettingsPage} {...props} />
              )}
              exact={true}
            />
            <Route
              path={KEY_VALIDATION_URL_CONFIG.path}
              component={KeyValidationPage}
              exact={true}
            />
            <Route
              path={KEY_INSTRUCTIONS_URL_CONFIG.path}
              component={KeyInstructionsPage}
              exact={true}
            />
            <Route
              path={LOGS_NEW_URL_CONFIG.path}
              render={props => (
                <AuthProvider Component={LogHourPage} {...props} />
              )}
              exact={true}
            />
            <Route
              path={LOGS_LIST_URL_CONFIG.path}
              render={props => <AuthProvider Component={LogsList} {...props} />}
              exact={true}
            />
            <Route path={LOGS_EDIT_URL_CONFIG.path} component={EditHourPage} />
            <Route
              path="/"
              render={() => (
                <Redirect to={LOGS_SETTINGS_URL_CONFIG.path} exact={true} />
              )}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      {showNotification && (
        <Notification
          message={notificationOptions.message}
          duration={notificationOptions.duration}
          color={notificationOptions.color}
          header={notificationOptions.header}
          showCloseButton={notificationOptions.showCloseButton}
          closeButtonText={notificationOptions.closeButtonText}
          position={notificationOptions.position}
          isOpen={true}
        />
      )}
    </IonApp>
  );
};

export default App;
