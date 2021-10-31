import React, { memo } from "react";
import PropTypes from "prop-types";
import { Wrapper, Sub } from "./styles";

function Block({ title, description, children }) {
  return (
    <div className="col-12">
      <Wrapper>
        <Sub>
          {!!title && <p>{title} </p>} {!!description && <p>{description} </p>}
        </Sub>
        {children}
      </Wrapper>
    </div>
  );
}

Block.defaultProps = {
  children: null,
  description: null,
  style: {},
  title: null,
};

Block.propTypes = {
  children: PropTypes.any,
  description: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
};

export default memo(Block);
