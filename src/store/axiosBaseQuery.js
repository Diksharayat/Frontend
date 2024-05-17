
import { toast } from "react-toastify";
// import { getSessionToken } from "@/app/utils/utils";


export const getSessionToken = () => {
  const token = localStorage?.getItem("token");
  if (token) {
    return token;
  }
  return "";
};


const axiosBaseQuery =
  ({ baseUrl, timeout }) =>
  async (args) => {
    const token = getSessionToken();
    console.log(token,'token')
    try {
      const requestOptions = {
        method: args.method || "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          ...args.headers,
        },
        timeout: timeout,
      };

      if (args.isMultipart) {
          
      } else {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(args.payload);
      }

      // Build the URL with parameters if provided
      let url = baseUrl + args.url;
      const params = {};
      for (const [key, value] of Object.entries(args.params || {})) {
        if (value !== null && value !== undefined) {
          params[key] = value;
        }
      }
      if (Object.keys(params).length > 0) {
        const queryString = new URLSearchParams(params).toString();
        url += `?${queryString}`;
      }
      const res = await fetch(url, requestOptions);

      if (!res.ok) {
        const error = new Error("An error occurred while fetching the data.");
        error.info = await res.json();
        error.status = res.status;
        toast.error(error.info?.message);
        throw error;
      }

      const response = await res.json();
      return {
        data: response,
      };
    } catch (error) {
      console.error("Request failed", error);
      throw error;
    }
  };

export default axiosBaseQuery;
