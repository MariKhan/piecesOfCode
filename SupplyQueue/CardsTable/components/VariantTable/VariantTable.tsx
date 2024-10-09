import { FC, memo } from 'react';
import { deepEqual } from 'app/utils/deepEqual';
import { VariantTableWithContext } from './VariantTableWithContext';
import { VariantTableContextProvider } from '../../../context/VariantTableCtx';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';

type VariantTableProps = {
  showVariants: boolean;
  tableData?: Maybe<Maybe<StockUnitResponse>[]>;
  widthToUse: number;
  parentItem: Maybe<ProductResponse>;
};

export const VariantTable: FC<VariantTableProps> = memo(({ showVariants, tableData, widthToUse, parentItem }) => {
  return (
    <VariantTableContextProvider>
      <VariantTableWithContext
        showVariants={showVariants}
        tableData={tableData}
        widthToUse={widthToUse}
        parentItem={parentItem}
      />
    </VariantTableContextProvider>
  );
}, deepEqual);
