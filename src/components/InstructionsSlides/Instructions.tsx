import React from "react";
import { IonSlides, IonSlide, IonContent, IonImg } from "@ionic/react";

import step1 from "../../img/steps/mobile-step-1.png";
import step2 from "../../img/steps/mobile-step-2.png";
import step3 from "../../img/steps/mobile-step-3.png";
import step4 from "../../img/steps/mobile-step-4.png";

import "./Instructions.css";

import KeyValidation from "../../pages/KeyValidation/keyValidation";

import { KEY_VALIDATION_PAGE_TEXTS } from "../../pages/KeyInstructions/constants";
import { isMobile } from "../../utils/utils";

const slideOpts = {
  speed: 400,
  updateOnWindowResize: true,
  centeredSlides: true,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  preloadImages: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
    renderBullet: function(index: number) {
      return (
        '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" > ' +
        (index + 1) +
        "</span>"
      );
    }
  }
};

type InstructionsSlidesProps = {
  onLastStepAction: () => void;
  serverAddressLink: string;
  userKey: string;
};

export const InstructionsSlides: React.FC<InstructionsSlidesProps> = ({
  userKey,
  serverAddressLink,
  onLastStepAction
}) => (
  <IonContent color="tertiary" fullscreen>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide
        className={
          isMobile() ? "slide__container" : "slide__container--desktop"
        }
      >
        <IonImg
          className={
            isMobile() ? "slider__img" : "slider__img slider__img--desktop"
          }
          src={step1}
        ></IonImg>

        <h3 className="slide__step-title">
          {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP_TITLE}
        </h3>
        <h4 className="slide__text">{KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}</h4>
      </IonSlide>
      <IonSlide
        className={
          isMobile() ? "slide__container" : "slide__container--desktop"
        }
      >
        <IonImg
          className={
            isMobile() ? "slider__img" : "slider__img slider__img--desktop"
          }
          src={step2}
        ></IonImg>
        <h3 className="slide__step-title">
          {KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP_TITLE}
        </h3>
        <h4 className="slide__text">{KEY_VALIDATION_PAGE_TEXTS.SECOND_STEP}</h4>
      </IonSlide>
      <IonSlide
        className={
          isMobile() ? "slide__container" : "slide__container--desktop"
        }
      >
        <IonImg
          className={
            isMobile() ? "slider__img" : "slider__img slider__img--desktop"
          }
          src={step3}
        ></IonImg>
        <h3 className="slide__step-title">
          {KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP_TITLE}
        </h3>
        <h4 className="slide__text">{KEY_VALIDATION_PAGE_TEXTS.THIRD_STEP}</h4>
      </IonSlide>
      <IonSlide
        className={
          isMobile() ? "slide__container" : "slide__container--desktop"
        }
      >
        <IonImg
          className={
            isMobile() ? "slider__img" : "slider__img slider__img--desktop"
          }
          src={step4}
        ></IonImg>
        <h3 className="slide__step-title">
          {KEY_VALIDATION_PAGE_TEXTS.FOURTH_STEP_TITLE}
        </h3>
        <h4 className="slide__text">{KEY_VALIDATION_PAGE_TEXTS.FOURTH_STEP}</h4>
      </IonSlide>
      <IonSlide
        className={
          isMobile() ? "slide__container" : "slide__container--desktop"
        }
      >
        <KeyValidation
          authKey={userKey}
          serverAddressLink={serverAddressLink}
          loginFunction={onLastStepAction}
        />
      </IonSlide>
    </IonSlides>
  </IonContent>
);
