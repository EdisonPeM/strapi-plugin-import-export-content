/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { Block } from "../../components/common";

function ImportPage({ contentTypes }) {
  return (
    <Block
      title="Export"
      description="Configure the Import Source & Destination"
      style={{ marginBottom: 12 }}
    >
      <h1>Work in Progress</h1>
    </Block>
  );
}

ImportPage.defaultProps = {
  contentTypes: [],
};

ImportPage.propTypes = {
  contentTypes: PropTypes.array,
};

export default memo(ImportPage);
