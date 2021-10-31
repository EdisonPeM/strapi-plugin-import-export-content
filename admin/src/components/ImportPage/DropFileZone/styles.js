import styled, { css } from "styled-components";

export const Label = styled.label`
  position: relative;
  height: 200px;
  width: 100%;

  border: 2px dashed #e3e9f3;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .icon {
    width: 82px;
    path {
      fill: #ccd0da;
    }
  }

  .isDragging {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .underline {
    color: #1c5de7;
    text-decoration: underline;
    cursor: pointer;
  }

  ${({ isDragging }) => {
    if (isDragging) {
      return css`
        background-color: rgba(28, 93, 231, 0.05) !important;
        border: 2px dashed rgba(28, 93, 231, 0.5) !important;
      `;
    }
  }}
`;

export const P = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 13px;
  color: #9ea7b8;
  u {
    color: #1c5de7;
  }
`;
