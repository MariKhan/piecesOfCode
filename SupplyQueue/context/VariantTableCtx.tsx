import { FC, ReactNode, useState } from 'react';
import { SupplyQueueVariantTableCtx } from './SupplyQueueVariantTableDefaultValueCtx';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

type TableContextProviderProps = {
  children?: ReactNode;
};

export const VariantTableContextProvider: FC<TableContextProviderProps> = ({ children }) => {
  const [selectedRows, setSelectedRows] = useState<Maybe<StockUnitResponse>[]>([]);

  return <SupplyQueueVariantTableCtx value={{ selectedRows, setSelectedRows }}>{children}</SupplyQueueVariantTableCtx>;
};
