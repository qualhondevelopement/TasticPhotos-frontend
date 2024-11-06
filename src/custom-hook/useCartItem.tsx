import { useEffect, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import useFetchData from "./useFetchData";
import API_URLS from "@/customs/constant";

const useCartItem = () => {
  const pathname = usePathname();
  // Memoize the ID extraction to prevent unnecessary recalculations
  const id = useMemo(() => pathname.split("/").pop() || "", [pathname]);
  const dispatch = useDispatch();

  // Memoize the API URL to prevent unnecessary re-renders
  const apiUrl = useMemo(() => API_URLS.GET_MANAGE_CART(id), [id]);

  // Fetch cart data using the custom hook
  const { data: cartData, error, loading } = useFetchData(apiUrl, "GET");

  // Memoize the error handler to prevent recreation on each render
  const handleError = useCallback(
    (error: any) => {
      console.error("Error fetching cart data:", error);
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  // Memoize the success handler
  const handleSuccess = useCallback(
    (data: any) => {
      dispatch(setCartData(data.data));
      dispatch(setLoading(false));
    },
    [dispatch]
  );

  useEffect(() => {
    // Set loading state
    if (loading) {
      dispatch(setLoading(true));
      return;
    }

    // Handle success case
    if (cartData) {
      handleSuccess(cartData);
      return;
    }

    // Handle error case
    if (error) {
      handleError(error);
    }
  }, [cartData, loading, handleSuccess, handleError]);

  // Return only necessary values
  return {
    slug: id,
    loading,
    error: error ? error.data?.error || "Network error" : null,
  };
};

export default useCartItem;
