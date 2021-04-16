import styled from "styled-components";

const EditorWrapper = styled.div`
  width: 100%;
  height: 19.1rem;

  border: 1px solid #e3e9f3;
  border-radius: 2px;

  overflow: auto;

  .editor {
    font-family: "Fira code", "Fira Mono", monospace;
    font-size: 14;
    font-weight: 400;
    line-height: 18px;

    color: #333740;
    background-color: #ffffff;

    min-height: 100%;

    textarea:focus {
      outline: none;
    }
  }
`;

export { EditorWrapper };
