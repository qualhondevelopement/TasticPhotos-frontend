import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCartData } from "@/redux/cartSlice";

const useCartData = (id: string) => {
  const dispatch = useDispatch();

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=${id}`
      );
      dispatch(setCartData(response.data.data));
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCartData();
    }
  }, [id, dispatch]);
};

export  {useCartData};
