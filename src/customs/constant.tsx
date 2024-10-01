export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const API_URLS = {
  GET_BANNER: `${BASE_URL}/api/get-banner-image/`,
  GET_PACKAGE_DATA: `${BASE_URL}/api/get-package-data/`,
  GET_GALLARY: (id: string) => `${BASE_URL}/api/get-gallery/?qr_id=${id}`,
  GET_MANAGE_CART: (id: string) => `${BASE_URL}/api/manage-cart/?qr_id=${id}`,
  POST_MANAGE_CART: `${BASE_URL}/api/manage-cart/`,
  PUT_MANAGE_CART: `${BASE_URL}/api/manage-cart/`,

  GET_PAYMENT_URL: (paymentId: string) =>
    `${BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`,
};
export default API_URLS;
