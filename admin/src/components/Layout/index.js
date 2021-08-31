import React, { memo } from "react";
import PropTypes from "prop-types";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";
import useTrads from "../../hooks/useTrads";

function Layout({ navLinks, children }) {
  const format = useTrads();

  return (
    <div className="container-fluid" style={{ padding: "18px 30px" }}>
      <PluginHeader
        title={format("plugin.name")}
        description={format("plugin.description.long")}
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
