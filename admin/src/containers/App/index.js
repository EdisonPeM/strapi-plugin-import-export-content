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
//Trad
import { request, useGlobalContext } from "strapi-helper-plugin";
import getTrad from '../../utils/getTrad';

// Pages
import ImportPage from "../ImportPage";
import ExportPage from "../ExportPage";

import useContentTypes from "../../hooks/useContentTypes";

import "../../assets/prismjs.css";

function App() {
  const { formatMessage } = useGlobalContext();
  const pathTo = (uri = "") => `/plugins/${pluginId}/${uri}`;
  const navLinks = [
    {
      name: formatMessage({id: getTrad('import.tab.name')}),
      to: pathTo("import"),
    },
    {
      name: formatMessage({id: getTrad('export.tab.name')}),
      to: pathTo("export"),
    },
  ];
  const userContentTypes = useContentTypes();

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
