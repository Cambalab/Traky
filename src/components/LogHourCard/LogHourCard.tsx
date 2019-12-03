import React from "react";
import {IonButton, IonCard, IonCardContent, IonDatetime, IonIcon} from "@ionic/react";
import {create, timer, trash} from "ionicons/icons";
import {isMobile} from "../../utils/utils";
import {ILogs} from "../../utils/declarations";
import {LOG_HOUR_CARD_TEXTS} from "./constants";
import "./LogHourCard.css";

interface LogHourCard {
    onEditClick: Function,
    onDeleteClick: Function,
    logHour: ILogs
}

const LogHourCard: React.FC<LogHourCard> = ({ onEditClick, onDeleteClick, logHour }) => {

    const handleOnEdit = () => {
        if (onEditClick) {
            onEditClick()
        }
    };

    const handleOnDelete = () => {
        if (onDeleteClick) {
            onDeleteClick()
        }
    };
    return (
        <IonCard className="item-card">
            <IonCardContent>
                <div className="item-card__container">
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
                    <IonDatetime
                        readonly={true}
                        className="item-card__date"
                        displayFormat={LOG_HOUR_CARD_TEXTS.DATE_DISPLAY_FORMAT}
                        value={`${logHour.timestamp}`}
                    />
                    {!isMobile() && (
                        <div className="item-card__description">
                            {logHour.description}
                        </div>
                    )}
                    <div className="item-card__hour">
                        <IonIcon
                            className="item-card__icon"
                            size={"large"}
                            icon={timer}
                        />
                        {logHour.spent_time}
                        <p>{LOG_HOUR_CARD_TEXTS.SPENT_TIME_HOURS_TEXT}</p>
                    </div>
                </div>
                {isMobile() && (
                    <div>
                        <div className="item-card__dividing-line--mobile"/>
                        <div className="item-card__description--mobile">
                            {logHour.description}
                        </div>
                    </div>
                )}
            </IonCardContent>
        </IonCard>
    )
};

export default LogHourCard;
