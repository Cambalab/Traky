import React from "react";
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon
} from "@ionic/react";

import step1 from "../../img/steps/mobile-step-1.png";
import step2 from "../../img/steps/mobile-step-2.png";
import step3 from "../../img/steps/mobile-step-3.png";

import "./Instructions.css";
import { InstructionsProps } from "../../utils/declarations";
import KeyValidation from "../../pages/KeyValidation/keyValidation";
import { arrowForward } from "ionicons/icons";
import { KEY_VALIDATION_PAGE_TEXTS } from "../../pages/KeyInstructions/constants";

const slideOpts = {
  speed: 400
};

export const InstructionsSlides: React.FC<InstructionsProps> = ({ settings, onLastStepAction }) => (
  <IonContent color="tertiary" fullscreen>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide className="slide__container">
        <IonImg className="slider__img" src={step1}></IonImg>
        <h3 className="slide__step-1-text">
          {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP_TITLE}
        </h3>
        <h4 className="slide__text-1">
          {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}
        </h4>
      </IonSlide>
      <IonSlide>
        <IonImg src={step2}></IonImg>
        <h3 className="slide__step-2-text">
          {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP_TITLE}
        </h3>
        <h4 className="slide__text-2">
          {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP}
        </h4>
      </IonSlide>
      <IonSlide>
        <IonImg src={step3}></IonImg>
        <h3 className="slide__step-3-text">
          {KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP_TITLE}
        </h3>
        <h4 className="slide__text-3">
          {KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP}
        </h4>
      </IonSlide>
      <IonSlide>
        <KeyValidation settings={settings} actionButton={onLastStepAction} />
      </IonSlide>
    </IonSlides>
  </IonContent>
);
