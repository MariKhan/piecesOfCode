import styled from '@emotion/styled';
import MuiTableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { FlexDir } from 'app/styled-components/styles';
import { headerTableHeight, rowHeight } from 'app/constants';

export const TableContainer = styled(MuiTableContainer)`
  height: 100%;
  min-height: 400px;
  border-radius: 20px;
  border: 1px solid #f0f0f2;
  background-color: #fff;
  position: relative;
  width: 100%;

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

  &.last-child td,
  &:last-child th {
    border: 0;
  }
`;
export const TableBodyRow = styled(TableCell)`
  padding: 0 0 0 15px;
  background-color: #fff;

  &:last-of-type {
    border-bottom: 1px solid transparent;
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
  height: ${headerTableHeight}px;
  background-color: #f5f5f8;
  padding: 0 0 0 15px;

  &:nth-last-of-type(2) {
    right: 60px;
    padding: 0;
    cursor: pointer;
    opacity: 1;
  }

  &:last-of-type {
    right: 0;
    padding: 0;
    cursor: pointer;
    opacity: 1;
  }
`;
export const LastHeaderCell = styled(FlexDir)`
  height: ${headerTableHeight}px;
  align-items: center;
  justify-content: center;
  box-shadow: -4px 0 20px 0 #1e20570f;
  border-left: 1px solid #50528c29;
`;

export const ParentTableRow = styled(TableRow)<{ showVariants: boolean }>`
  position: relative;
  vertical-align: top;
  cursor: pointer;
`;
export const ParentTableRowNestedTable = styled(TableRow)<{ width: number; top?: string | number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  position: absolute;
  left: 0;
  top: ${({ top }) => top};
`;

export const CreateProductWithTemplateLastCell = styled(TableCell)<{ offset: string }>`
  height: ${rowHeight}px;
  width: ${({ width }) => (width ? width : '60px')};
  background-color: #fff;
  z-index: 4;
  vertical-align: center;
  box-shadow: -4px 0 20px 0 #1e20570f;
  border-left: 1px solid #50528c29;
  position: sticky;
  right: ${({ offset }) => offset && offset};
  padding: 0;
`;
export const ActionsButtonContainer = styled(FlexDir)<{ actionButtonPosition: boolean | null }>`
  position: absolute;
  top: 0;
  right: ${({ actionButtonPosition }) => (!actionButtonPosition ? '61px' : '65px')};
  width: 130px;
  background-color: transparent;
  z-index: 5;
  pointer-events: none;
`;
