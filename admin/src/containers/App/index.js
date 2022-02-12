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

import "../../assets/prismjs.css";

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

function App() {
  const userContentTypes = useContentTypes();
  console.log(userContentTypes)

  return (
    <Layout navLinks={navLinks}>
      <Switch>
        <Route path={pathTo("import")}>
          <ImportPage contentTypes={userContentTypes} />
        </Route>
        <Route path={pathTo("export")}>
          <ExportPage contentTypes={userContentTypes} />
        </Route>
        <Route>
          {/* Default Route Retur to Import Page */}
          <Redirect to={pathTo("import")} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
