import { createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";

export const stateContext = createContext();

export default function StateProvider(props) {
  const { state, setState, setStateRefresh } = useApplicationData();

  const stateInfo = { state, setState, setStateRefresh };

  return (
    <stateContext.Provider value={stateInfo}>
      {props.children}
    </stateContext.Provider>
  );
}
