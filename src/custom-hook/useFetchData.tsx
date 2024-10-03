import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import toast from "react-hot-toast";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const useFetchData = (
  url: string,
  method: HttpMethod = "GET",
  config: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await axios({
        url,
        method,
        ...config,
      });
      setData(response.data);
      setError(null);
    } catch (err: any) {
      // console.log(err.response.data.error, "gdggsdds");
      setError(err.response || "An error occurred");
      //toast.error(err.response.data.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

export default useFetchData;
