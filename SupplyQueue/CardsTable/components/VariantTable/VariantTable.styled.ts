import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import MuiTableContainer from '@mui/material/TableContainer';
import { headerNestedTableHeight, rowNestedTableHeight } from 'app/constants';

export const CreateProductWithTemplateRow = styled(TableRow)`
  height: ${rowNestedTableHeight}px;
  width: 100%;
  border: none;

  & .MuiTableCell-root {
    border-bottom: none;
    border-top: 1px solid #eaeaef;
  }
`;

export const CreateProductWithTemplateCell = styled(TableCell)<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  font-family: inherit;
  padding: 0 0 0 15px;

  &:last-child {
    position: sticky;
    right: 0;
    padding: 0;
    border-left: 1px solid #eaeaef;
  }
`;
export const ProductRow = styled(TableRow)`
  border: none;

  & .MuiTableCell-root {
    height: ${headerNestedTableHeight}px;
    border-top: 1px solid #eaeaef;
  }
`;

export const TableContainer = styled(MuiTableContainer)`
  margin: 12px 24px;
  border-radius: 20px;

  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #7f80aa;
    border-radius: 50px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
`;
export const TableHeaderRow = styled(TableRow)`
  position: relative;
  background-color: #f5f5f8;
  width: 200px;

  &.last-child td,
  &:last-child th {
    border: 0;
  }
`;

export const TableHeaderCell = styled(TableCell)<{ width: string }>`
  color: #1e2057;
  font-size: 14px;
  width: ${({ width }) => (width ? width : '20px')};
  opacity: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: #f5f5f8;
  padding: 0 0 0 15px;

  &:last-of-type {
    right: 0;
    height: 10px;
    background-color: #f5f5f8;
    padding: 0;
    opacity: 1;
  }
`;
