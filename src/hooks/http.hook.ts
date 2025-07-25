import { useState, useCallback } from "react";

type HTTPRequestMethods = "GET" | "POST" | "PATCH" | "DELETE" | "PUSH";

interface HTTPHeaders {
  [key: string]: string;
}

interface RequestConfig {
  url: string;
  method?: HTTPRequestMethods;
  body?: string | null | FormData;
  headers?: HTTPHeaders;
}

export const useHttp = () => {
  // const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("idle");

  const request = async (
    // const request = useCallback(async (
    { url, method = "GET", body = null, headers = { "Content-Type": "application/json" } }: RequestConfig
  ) => {
    // setLoadingStatus("loading");
    try {
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      const data = await response.json();
      // setLoadingStatus("idle");
      return data;
    } catch (error) {
      // setLoadingStatus("error");
      throw error;
    }
  };
  // }, [])

  // const modification = useCallback(async (
  //     { url,
  //         method = "PATCH",
  //         body = null,
  //         headers = { "Content-Type": "application/json" }
  //     }: RequestConfig) => {

  //     setLoadingStatus("loading");
  //     try {
  //         const response = await fetch(url, { method, body, headers });
  //         if (!response.ok) {
  //             throw new Error(`Could not fetch ${url}, status: ${response.status}`)
  //         }

  //         const data = await response.json();
  //         setLoadingStatus("idle");
  //         return data;
  //     } catch (error) {
  //         setLoadingStatus("error");
  //         throw error;
  //     }
  // },[]);

  return request;
};
