import { ReactNode } from 'react';
import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

export type TableData = Maybe<Maybe<ProductResponse>[]> | undefined;

export type TableConfigType = {
  id: number;
  headerCellName: string;
  render: (row: Maybe<ProductResponse>, showVariantsHandler?: () => void | undefined) => ReactNode;
  width: string;
  key?: string;
  showColumn: boolean;
  sortable: boolean;
};

export type VariantTableConfigType = {
  id: number;
  key?: string;
  headerCellName: string;
  render: (
    row: Maybe<StockUnitResponse>,
    showVariantsHandler?: () => void,
    productItem?: Maybe<ProductResponse>,
  ) => ReactNode;
  width: string;
  showColumn: boolean;
};
