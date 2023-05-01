import { useState, useEffect } from "react";
import axios from "axios";

// State management
export default function useApplicationData() {
  const [state, setState] = useState({
    items: [],
    users: [],
    images: [],
    categories: [],
    itemsEndingSoon: [],
    conditions: [],
  });
  const [stateLoading, setStateLoading] = useState(true);
  const [setStateRefresh] = useState(false);

  useEffect(() => {
    if (stateLoading) {
      Promise.all([
        axios.get("https://octopus-app-hzms7.ondigitalocean.app/items"),
        axios.get("https://octopus-app-hzms7.ondigitalocean.app/users"),
        axios.get("https://octopus-app-hzms7.ondigitalocean.app/images/first"),
        axios.get("https://octopus-app-hzms7.ondigitalocean.app/categories"),
        axios.get(
          "https://octopus-app-hzms7.ondigitalocean.app/items/ending-soon"
        ),
        axios.get("https://octopus-app-hzms7.ondigitalocean.app/conditions"),
      ]).then((res) => {
        setState((prev) => ({
          ...prev,
          items: res[0].data,
          users: res[1].data,
          images: res[2].data,
          categories: res[3].data,
          itemsEndingSoon: res[4].data,
          conditions: res[5].data,
        }));
        setStateLoading(false);
      });
    }
  }, [stateLoading]);

  return {
    state,
    setState,
    stateLoading,
    setStateLoading,
    setStateRefresh,
  };
}
