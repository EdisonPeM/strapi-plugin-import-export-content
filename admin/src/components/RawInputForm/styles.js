import styled from "styled-components";

const EditorWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  height: 200px;

  border: 1px solid #e3e9f3;
  border-radius: 4px;

  overflow: auto;
  resize: vertical;

  .editor {
    // color: #333740;
    // background-color: #ffffff;

    background: #1e1e1e;
    color: #fafafa;

    min-height: 100%;

    textarea:focus {
      outline: none;
    }

    pre {
      color: inherit;

      &::first-line {
        color: #f8c555;
      }
    }
  }
`;

export { EditorWrapper };
