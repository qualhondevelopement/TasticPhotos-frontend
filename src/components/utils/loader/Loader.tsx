"use client";
import { PropagateLoader, SyncLoader } from "react-spinners";
import "./loader.css"
function Loader() {
  return (
    <div className="modal-overlay">
      <SyncLoader color="#0079c2" size={15} />
    </div>
  );
}

export default Loader;
