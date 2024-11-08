import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loadingSlice";
import useFetchData from "./useFetchData";
import API_URLS from "@/customs/constant";
import { usePathname } from "next/navigation";

const useGetGallary = () => {
  const pathname = usePathname(); // Get current path
  const id = pathname.split("/").pop() || ""; // Extract cart ID from path
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const { data, error, loading } = useFetchData(
    API_URLS.GET_GALLARY(id),
    "GET"
  ); // Fetch gallery data

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true)); // Set loading state
    }

    if (error) {
      console.error("Error fetching gallery data:", error);
      // Optionally show error notification
      dispatch(setLoading(false));
    }
  }, [error, loading]); // Only monitor error and loading changes

  return { error };
};

export default useGetGallary;
