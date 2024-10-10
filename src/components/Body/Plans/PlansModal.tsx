"use client";
import "./plan.css";
import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

interface PlansProps {
  show: boolean;
  handleClose: () => void;
  handleModalClick: () => void;
}
type Plan = {
  id: string;
  plan_name: string;
  plan_amount: number;
  plan_description: string;
};

const PlansModal: React.FC<PlansProps> = ({
  show,
  handleClose,
  handleModalClick,
}) => {
  const [data, setData] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-package-data/`
        );
        setData(response.data.data);
      } catch (error: any) {
        console.error("Error fetching plans:", error.message || error);
      }
    };

    fetchPlans();
  }, []);

  const renderPlan = (plan: Plan) => (
    <div className="price-box text-center" key={plan.id}>
      <h4>{plan.plan_name}</h4>
      <h2 className="price-main">
        <span>$</span>
        {plan.plan_amount}
      </h2>
      <p>{plan.plan_description}</p>
      <a className="custom-btn buy-btn" onClick={handleModalClick}>
        Buy Now
      </a>
    </div>
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      className="custom-modal"
    >
      <div className="row justify-content-center ">
        <div className="col-md-12">
          <div className="heading-fonts text-center">
            <Modal.Header
              closeButton
              className="custom-modal-header justify-content-center"
            >
              <Modal.Title className="w-100 text-center">Our Plans</Modal.Title>
            </Modal.Header>
            <p className="max-width-850 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>
        </div>
        <div className="plan-pricing">
          {data.length > 2 ? (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination, Navigation]}
            >
              {data.map((plan) => (
                <SwiperSlide key={plan.id}>{renderPlan(plan)}</SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="col-md-12 d-flex flex-wrap justify-content-center">
              {data.map((plan) => (
                <div className="col-lg-5 col-md-6" key={plan.id}>
                  {renderPlan(plan)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PlansModal;
