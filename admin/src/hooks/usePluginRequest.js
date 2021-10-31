import { useState } from "react";
import { request } from "strapi-helper-plugin";
import pluginId from "../pluginId";

function usePluginRequest() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const sendData = async ({ url, body = {} }) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const data = await request(`/${pluginId}/${url}`, {
        method: "POST",
        body,
      });

      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      console.error(error);
      setState({ data: null, loading: false, error });
      throw error;
    }
  };

  return { ...state, sendData };
}

export default usePluginRequest;
