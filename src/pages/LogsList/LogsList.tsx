import React, { useState } from "react";
import {IonButton, useIonViewDidEnter} from "@ionic/react";
import { TEXTS } from "../../utils/constants";
import { isMobile } from "../../utils/utils";

import {
  IonPage,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonDatetime,
  IonIcon
} from "@ionic/react";

import { timer, create } from "ionicons/icons";

import "./LogsList.css";
import {getCurrentUser, getHours} from "../../utils/api";

interface ILogs {
  description: string;
  timestamp: Date;
  spent_time: number;
}

const LogsList: React.FC = () => {
  const [hasError, setError] = useState(false);
  const [loggedHours, setLoggedHours] = React.useState<[ILogs] | null>();
  const currentUser = getCurrentUser();

  const onSuccessGetHours = (res: [ILogs]) => {
    setLoggedHours(res);
  };

  const onErrorGetHours = (error: any) => {
    setError(error);
  };

  useIonViewDidEnter(() => {
    getHours(currentUser.id, onSuccessGetHours, onErrorGetHours);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="#00c79a" className="header__toolbar">
          <IonButtons>
            <IonMenuButton className="menu__button" />
            <IonTitle className="header__title">{TEXTS.LIST_TITLE}</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*-- List of logged hours --*/}
        {hasError ? (
          <div className="content___message">
            <p>{TEXTS.LIST_ERROR_MSG}</p>
          </div>
        ) : null}
        {loggedHours ? (
          loggedHours.map((loggedHour, i) => {
            return (
              <IonCard key={i} className="item-card">
                <IonCardContent>
                  <div className="item-card__container">
                    <IonButton
                      routerLink="/"
                      className="item-card__edite-button"
                      fill="outline"
                      shape="round"
                      size="small"
                      color="primary"
                    >
                      <IonIcon
                        className="item-card__icon"
                        size={"small"}
                        icon={create}
                      ></IonIcon>
                    </IonButton>
                    <IonDatetime
                      readonly={true}
                      className="item-card__date"
                      onChange={() => {}}
                      displayFormat="D MMM YY"
                      value={`${loggedHour.timestamp}`}
                    ></IonDatetime>
                    {!isMobile() && (
                      <div className="item-card__description">
                        {loggedHour.description}
                      </div>
                    )}
                    <div className="item-card__hour">
                      <IonIcon
                        className="item-card__icon"
                        size={"large"}
                        icon={timer}
                      ></IonIcon>
                      {loggedHour.spent_time}
                      <p>hrs</p>
                    </div>
                  </div>
                  {isMobile() && (
                    <div>
                      <div className="item-card__dividing-line--mobile"></div>
                      <div className="item-card__description--mobile">
                        {loggedHour.description}
                      </div>
                    </div>
                  )}
                </IonCardContent>
              </IonCard>
            );
          })
        ) : (
          <div className="content___message">
            <p>{TEXTS.LIST_NO_LOGS_YET_MSG}</p>
            <IonButton routerLink="/new" expand="full">
              OK, start now!
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default LogsList;
