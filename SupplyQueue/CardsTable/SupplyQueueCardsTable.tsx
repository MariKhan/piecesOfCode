import TableHead from '@mui/material/TableHead';
import { ActionsButtonContainer, TableContainer, TableHeaderRow } from './Table.styled';
import { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import MuiTable from '@mui/material/Table';
import { deepEqual } from 'app/utils/deepEqual';
import { TableHeaderRenderer } from './components/TableHeaderRenderer';
import { ActionsButton } from './components/ActionsButton';
import { useCalculateWidth } from './utils/useColumnWidthCalculate';
import { TableBody } from './TableBody';
import { useTypedSelector } from 'app/hooks/redux';
import { SupplyQueueTableDefaultValueCtx } from '../context/TSupplyQueueTableContext';
import { supplyQueueRowsCountOptions } from '../context/SupplyQueueTableContext';
import { SupplyQueueNoContent } from '../SupplyQueueNoContent';
import { TableData } from '../types';
import { ScrollbarWithAnimation } from 'app/components/ScrollbarWithAnimation';
import { useResizeTable } from 'app/hooks/useResizeTable';

export const SupplyQueueCardsTable = memo(({ tableData, isLoading }: { tableData: TableData; isLoading: boolean }) => {
  const [tableHasScroll, setTableHasScroll] = useState(false);

  const { tableConfig, setRowsCount, setWidth, searchValue, colorSearch, categorySearch } = useContext(
    SupplyQueueTableDefaultValueCtx,
  );
  const tableRef = useRef<HTMLDivElement | null>(null);

  const selectedRows = useTypedSelector(state => state.supplyQueueReducer.selectedRows);
  const { countShowRowPerPage, columnWidth, widthToUse } = useCalculateWidth(tableRef);

  useLayoutEffect(() => {
    const productsRowsCount = localStorage.getItem('supplyQueueRowsCount');
    if (!productsRowsCount && countShowRowPerPage) {
      const roundedCountOption =
        supplyQueueRowsCountOptions.find(option => countShowRowPerPage <= parseInt(option.code)) ||
        supplyQueueRowsCountOptions[supplyQueueRowsCountOptions.length - 1];

      setRowsCount({
        code: roundedCountOption.code,
        name: roundedCountOption.name,
      });
    }
  }, [countShowRowPerPage, setRowsCount]);

  useLayoutEffect(() => {
    const checkScrollbar = () => {
      return tableRef.current ? tableRef.current.scrollHeight > tableRef.current.clientHeight : false;
    };
    setTableHasScroll(checkScrollbar());
  }, [tableData]);

  useEffect(() => {
    setWidth(widthToUse);
  }, [setWidth, widthToUse]);

  const noSearchElements = tableData?.length === 0 && (colorSearch?.length !== 0 || !!searchValue);

  useResizeTable(tableRef, setWidth, widthToUse);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
      <TableContainer
        id='supplyQueue-table-id'
        sx={{
          width: `${widthToUse}px`,
        }}
        ref={tableRef}>
        {tableRef !== null && tableData?.length === 0 && !searchValue && !colorSearch && !categorySearch ? (
          <SupplyQueueNoContent />
        ) : (
          <ScrollbarWithAnimation
            scrollableRef={tableRef}
            tableScroll={{
              noSearchElements,
              tableHasScroll,
            }}>
            <MuiTable
              style={{ tableLayout: 'fixed', width: `${widthToUse}px`, position: 'relative' }}
              size='small'
              stickyHeader>
              <TableHead>
                <TableHeaderRow>
                  {tableConfig.map(m => (
                    <TableHeaderRenderer key={m.id} item={m} columnWidth={columnWidth} />
                  ))}
                </TableHeaderRow>
              </TableHead>
              <TableBody
                tableConfig={tableConfig}
                tableRef={tableRef}
                tableData={tableData}
                countShowRowPerPage={countShowRowPerPage}
                widthToUse={widthToUse}
                loading={isLoading}
              />
            </MuiTable>
          </ScrollbarWithAnimation>
        )}
      </TableContainer>
      <ActionsButtonContainer actionButtonPosition={tableHasScroll}>
        {selectedRows.length !== 0 && <ActionsButton selectedRowsLength={selectedRows.length} />}
      </ActionsButtonContainer>
    </div>
  );
}, deepEqual);
