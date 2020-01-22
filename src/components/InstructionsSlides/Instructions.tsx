import React from "react";
import { IonSlides, IonSlide, IonContent, IonImg } from "@ionic/react";

import step1 from "../../img/steps/mobile-step-1.png";
import step2 from "../../img/steps/mobile-step-2.png";
import step3 from "../../img/steps/mobile-step-3.png";

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

export const InstructionsSlides: React.FC = () => (
  <IonContent color="tertiary" fullscreen>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide className="slide__container">
        <IonImg
          className={
            isMobile()
              ? "slider__img img__first-step"
              : "slider__img slider__img--desktop"
          }
          src={step1}
        ></IonImg>

        <h3 className="slide__step-title">
          {KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP_TITLE}
        </h3>
        <h4 className="slide__text">{KEY_VALIDATION_PAGE_TEXTS.FIRST_STEP}</h4>
      </IonSlide>
      <IonSlide className="slide__container">
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
      <IonSlide className="slide__container">
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
      <IonSlide className="slide__container">
        <KeyValidation />
      </IonSlide>
    </IonSlides>
  </IonContent>
);
