import React, { FunctionComponent, useContext } from 'react'
import { AppContext } from "../../store/Store"
import { IonToast } from '@ionic/react'
import { ToastOptions } from '@ionic/core'

interface IToastNotification extends ToastOptions {
  isOpen?         : boolean,
  onDidDismiss?   : Function
}

const Notification: FunctionComponent<IToastNotification> = ({
  message,
  duration = 2000,
  color,
  header,
  showCloseButton,
  closeButtonText,
  position,
  isOpen = false
}) => {

  const { dispatch } = useContext(AppContext)

  const hideNotification = () => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload: false
    })
  }

  return (
    <IonToast
      message={message}
      duration={duration}
      color={color}
      header={header}
      showCloseButton={showCloseButton}
      closeButtonText={closeButtonText}
      position={position}
      isOpen={isOpen}
      onDidDismiss={hideNotification}
    />
  )
}

export default Notification
