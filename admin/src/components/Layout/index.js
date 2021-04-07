import React, { memo } from "react";
import PropTypes from "prop-types";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";

function Layout({ navLinks, children }) {
  return (
    <div className="container-fluid" style={{ padding: "18px 30px" }}>
      <PluginHeader
        title="Import Content"
        description="Import CSV and JSON into your Content Types"
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
