/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "strapi-helper-plugin";
// Utils
import pluginId from "../../pluginId";
// Containers
import HomePage from "../HomePage";

const pathTo = (uri = "") => `/plugins/${pluginId}${uri}`;
const App = () => {
  return (
    <div>
      <Switch>
        <Route path={pathTo("/")} component={HomePage} exact />
        <Route path={pathTo("users")} component={HomePage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
