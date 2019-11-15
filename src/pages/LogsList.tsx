import React, { useState, useEffect } from "react";
import { getPlatforms, IonButton } from "@ionic/react";

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
import { string, number } from "prop-types";
import { timer, create } from "ionicons/icons";

import "./LogsList.css";

interface ILogs {
  description: string;
  timestamp: Date;
  spent_time: number;
}

const LogsList: React.FC = () => {
  const [hasError, setError] = useState(false);
  const [loggedHours, setLoggedHours] = React.useState<[ILogs] | null>();

  function isMobile() {
    if (getPlatforms().includes("mobile")) {
      return true;
    }
  }

  async function fetchData() {
    const res = await fetch("http://localhost:3000/users/1/hours");
    res
      .json()
      .then(res => setLoggedHours(res))
      .catch(error => setError(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader className="list-header">
        <IonToolbar color="#00c79a" className="list-header__toolbar">
          <IonButtons>
            <IonMenuButton className="menu__button" />
            <IonTitle className="list-header__title">My logged hours</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*-- List of logged hours --*/}
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
            <p>You dont have any log yet..</p>
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
