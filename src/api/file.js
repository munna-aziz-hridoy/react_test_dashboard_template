import { url } from "../utils/serverUrl";
console.log(url);

export const imageUpload = async (formData) => {
  const response = await fetch(`${url}/api/file/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  return data;
};
