import { url } from "../utils/serverUrl";

export const addProduct = async (product_data) => {
  const response = await fetch(`${url}/api/products/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(product_data),
  });

  const data = await response.json();

  return data;
};
