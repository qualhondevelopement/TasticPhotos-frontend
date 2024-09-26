"use client";
import { useState, CSSProperties } from "react";
import { FadeLoader } from "react-spinners";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#0079c2");

  return (
    <div className="sweet-loading">
      <FadeLoader
        color={color}
        loading={loading}
        height={50}
        width={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;
