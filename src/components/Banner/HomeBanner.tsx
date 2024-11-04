import React from "react";

const HomeBanner = () => {
  return (
    <div className="position-relative banner-background ">
      <div className="container banner-content ">
        <div className="align-items-center d-flex flex-row justify-content-between">
          {/* First column with image */}
          <div className=" text-center ">
            <img
              src="/images/RBZPhotogs.webp"
              alt="RBZ Photographers"
              className="img-fluid"
            />
          </div>

          {/* Second column with text */}
          <div className="text-center mb-4 mb-md-0">
            <h2 className="mb-3 fs-1">LOOKING FOR YOUR PHOTOS?</h2>
            <p className="fs-6">
              Please upload a photo of yourself so we can find your photos
            </p>
          </div>

          {/* Third column with Gorilla image */}
          <div className="text-center gorilla">
            <img
              src="/images/RBZGorilla.png"
              alt="Gorilla"
              className="img-fluid mb-0 pb-0"
            />
          </div>
        </div>
      </div>

      {/* Overlay Image in Center */}
      <div className="overlay-image-container ">
        <img
          src="/images/adventure photo_master.webp"
          alt="Adventure Photo Master"
          className="img-fluid"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
