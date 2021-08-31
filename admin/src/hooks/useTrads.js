import { useGlobalContext } from "strapi-helper-plugin";
import pluginId from "../pluginId";

export default function useTrads() {
  const { formatMessage, ...oters } = useGlobalContext();
  console.log(oters);
  const format = (id, values = {}) =>
    formatMessage({ id: `${pluginId}.${id}`, values });

  return format;
}
