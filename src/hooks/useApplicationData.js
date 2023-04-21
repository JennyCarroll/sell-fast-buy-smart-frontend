import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// State management
export default function useApplicationData() {
  console.log('Start Application Data');
  const [state, setState] = useState({
    items: [],
    users: [],
    images: [],
    categories: [],
    itemsEndingSoon: [],
    conditions: [],
  });
  const [stateLoading, setStateLoading] = useState(true);
  const [stateRefresh, setStateRefresh] = useState(false);

  //Requests for data on first page load.
  useEffect(() => {
    console.log('pre Axios - UseApplicationData, stateLoading:', stateLoading);
    if (stateLoading) {
      console.log('Application data - starting axios');
      Promise.all([
        axios.get("/items"),
        axios.get("/users"),
        axios.get("/images/first"),
        axios.get("/categories"),
        axios.get("/items/ending-soon"),
        axios.get("/conditions"),
      ]).then((res) => {
        console.log('Application data - axios success');
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
