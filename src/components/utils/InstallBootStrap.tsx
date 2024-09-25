"use client";
import React, { useEffect } from "react";

export default function InstallBootStrap() {
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.js");
  }, []);

  return null;
}
