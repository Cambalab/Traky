import React, { FunctionComponent, useContext, useState } from "react";
import "./keyInstructions.css";
import { AppContext } from "../../store/Store";
import { History } from "history";
import { copy, arrowForward } from "ionicons/icons";
import {
  IonPage,
  IonContent,
  useIonViewDidEnter,
  IonBadge,
  IonGrid,
  IonRow,
  IonIcon,
  IonCol,
  IonButton,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { LOGS_LIST_URL_CONFIG, LOGIN_MESSAGE } from "../../utils/constants";
import { Plugins } from "@capacitor/core";

import { getUserFromKey } from "../../utils/api";
import { KEY_VALIDATION_PAGE_TEXTS } from "./constants";
import { InstructionsSlides } from "../../components/InstructionsSlides/Instructions";
import {
  createLoginErrorAction,
  createLoginStartAction,
  createLoginSuccessfulAction
} from "../../store/actions/user";
import { createCopyClipboardNotificationAction } from "../../store/actions/notification";
import { selectSettings } from "../../store/selectors/settings";
import { selectKey } from "../../store/selectors/key";
import { selectIsLoadingModal } from "../../store/selectors/loadingModal";
import {
  createHideLoadingModalAction,
  createLoadingModalAction
} from "../../store/actions/loadingModal";

const CapApp = Plugins.App;
const { Clipboard } = Plugins;

interface PageHistory {
  history: History;
}

const KeyInstructionsPage: FunctionComponent<PageHistory> = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const settings = selectSettings(state);
  const key = selectKey(state);
  const { serverAddress, database } = settings;
  const [showSlides, setstateshowSlides] = useState(false);
  const isLoadingGlobal = selectIsLoadingModal(state);

  const LOGIN_ACTION = { message: LOGIN_MESSAGE };

  useIonViewDidEnter(() => {
    if (isLoadingGlobal) {
      dispatch(createHideLoadingModalAction());
    }
    CapApp.addListener("backButton", () => {
      history.goBack();
    });
    if (key && serverAddress && database) {
      onClickActivatedKey();
    }
  });

  const copyKeyToClipboard = async () => {
    await Clipboard.write({
      string: key
    });
    dispatch(createCopyClipboardNotificationAction());
  };

  const onClickActivatedKey = () => {
    const onSuccess = (res: any) => {
      const user = res[0];

      dispatch(createLoginSuccessfulAction({ id: user.id, name: user.name }));
      history.push(LOGS_LIST_URL_CONFIG.path);
    };
    const onError = () => {
      dispatch(createHideLoadingModalAction());
      dispatch(createLoginErrorAction());
    };
    dispatch(createLoadingModalAction(LOGIN_ACTION));
    dispatch(createLoginStartAction());
    getUserFromKey(key, serverAddress, database, onSuccess, onError);
  };

  const renderInstructions = () => {
    return (
      <InstructionsSlides
        userKey={key}
        serverAddressLink={serverAddress}
        onLastStepAction={onClickActivatedKey}
      />
    );
  };

  const renderKey = () => {
    return (
      <IonContent color="tertiary">
        <IonGrid>
          <IonRow className="key__row">
            <IonCol sizeXs="10" offsetXs="1" sizeMd="4" offsetMd="4">
              <IonRow className="key__row--with-padding">
                <IonCol className="key__col">
                  <h4 className="key__title">
                    {KEY_VALIDATION_PAGE_TEXTS.TITLE}
                  </h4>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="key__col" size="1">
                  <IonButton
                    className="key__copy-button"
                    onClick={copyKeyToClipboard}
                  >
                    <IonIcon size={"large"} icon={copy} />
                  </IonButton>
                </IonCol>
                <IonCol className="key__col" offsetXs="2" size="9">
                  <IonBadge color="light">
                    <h5 className="key-badge__text">{key}</h5>
                  </IonBadge>
                </IonCol>
              </IonRow>
              <IonRow className="key__row">
                <IonCol className="key__col">
                  <h5 className="key__title">
                    {KEY_VALIDATION_PAGE_TEXTS.INSTRUCTIONS}
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow className="key__row">
                <IonCol className="key__col">
                  <IonFab
                    color="secondary"
                    vertical="center"
                    horizontal="center"
                    className="key__fab-button"
                  >
                    <IonFabButton onClick={e => setstateshowSlides(true)}>
                      <IonIcon
                        size={"large"}
                        icon={arrowForward}
                        className="item-card__icon"
                      />
                    </IonFabButton>
                  </IonFab>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    );
  };

  return (
    <IonPage>
      {!showSlides && renderKey()}
      {showSlides && renderInstructions()}
    </IonPage>
  );
};

export default KeyInstructionsPage;
