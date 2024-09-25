"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const slug = "dgheryerk6_w235cb.cxn_23";
  useEffect(() => {
    router.push(`/`);
  }, [router]);

  return null;
}
