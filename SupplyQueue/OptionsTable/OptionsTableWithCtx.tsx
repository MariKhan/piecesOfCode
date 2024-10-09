import TableHead from '@mui/material/TableHead';
import { ActionsButtonContainer, OptionTableContainer, TableHeaderRow } from './Table.styled';
import { FC, useContext, useLayoutEffect, useRef, useState } from 'react';
import MuiTable from '@mui/material/Table';
import { SupplyQueueVariantTableDefaultConfigValueCtx } from '../context/TVariantTableConfigContext';
import { SupplyQueueTableDefaultValueCtx } from '../context/TSupplyQueueTableContext';
import { OptionsTableHeaderRow } from './OptionsTableHeaderRow';
import { RowRenderer } from './RowRenderer';
import { headerTableHeight } from 'app/constants';
import { SupplyQueueVariantTableDefaultValueCtx } from '../context/SupplyQueueVariantTableDefaultValueCtx';
import { ActionsButton } from './ActionsButton';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';
import { NoSearchContent } from '../CardsTable/NoSearchContent';
import { ScrollbarWithAnimation } from 'app/components/ScrollbarWithAnimation';
import { useResizeTable } from 'app/hooks/useResizeTable';

interface OptionsTableWithCtxProps {
  tableData?: Maybe<Maybe<StockUnitResponse>[]>;
}

export const OptionsTableWithCtx: FC<OptionsTableWithCtxProps> = ({ tableData }) => {
  const { sortedVariantTableConfig, totalWidth } = useContext(SupplyQueueVariantTableDefaultConfigValueCtx);
  const { width, setWidth, searchValue, colorSearch } = useContext(SupplyQueueTableDefaultValueCtx);
  const reservedColumnsIds = [1, 10];
  const tableRef = useRef<HTMLDivElement | null>(null);

  const [tableHasScroll, setTableHasScroll] = useState(false);

  const { selectedRows, setSelectedRows } = useContext(SupplyQueueVariantTableDefaultValueCtx);

  const reservedColumnsCount = reservedColumnsIds.filter(id =>
    sortedVariantTableConfig.find(config => config.id === id && config.showColumn),
  ).length;
  const availableWidth = width - reservedColumnsCount * 50;

  const remainingColumns = sortedVariantTableConfig.filter(
    config => !reservedColumnsIds.includes(config.id) && config.showColumn,
  );
  const columnWidth =
    totalWidth > availableWidth ? totalWidth / remainingColumns.length : availableWidth / remainingColumns.length;
  useLayoutEffect(() => {
    const checkScrollbar = () => {
      return tableRef.current ? tableRef.current.scrollHeight > tableRef.current.clientHeight : false;
    };
    setTableHasScroll(checkScrollbar());
  }, [tableData]);

  const variantsIdArray = selectedRows?.map(row => Number(row?.id)) ?? [];
  const noSearchElements = tableData?.length === 0 && (colorSearch?.length !== 0 || !!searchValue);

  const widthToUse =
    tableRef?.current && tableRef?.current?.clientWidth > totalWidth ? tableRef?.current?.clientWidth : totalWidth;

  useResizeTable(tableRef, setWidth, widthToUse);

  return (
    <div style={{ width: '100%', overflow: 'hidden', position: 'relative', height: '100%' }}>
      <OptionTableContainer
        ref={tableRef}
        sx={{
          borderRadius: '20px',
          border: '1px solid #f0f0f2',
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <ScrollbarWithAnimation scrollableRef={tableRef} tableScroll={{ noSearchElements }}>
          <MuiTable style={{ tableLayout: 'fixed' }} size='small' stickyHeader>
            <TableHead style={{ height: `${headerTableHeight}px` }}>
              <TableHeaderRow>
                {sortedVariantTableConfig.map(item => (
                  <OptionsTableHeaderRow key={item.id} item={item} columnWidth={columnWidth} tableData={tableData} />
                ))}
              </TableHeaderRow>
            </TableHead>
            {noSearchElements ? (
              <NoSearchContent widthToUse={width} height={tableRef?.current?.clientHeight} />
            ) : (
              tableData?.map((item, i) => {
                return (
                  <RowRenderer
                    key={i}
                    item={item}
                    tableConfig={sortedVariantTableConfig}
                    columnWidth={columnWidth}
                    productId={item?.productId}
                  />
                );
              })
            )}
            <ActionsButtonContainer actionButtonPosition={tableHasScroll}>
              {selectedRows.length !== 0 && (
                <ActionsButton selectedRows={selectedRows} variantsIdArray={variantsIdArray} />
              )}
            </ActionsButtonContainer>
          </MuiTable>
        </ScrollbarWithAnimation>
      </OptionTableContainer>
    </div>
  );
};
