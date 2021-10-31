import React, { memo } from "react";
import PropTypes from "prop-types";
import { HeaderNav, PluginHeader } from "strapi-helper-plugin";
import useTrads from "../../hooks/useTrads";

function Layout({ navLinks, children }) {
  const t = useTrads();

  return (
    <div className="container-fluid py-4 px-5">
      <PluginHeader
        title={t("plugin.name")}
        description={t("plugin.description")}
      />
      <HeaderNav links={navLinks} />
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
