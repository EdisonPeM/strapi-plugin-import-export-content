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

import { ContentTypesProviver } from "../../context/contentTypes";

import "../../assets/prismjs.css";

const pathTo = (uri = "") => `/plugins/${pluginId}/${uri}`;
const navLinks = [
  {
    name: `${pluginId}.navlink.import`,
    to: pathTo("import"),
  },
  {
    name: `${pluginId}.navlink.export`,
    to: pathTo("export"),
  },
];

function App() {
  return (
    <Layout navLinks={navLinks}>
      <ContentTypesProviver>
        <Switch>
          <Route path={pathTo("import")}>
            <ImportPage />
          </Route>
          <Route path={pathTo("export")}>
            <ExportPage />
          </Route>
          <Route>
            {/* Default Route Return to Import Page */}
            <Redirect to={pathTo("import")} />
          </Route>
        </Switch>
      </ContentTypesProviver>
    </Layout>
  );
}

export default App;
