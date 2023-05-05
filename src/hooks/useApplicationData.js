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
        axios.get("/items"),
        axios.get("/users"),
        axios.get("/images/first"),
        axios.get("/categories"),
        axios.get(
          "/items/ending-soon"
        ),
        axios.get("/conditions"),
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
