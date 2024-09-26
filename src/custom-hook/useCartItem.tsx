// useCartItem.ts
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

const useCartItem = () => {
  const [cartData, setCartData] = useState<any>(null);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (id) {
      fetchCartItemData(id);
    }
  }, [id]);

  const fetchCartItemData = async (id: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=${id}`
      );
      setCartData(response.data.data);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  return { cartData, slug: id };
};

export default useCartItem;
