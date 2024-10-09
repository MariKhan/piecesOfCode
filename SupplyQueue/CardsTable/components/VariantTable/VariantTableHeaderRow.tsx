import { FC, useContext } from 'react';
import { TableHeaderCell } from './VariantTable.styled';
import { Text } from 'app/styled-components/styles';
import { CheckboxStyled } from 'app/components/ui';
import { SupplyQueueVariantTableDefaultValueCtx } from '../../../context/SupplyQueueVariantTableDefaultValueCtx';
import { VariantTableConfigType } from '../../../types';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface VariantTableHeaderRowProps {
  item: VariantTableConfigType;
  columnWidth: number;
  tableData: Maybe<Maybe<StockUnitResponse>[]>;
}

export const VariantTableHeaderRow: FC<VariantTableHeaderRowProps> = ({ item, columnWidth, tableData }) => {
  const { setSelectedRows, selectedRows } = useContext(SupplyQueueVariantTableDefaultValueCtx);
  const { id, headerCellName, showColumn } = item;

  const setSelectedRowsHandler = () => {
    if (selectedRows?.length === tableData?.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tableData || []);
    }
  };

  const width = id === 1 ? '40px' : id === 10 ? '60px' : `${columnWidth}px`;

  return (
    showColumn && (
      <TableHeaderCell key={id} width={width}>
        {headerCellName ? (
          <Text color='#1E2057' fontSize='12px' style={{ opacity: '0.48' }}>
            {headerCellName}
          </Text>
        ) : (
          id == 1 && (
            <CheckboxStyled
              checked={selectedRows?.length === tableData?.length}
              onChange={setSelectedRowsHandler}
              bgColor='#fff'
            />
          )
        )}
      </TableHeaderCell>
    )
  );
};
