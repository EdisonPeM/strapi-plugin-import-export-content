/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
// import PropTypes from "prop-types";
import { Block } from "../../components/common";

function ImportPage() {
  return (
    <Block
      title="Export"
      description="Configure the Import Source & Destination"
      style={{ marginBottom: 12 }}
    >
      <h1>Happy Coding</h1>
    </Block>
  );
}

export default memo(ImportPage);
