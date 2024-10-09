import { createContext, Dispatch, SetStateAction } from 'react';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';

export type SupplyQueueTableCtx = {
  selectedRows: Maybe<StockUnitResponse>[];
  setSelectedRows: React.Dispatch<React.SetStateAction<Maybe<StockUnitResponse>[]>>;
};

export const SupplyQueueVariantTableDefaultValueCtx = createContext<SupplyQueueTableCtx>({
  selectedRows: [],
  setSelectedRows: () => {},
});

export const SupplyQueueVariantTableCtx = SupplyQueueVariantTableDefaultValueCtx.Provider;
