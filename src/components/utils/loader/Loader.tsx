"use client";
import { PropagateLoader, SyncLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SyncLoader color="#0079c2" size={15} />
    </div>
  );
}

export default Loader;
