import { FC, memo, useContext } from 'react';
import { CheckboxStyled } from 'app/components/ui';
import { SupplyQueueVariantTableDefaultValueCtx } from '../../../../../context/SupplyQueueVariantTableDefaultValueCtx';
import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface CheckboxRendererProps {
  row: Maybe<StockUnitResponse>;
  productItem?: Maybe<ProductResponse>;
}

export const CheckboxRenderer: FC<CheckboxRendererProps> = memo(({ row, productItem }) => {
  const { selectedRows, setSelectedRows } = useContext(SupplyQueueVariantTableDefaultValueCtx);
  const rowWithProductId = { ...row, productId: productItem?.id };

  const toggleCheckedHandler = () => {
    if (selectedRows.some(s => s?.id === row?.id)) {
      setSelectedRows(prevState => prevState.filter(f => f?.id !== row?.id));
    } else {
      setSelectedRows(prevState => [...prevState, rowWithProductId]);
    }
  };

  return <CheckboxStyled checked={selectedRows.some(s => s?.id === row?.id)} onChange={toggleCheckedHandler} />;
});
