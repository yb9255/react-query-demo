import axios, { AxiosResponse } from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = "Bearer token";
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: unknown) => {
    // optionally catch error and add additional logging here

    return error;
  };

  try {
    const clientResponse = await client(options);

    onSuccess(clientResponse);
  } catch (error) {
    onError(error);
  }
};
