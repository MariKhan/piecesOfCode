import { FC, useContext } from 'react';
import { Text } from 'app/styled-components/styles';
import { VariantTableConfigType } from '../types';
import { SupplyQueueVariantTableDefaultValueCtx } from '../context/SupplyQueueVariantTableDefaultValueCtx';
import { TableHeaderCell } from './Table.styled';
import { SettingsButton } from './SettingsButton';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StockUnitResponse } from 'app/api/types/ProductsServiceTypes';

interface OptionsTableHeaderRowProps {
  item: VariantTableConfigType;
  columnWidth: number;
  tableData?: Maybe<Maybe<StockUnitResponse>[]>;
}

export const OptionsTableHeaderRow: FC<OptionsTableHeaderRowProps> = ({ item, columnWidth, tableData }) => {
  const { setSelectedRows, selectedRows } = useContext(SupplyQueueVariantTableDefaultValueCtx);
  const { id, headerCellName, showColumn } = item;

  const setSelectedRowsHandler = () => {
    if (selectedRows?.length === tableData?.length) {
      setSelectedRows([]);
    } else {
      const validDataItems = tableData?.filter((dataItem): dataItem is StockUnitResponse => !!dataItem) ?? [];
      setSelectedRows(validDataItems);
    }
  };

  const width = id === 1 ? '40px' : id === 10 ? '60px' : `${columnWidth}px`;

  return (
    showColumn && (
      <TableHeaderCell key={id} width={width}>
        {headerCellName ? (
          <Text color='#1E2057' fontSize='14px' style={{ opacity: '0.48' }}>
            {headerCellName}
          </Text>
        ) : id == 1 ? (
          <div />
        ) : (
          // <CheckboxStyled
          //   checked={selectedRows?.length === tableData?.length}
          //   onChange={setSelectedRowsHandler}
          //   bgColor='#fff'
          // />
          <SettingsButton />
        )}
      </TableHeaderCell>
    )
  );
};
