import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";

const useFetch = (path) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState();
  const { authFetch } = useAppContext();

  useEffect(async () => {
    try {
      const { data } = await authFetch.get(path);
    } catch (error) {
      console.log(error.response.msg);
      console.log("USE_FETCH_ERROR");
    } finally {
      setIsLoading(false);
    }
    return { data, isError, isLoading };
  }, [path]);
};

export default useFetch;
