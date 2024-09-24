"use client";

import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Image from "next/image";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import page from "../page";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CheckoutPage = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [productOrderDetail, setProductOrderDetail] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [receiptResponse, setReceiptResponse] = useState<any>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handlePayment = async () => {
    dispatch(isLoading(true));
    const path = window.location.pathname;
    const paymentId = path.split("payment_id=")[1];
    const paymentUrl = `https://python.qualhon.in/tinniless/payments/create-checkout-session/?payment_id=${paymentId}`;

    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.get(paymentUrl);

      if (response.data && stripe) {
        dispatch(isLoading(false));
        return stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      }
    } catch (error) {
      dispatch(isLoading(false));
      console.error("Payment failed", error);
    }
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      dispatch(isLoading(true));
      const path = window.location.pathname;
      const paymentId = path.split("payment_id=")[1];
      try {
        const axiosInstance = await createAxiosInstance();
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/get-place-order-details/?payment_id=${paymentId}`
        );
        console.log(response);
        setProductOrderDetail(response.data.data);
        dispatch(isLoading(false));
      } catch (error: any) {
        dispatch(isLoading(false));
        toast.error("Error While Fetching Order Data");
      } finally {
        dispatch(isLoading(false));
      }
    };

    fetchOrderDetail();
  }, []);

  const submitReceipt = async () => {
    dispatch(isLoading(true));
    const path = window.location.pathname;
    const paymentId = path.split("payment_id=")[1];
    const formData = new FormData();
    formData.append("payment_id", paymentId);
    formData.append("payment_receipt", selectedFile as any);
    try {
      const axiosInstance = await createAxiosInstance();
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/upload-payment-receipt/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setReceiptResponse(response.data);
      toast.success("Receipt upload Successfully");
      dispatch(isLoading(false));
      setSelectedFile(null);
    } catch (error: any) {
      dispatch(isLoading(false));
      console.log(error);
      Toast.error("Error while Uploading Receipt");
    } finally {
      dispatch(isLoading(false));
    }
  };

  useEffect(() => {
    if (receiptResponse) {
      redirect("/order-history");
    }
  }, [receiptResponse]);

  return (
    <div className="px-4 py-4 w-full flex justify-center items-center h-screen">
      <div className="w-[1200px] shadow-custom-light  rounded-[10px] px-7 py-7 mt-4 ml-2  gap-7 justify-between">
        <div className="relative w-[80px] h-[60px]">
          <Image src={"/logo.png"} fill alt="logo" />
        </div>
        <div className="">
          <div>
            <p className="font-semibold mt-7">Product Name:Tinniless Device</p>
          </div>
          <div className="relative  w-[200px] h-[250px]">
            <Image src={"/headphone2.png"} fill alt="logo" />
          </div>
          <div>
            <p className="font-semibold mt-5">
              Product Price/Item :{" "}
              {
                productOrderDetail?.order?.products[0]?.net_amount?.currency
                  ?.currency_symbol
              }
              {productOrderDetail?.order?.products[0]?.net_amount?.value}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-5">
              Quantity :{productOrderDetail?.order?.products[0]?.quantity}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-5">
              Total Price :
              {productOrderDetail?.amount?.currency?.currency_symbol}
              {productOrderDetail?.amount?.value}
            </p>
          </div>
          <div className="mt-5">
            <button
              onClick={handleClick}
              className="bg-primary font-semibold text-white px-4 py-2 rounded"
            >
              Upload Payment Receipt
            </button>

            <input
              id="fileInput"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile && (
              <div className="mt-4">
                <p className="text-gray-700">
                  Selected file: {selectedFile.name}
                </p>
              </div>
            )}
          </div>
        </div>
        {!selectedFile ? (
          <div className="w-full flex justify-end">
            <button
              onClick={handlePayment}
              className=" rounded-md bg-primary px-3 py-[14px] text-sm font-semibold leading-6 text-white shadow-sm capitalize mt-5 "
            >
              Make Your Payment
            </button>
          </div>
        ) : (
          <div className="w-full flex justify-end">
            <button
              onClick={submitReceipt}
              className=" rounded-md bg-primary px-3 py-[14px] text-sm font-semibold leading-6 text-white shadow-sm capitalize mt-5 "
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Page = () => (
  <Elements stripe={stripePromise}>
    <CheckoutPage />
  </Elements>
);

export default page;
function isLoading(arg0: boolean): any {
    throw new Error("Function not implemented.");
}

