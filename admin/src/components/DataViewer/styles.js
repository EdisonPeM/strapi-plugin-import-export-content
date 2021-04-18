import styled from "styled-components";

export const Code = styled.pre`
  min-height: 200px;
  height: 200px;
  width: 100%;
  border-radius: 4px;

  background: #1e1e1e;
  color: #fafafa;

  margin: 0;
  padding: 1.2rem;
  overflow: auto;
  white-space: pre-wrap;
  line-height: 2rem;
  cursor: auto;

  resize: vertical;

  &::first-line {
    color: #f8c555;
  }
`;
