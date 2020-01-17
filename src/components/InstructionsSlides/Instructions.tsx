import React from "react";
import { IonSlides, IonSlide, IonContent, IonImg } from "@ionic/react";

import step1 from "../../img/steps/mobile-step-1.jpg";
import step2 from "../../img/steps/mobile-step-2.jpg";
import step3 from "../../img/steps/mobile-step-3.jpg";

import "./Instructions.css";
import { InstructionsProps } from "../../utils/declarations";
import KeyValidation from "../../pages/KeyValidation/keyValidation";

const slideOpts = {
  speed: 400
};

export const InstructionsSlides: React.FC<InstructionsProps> = onLastStepAction => (
  <IonContent color="tertiary" fullscreen>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <IonImg className="slider__img" src={step1}></IonImg>
      </IonSlide>
      <IonSlide>
        <IonImg src={step2}></IonImg>
      </IonSlide>
      <IonSlide>
        <IonImg src={step3}></IonImg>
      </IonSlide>
      <IonSlide>
        <KeyValidation actionButton={() => onLastStepAction} />
      </IonSlide>
    </IonSlides>
  </IonContent>
);
