import { FC, memo } from 'react';
import { deepEqual } from 'app/utils/deepEqual';
import { VariantTableContextProvider } from '../context/VariantTableCtx';
import { OptionsTableWithCtx } from './OptionsTableWithCtx';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';

type OptionsTableProps = {
  tableData?: Maybe<Maybe<StockUnitResponse>[]>;
};

export const OptionsTable: FC<OptionsTableProps> = memo(({ tableData }) => {
  return (
    <VariantTableContextProvider>
      <OptionsTableWithCtx tableData={tableData} />
    </VariantTableContextProvider>
  );
}, deepEqual);
