import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import useFetchData from "./useFetchData";
import API_URLS from "@/customs/constant";

const useCartItem = () => {
  const pathname = usePathname(); // Get current path
  const id = pathname.split("/").pop() || ""; // Extract cart ID from path
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const {
    data: cartData,
    error,
    loading,
  } = useFetchData(API_URLS.GET_MANAGE_CART(id), "GET"); // Fetch cart data

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true)); // Set loading state
    }
    if (cartData) {
      dispatch(setCartData(cartData.data)); // Dispatch fetched cart data
      dispatch(setLoading(false));
    }
    if (error) {
      console.error("Error fetching cart data:", error);
      // Optionally show error notification
      dispatch(setLoading(false));
    }
  }, [cartData, loading, error, dispatch]); // Dependencies

  return { slug: id, loading, error }; // Return values for component use
};

export default useCartItem;
