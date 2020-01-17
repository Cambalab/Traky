import {
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonTitle,
    IonToolbar,
    IonItemGroup,
    IonItemOptions,
    IonItemSliding,
    IonItemOption
} from '@ionic/react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { useAppContext } from "../../store/Store";
import {
  LOG_LIST_MENU_OPTION,
  LOGOUT_MENU_OPTION,
  NEW_LOG_MENU_OPTION,
  USER_OPTION,
  SETTINGS_MENU_OPTION
} from "./constants";
import { LOGS_LOGIN_URL_CONFIG } from "../../utils/constants";
import { History } from "history";
import {cleanStoredKey, cleanStoredSettings} from "../../utils/utils";

interface Menu {
  history: History;
}
const Menu: React.FunctionComponent<Menu> = ({ history }) => {
    const { state, dispatch } = useAppContext();
    const { isLogged, user } = state;

    const logout = async () => {
        Promise.all([
            cleanStoredSettings(),
            cleanStoredKey()
        ])
        .then(() => {
            dispatch({ type: 'SET_USER', payload: {} });
            dispatch({ type: 'LOGOUT' });
            history.push(LOGS_LOGIN_URL_CONFIG.path);
        });
    };

    return (
        <IonMenu contentId="main" type="overlay">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {
                      <IonMenuToggle autoHide={false}>
                        <IonItem routerLink={SETTINGS_MENU_OPTION.url} routerDirection="none">
                          <IonIcon slot="start" icon={SETTINGS_MENU_OPTION.icon} />
                          <IonLabel>{SETTINGS_MENU_OPTION.title}</IonLabel>
                        </IonItem>
                      </IonMenuToggle>
                    }
                    {isLogged &&
                        <IonMenuToggle autoHide={false}>
                            <IonItem routerLink={NEW_LOG_MENU_OPTION.url} routerDirection="none">
                                <IonIcon slot="start" icon={NEW_LOG_MENU_OPTION.icon} />
                                <IonLabel>{NEW_LOG_MENU_OPTION.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    }
                    {isLogged &&
                        <IonMenuToggle autoHide={false}>
                            <IonItem routerLink={LOG_LIST_MENU_OPTION.url} routerDirection="none">
                                <IonIcon slot="start" icon={LOG_LIST_MENU_OPTION.icon} />
                                <IonLabel>{LOG_LIST_MENU_OPTION.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    }
                    {isLogged &&
                      <IonMenuToggle autoHide={false}>
                          <IonItemGroup>
                            <IonItemSliding >
                              <IonItem detail>
                                  <IonIcon slot="start" icon={USER_OPTION.icon} />
                                  <IonLabel>{user.name}</IonLabel>
                              </IonItem>
                              <IonItemOptions>
                                  <IonItemOption type="button" color="light" onClick={logout}>
                                    <IonIcon slot="start" icon={LOGOUT_MENU_OPTION.icon} />
                                    <IonLabel>{LOGOUT_MENU_OPTION.title}</IonLabel>
                                  </IonItemOption>
                              </IonItemOptions>
                            </IonItemSliding>
                          </IonItemGroup>
                      </IonMenuToggle>
                    }
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default withRouter(Menu);
