import React, { memo } from "react";
import PropTypes from "prop-types";
import { HeaderNav, PluginHeader, useGlobalContext } from "strapi-helper-plugin";

import getTrad from '../../utils/getTrad';

function Layout({ navLinks, children }) {
  const { formatMessage } = useGlobalContext();
  
  return (
    <div className="container-fluid" style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={formatMessage({ id: getTrad('plugin.name')})}
        description={formatMessage({ id: getTrad('plugin.description')})}
      />
      <HeaderNav links={navLinks} style={{ marginTop: "4.4rem" }} />
      <div className="row">{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  navLinks: [],
  children: null,
};

Layout.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.any,
};

export default memo(Layout);
