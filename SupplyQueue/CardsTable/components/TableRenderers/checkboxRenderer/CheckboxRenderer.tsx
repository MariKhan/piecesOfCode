import { FC, memo } from 'react';
import { CheckboxStyled } from 'app/components/ui';
import { useActions, useTypedSelector } from 'app/hooks/redux';
import { ProductResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface CheckboxRendererProps {
  row: Maybe<ProductResponse>;
}

export const CheckboxRenderer: FC<CheckboxRendererProps> = memo(({ row }) => {
  const selectedRows = useTypedSelector(state => state.supplyQueueReducer.selectedRows);
  const { setSelectedRowsOptionsTable } = useActions();
  const checked = selectedRows.some(s => s?.id === row?.id);

  const toggleCheckedHandler = () => {
    setSelectedRowsOptionsTable(row);
  };
  return (
    <>
      <CheckboxStyled checked={checked} onChange={toggleCheckedHandler} />
    </>
  );
});
