import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig, Method } from "axios";
import toast from "react-hot-toast";

const useFetchData = (
  url: string,
  method: Method = "GET",
  config: AxiosRequestConfig = {}
) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        ...config,
      });
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      toast.error(err.message || "An error occurred");
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
