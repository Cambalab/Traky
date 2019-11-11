import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonMenuButton,
  IonContent, 
  IonHeader,
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel
} from '@ionic/react';

import React from 'react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>HOME</IonCardSubtitle>
            <IonCardTitle>CamApp Traky</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              App para loguear tus actividades de acuerdo al tiempo invertido
            </p>
          </IonCardContent>
        </IonCard>
        <IonList>
          <IonItem routerLink="/home/list">
            <IonLabel>My hours</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
