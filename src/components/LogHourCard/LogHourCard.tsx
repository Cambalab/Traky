import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonDatetime,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import { create, timer, trash } from "ionicons/icons";
import { ILogs } from "../../utils/declarations";
import { LOG_HOUR_CARD_TEXTS } from "./constants";
import "./LogHourCard.css";

interface LogHourCard {
  onEditClick: Function;
  onDeleteClick: Function;
  logHour: ILogs;
  group: string | null;
}

const LogHourCard: React.FC<LogHourCard> = ({
  onEditClick,
  onDeleteClick,
  logHour,
  group
}) => {
  const handleOnEdit = () => {
    if (onEditClick) {
      onEditClick();
    }
  };

  const handleOnDelete = () => {
    if (onDeleteClick) {
      onDeleteClick();
    }
  };
  return (
    <div>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="3" className="item-card__hour-col">
              <div className="item-card__hour">
                <IonIcon
                  className="item-card__icon"
                  size={"large"}
                  icon={timer}
                />
                {logHour.spent_time}
                <p className="item-card__hour-text">
                  {LOG_HOUR_CARD_TEXTS.SPENT_TIME_HOURS_TEXT}
                </p>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonDatetime
                readonly={true}
                className="item-card__date"
                displayFormat={LOG_HOUR_CARD_TEXTS.DATE_DISPLAY_FORMAT}
                value={`${logHour.timestamp}`}
              />
            </IonCol>
          </IonRow>
          <IonCol className="item-card-buttons__col" size="5">
            <IonLabel>
              <div className="item-card-buttons__container">
                <IonButton
                  fill="outline"
                  shape="round"
                  size="small"
                  color="primary"
                  onClick={handleOnEdit}
                >
                  <IonIcon
                    className="item-card__icon"
                    size={"small"}
                    icon={create}
                  />
                </IonButton>
                <IonButton
                  fill="outline"
                  shape="round"
                  size="small"
                  color="danger"
                  onClick={handleOnDelete}
                >
                  <IonIcon
                    className="item-card__icon"
                    size={"small"}
                    icon={trash}
                  />
                </IonButton>
              </div>
            </IonLabel>
          </IonCol>
          <IonRow>
            <IonCol size="12">
              <IonBadge>{group}</IonBadge>
              <p className="item-card__description">{logHour.description}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </div>
  );
};

export default LogHourCard;
