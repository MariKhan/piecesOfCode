import styled from '@emotion/styled';
import { Pagination as MuiPagination } from '@mui/material';

export const Input = styled.input`
  width: 36px;
  height: 36px;
  border: 1px solid #eaeaef;
  border-radius: 8px;
  padding-left: 10px;
  color: #7f80aa;

  &:focus {
    outline: none;
  }
`;

export const Pagination = styled(MuiPagination)`
  & .MuiButtonBase-root {
    color: #50528c;

    &:hover {
      background-color: transparent;
    }
  }

  & .Mui-selected {
    background-color: #fd6e08 !important;
    border-radius: 8px;
    color: white;

    &:hover {
      background-color: #fd6e08;
    }
  }
`;
