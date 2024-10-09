import { RefObject, useContext } from 'react';
import { SupplyQueueTableDefaultValueCtx } from '../../context/TSupplyQueueTableContext';

export const useCalculateWidth = (tableRef: RefObject<HTMLDivElement>) => {
  const { tableConfig, totalWidth } = useContext(SupplyQueueTableDefaultValueCtx);
  const widthToUse =
    tableRef?.current && tableRef?.current?.clientWidth > totalWidth ? tableRef?.current?.clientWidth : totalWidth;

  const reservedColumnsIds = [1, 9, 10];
  const reservedColumnsCount = reservedColumnsIds.filter(id =>
    tableConfig.find(config => config.id === id && config.showColumn),
  ).length;

  const availableWidth = widthToUse - (reservedColumnsCount * 50 + 10);

  const remainingColumns = tableConfig.filter(config => !reservedColumnsIds.includes(config.id) && config.showColumn);
  const columnWidth = availableWidth / remainingColumns.length;
  const countShowRowPerPage = tableRef?.current && Math.floor((tableRef?.current?.clientHeight - 60) / 56);
  return {
    columnWidth,
    countShowRowPerPage,
    widthToUse,
  };
};
