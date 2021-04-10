import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  overflow: auto;
  background: white;
  margin-top: 1rem;
  border-radius: 4px;
  border: 1px solid #e3e9f3;
  max-height: 300px;

  table {
    width: 100%;
    text-align: center;

    th,
    td {
      padding: 15px;
    }

    th {
      min-width: 15ch;
      background-color: #f3f3f4;
      font-weight: bold;
    }

    th:last-child {
      min-width: 50px;
      width: 50px;
    }

    td:last-child {
      border-left: 1px solid #ccc;
      max-width: 50px;
      padding: 0;

      button {
        border: none;
        outline: none;
        padding: 15px;
        background: transparent;
        font-size: 1.2rem;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          background-color: #fafafa;
        }

        &:hover {
          background-color: #efefef;
        }
      }

      td {
        cursor: auto;
        max-width: 15ch;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export { TableWrapper };
