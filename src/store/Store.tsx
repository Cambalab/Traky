import React, { createContext, useReducer, Dispatch, useContext } from "react";

interface ILogs {
  id: number;
  description: string;
  timestamp: Date;
  spent_time: number;
}

type Action = {
  type: "UPDATE_LIST";
  payload: ILogs[];
};

type OverviewState = {
  loggedHours: ILogs[];
};

type IContext = {
  state: OverviewState;
  dispatch: Dispatch<Action>;
};

const AppContext = createContext<IContext>({} as IContext);

function useAppContext() {
  return useContext(AppContext);
}

const initialState = {
  loggedHours: [
    {
      id: 1,
      description: "horas",
      timestamp: new Date(),
      spent_time: 2
    }
  ]
};

function reducer(state: OverviewState, action: Action): OverviewState {
  switch (action.type) {
    case "UPDATE_LIST": {
      console.log(state, "pasa");
      return { ...state, loggedHours: action.payload };
    }
    default:
      return state;
  }
}

const AppContextProvider = (props: { children: any }) => {
  const fullInitialState = {
    ...initialState
  };

  const [state, dispatch] = useReducer(reducer, fullInitialState);
  const value = { state, dispatch };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

let AppContextConsumer = AppContext.Consumer;

export {
  AppContext,
  reducer,
  useAppContext,
  AppContextProvider,
  AppContextConsumer
};
