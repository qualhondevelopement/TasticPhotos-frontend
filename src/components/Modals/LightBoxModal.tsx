import Image from "next/image";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface LightBoxModalProps {
  show: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const LightBoxModal: React.FC<LightBoxModalProps> = ({
  show,
  images,
  initialIndex,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="pop-modal-overlay" onClick={onClose}>
      <button className="modal-close" onClick={onClose}>
        {/* &times; */}
        <RxCross2 size={25} className="cross-modal-sign" />
      </button>
      <div
        className="modal-dialog-custom slider-img-zoom"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          modules={[Pagination, Navigation]}
          navigation={true}
          pagination={{ clickable: true }}
          initialSlide={initialIndex} // Set the initial slide
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="modal-image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div classNameNameName="modal-caption">{caption}</div> */}
      </div>
    </div>
  );
};

export default LightBoxModal;
