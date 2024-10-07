"use client";
import FailedPage from "@/components/Payment/FailedPage";
import { setSlug } from "@/redux/slugSlice";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Page() {
  const pathname = usePathname();
  const id = pathname.split("/").pop() || "";
  const dispatch = useDispatch();
  if (id) {
    dispatch(setSlug(id));
  }
  return (
    <div>
      <FailedPage />
    </div>
  );
}
