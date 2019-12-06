import React, { FunctionComponent, useState } from 'react'
import { IonToast } from '@ionic/react'
import { ToastOptions } from '@ionic/core'

interface IToastNotification extends ToastOptions {
  isOpen?         : boolean | undefined,
  onDidDismiss?   : Function | undefined
}

const Notification: FunctionComponent<IToastNotification> = ({
  message,
  duration,
  color,
  header,
  showCloseButton,
  closeButtonText,
  position,
  mode,
  isOpen,
  onDidDismiss = () => setinternalIsOpen(false)
}) => {

  const [internalIsOpen, setinternalIsOpen] = useState(false)

  return (
    <IonToast
      message={message}
      duration={duration}
      color={color}
      header={header}
      showCloseButton={showCloseButton}
      closeButtonText={closeButtonText}
      position={position}
      mode={mode}
      isOpen={ isOpen || internalIsOpen}
      onDidDismiss={() => onDidDismiss}
    ></IonToast>
  )
}

export default Notification
