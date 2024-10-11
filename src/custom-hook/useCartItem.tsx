import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import useFetchData from "./useFetchData";
import API_URLS from "@/customs/constant";
import toast from "react-hot-toast";

const useCartItem = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";
  const dispatch = useDispatch();

  const {
    data: cartData,
    error,
    loading,
  } = useFetchData(API_URLS.GET_MANAGE_CART(id), "GET");

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(true));
    }
    if (cartData) {
      dispatch(setCartData(cartData.data));
      dispatch(setLoading(false));
    }
    if (error) {
      console.error("Error fetching cart data:", error);
      toast.error(error.data?.error || "Network error", {
        id: "sd",
      });
      dispatch(setLoading(false));
    }
  }, [cartData, loading, error, dispatch]);

  return { slug: id, loading, error };
};

export default useCartItem;
