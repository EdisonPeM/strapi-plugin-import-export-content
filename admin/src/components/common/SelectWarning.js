import styled, { css } from "styled-components";
import { Select } from "@buffetjs/core";
import PropTypes from "prop-types";

const SelectWarning = styled(Select)`
  ${({ value, valueWarning }) =>
    value === valueWarning &&
    css`
      color: #ccc;
      option {
        color: #333740;
      }
    `}

  ${({ value, valueWarning, showWarning }) =>
    value === valueWarning &&
    showWarning &&
    css`
      border-color: #f88;
    `}
`;

SelectWarning.defaultProps = {
  valueWarning: "",
  showWarning: false,
};

SelectWarning.propTypes = {
  valueWarning: PropTypes.string,
  showWarning: PropTypes.bool,
};

export default SelectWarning;
