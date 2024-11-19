import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface LightBoxModalProps {
  show: boolean;
  imageSrc: string;
  caption: string;
  onClose: () => void;
}

const LightBoxModal: React.FC<LightBoxModalProps> = ({
  show,
  imageSrc,
  caption,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="pop-modal-overlay" onClick={onClose}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          {/* &times; */}
          <RxCross2 size={25} className="cross-modal-sign" />
        </button>
        <img src={imageSrc} alt={caption} className="modal-image" />
        {/* <div classNameNameName="modal-caption">{caption}</div> */}
      </div>
    </div>
  );
};

export default LightBoxModal;
