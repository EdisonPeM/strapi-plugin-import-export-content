/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "../../components/Layout";
// Utils
import pluginId from "../../pluginId";
// Pages
import ImportPage from "../ImportPage";
import ExportPage from "../ExportPage";

import useContentTypes from "../../hooks/useContentTypes";

const pathTo = (uri = "") => `/plugins/${pluginId}/${uri}`;
const navLinks = [
  {
    name: "Import Data",
    to: pathTo("import"),
  },
  {
    name: "Export Data",
    to: pathTo("export"),
  },
];

const App = () => {
  const userContentTypes = useContentTypes();
  console.log(userContentTypes);

  return (
    <Layout navLinks={navLinks}>
      <Switch>
        <Route path={pathTo("import")} component={ImportPage} />
        <Route path={pathTo("export")} component={ExportPage} />
        <Route>
          <Redirect to={pathTo("import")} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
