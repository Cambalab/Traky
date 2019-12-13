import React from "react";
import {
  IonButton,
  IonDatetime,
  IonIcon,
  IonBadge,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonItemDivider
} from "@ionic/react";
import { create, timer, trash, calendar } from "ionicons/icons";
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
      <IonItem text-wrap>
        <IonGrid>
          <IonRow>
            <IonCol size="5">
              <div className="item-card__icon-container">
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
            <IonCol className="item-card__col">
              <div className="item-card__icon-container">
                <IonIcon
                  className="item-card__icon"
                  size={"large"}
                  icon={calendar}
                />
                <IonDatetime
                  readonly={true}
                  className="item-card__date"
                  displayFormat={LOG_HOUR_CARD_TEXTS.DATE_DISPLAY_FORMAT}
                  value={`${logHour.timestamp}`}
                />
              </div>
            </IonCol>
          </IonRow>
          <div className="item-card__dividing-line" />
          <IonRow className="item-card__row">
            <IonBadge>{group}</IonBadge>
          </IonRow>

          <IonRow>
            <IonCol className="item-card__col">
              <p className="item-card__description">{logHour.description}</p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
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
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </div>
  );
};

export default LogHourCard;
