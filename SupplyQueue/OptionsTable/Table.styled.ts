import styled from '@emotion/styled';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { rowHeight } from 'app/constants';
import TableContainer from '@mui/material/TableContainer';
import { FlexDir } from 'app/styled-components/styles';

export const CreateProductWithTemplateRow = styled(TableRow)`
  height: ${rowHeight}px;
  width: 100%;
`;
export const OptionTableContainer = styled(TableContainer)`
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

export const CreateProductWithTemplateCell = styled(TableCell)<{ width: string }>`
  width: ${({ width }) => width};
  height: ${rowHeight}px;
  font-family: inherit;
  padding: 0 0 0 15px;
  cursor: pointer;

  &:last-child {
    position: sticky;
    right: 0;
    padding: 0;
    border-left: 1px solid #eaeaef;
  }
`;

export const TableHeaderRow = styled(TableRow)`
  position: relative;

  &.last-child td,
  &:last-child th {
    border: 0;
  }
`;
export const ActionsButtonContainer = styled(FlexDir)<{ actionButtonPosition: boolean | null }>`
  position: absolute;
  top: 0;
  right: ${({ actionButtonPosition }) => (!actionButtonPosition ? '61px' : '65px')};
  background-color: transparent;
  z-index: 5;
  pointer-events: none;
  width: 130px;
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
    width: 60px;
    background-color: #f5f5f8;
    padding: 0;
    opacity: 1;
  }
`;
