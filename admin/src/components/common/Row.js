import styled from "styled-components";

const Row = styled.div.attrs(({ className, ...otherProps }) => ({
  ...otherProps,
  className: `row ${className || ""}`,
}))`
  padding-top: 18px;
`;

export default Row;
