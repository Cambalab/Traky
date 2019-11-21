import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppPage } from "./utils/declarations";

/* Pages */
import Menu from "./components/Menu";
import LogsList from "./pages/LogsList/LogsList";
import LogHourPage from "./pages/LogHour/LogHourPage";

import { list, timer } from "ionicons/icons";

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
import "./theme/variables.css";
import "./styles/global.scss";
import {URL_CONFIG} from "./utils/constants";

const appPages: AppPage[] = [
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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route path={URL_CONFIG.LOGS_NEW.path} component={LogHourPage} exact={true} />
          <Route path={URL_CONFIG.LOGS_LIST.path} component={LogsList} exact={true} />
          <Route path="/" render={() => <Redirect to={URL_CONFIG.LOGS_LIST.path} exact={true} />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
