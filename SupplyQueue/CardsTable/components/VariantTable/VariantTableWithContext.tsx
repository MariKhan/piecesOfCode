import { FC, useContext, useEffect, useState } from 'react';
import { ProductRow, TableContainer, TableHeaderRow } from './VariantTable.styled';
import MuiTable from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { RowRenderer } from './RowRenderer';
import { VariantTableHeaderRow } from './VariantTableHeaderRow';
import { SupplyQueueVariantTableDefaultConfigValueCtx } from '../../../context/TVariantTableConfigContext';
import { headerNestedTableHeight, rowNestedTableHeight } from 'app/constants';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';

interface VariantTableWithContextProps {
  showVariants: boolean;
  tableData?: Maybe<Maybe<StockUnitResponse>[]>;
  widthToUse: number;
  parentItem: Maybe<ProductResponse>;
}

export const VariantTableWithContext: FC<VariantTableWithContextProps> = ({
  tableData = [],
  showVariants,
  widthToUse,
  parentItem,
}) => {
  const tableHeight = (tableData?.length || 0) * rowNestedTableHeight;
  const [heightAnimation, setHeightAnimation] = useState(false);
  const [showHorizontalScroll, setShowHorizontalScroll] = useState(false);

  const { sortedVariantTableConfig, totalWidth } = useContext(SupplyQueueVariantTableDefaultConfigValueCtx);

  const reservedColumnsIds = [1, 9];
  const reservedColumnsCount = reservedColumnsIds.filter(id =>
    sortedVariantTableConfig.find(config => config.id === id && config.showColumn),
  ).length;
  const availableWidth = widthToUse - 110 - reservedColumnsCount * 50;

  const remainingColumns = sortedVariantTableConfig.filter(
    config => !reservedColumnsIds.includes(config.id) && config.showColumn,
  );
  const columnWidth =
    totalWidth > availableWidth ? totalWidth / remainingColumns.length : availableWidth / remainingColumns.length;

  useEffect(() => {
    if (showVariants) {
      setTimeout(() => {
        setHeightAnimation(true);
      }, 0);
    }
    return () => {
      setHeightAnimation(false);
    };
  }, [showVariants]);
  useEffect(() => {
    if (showVariants) {
      setTimeout(() => {
        setShowHorizontalScroll(true);
      }, 500);
    }
  }, [showVariants]);
  return (
    <ProductRow>
      <TableContainer
        sx={{
          position: 'block',
          borderRadius: '20px',
          overflow: 'hidden',
          width: `calc(${widthToUse}px - 170px)`,
          backgroundColor: '#fff',
          border: '1px solid #eaeaef',
          height: heightAnimation ? `${tableHeight + headerNestedTableHeight}px` : '0px',
          transition: 'height 0.5s',
        }}>
        <MuiTable style={{ tableLayout: 'fixed' }} size='small' stickyHeader>
          <TableHead>
            <TableHeaderRow>
              {sortedVariantTableConfig.map(item => (
                <VariantTableHeaderRow key={item.id} item={item} columnWidth={columnWidth} tableData={tableData} />
              ))}
            </TableHeaderRow>
          </TableHead>
          {tableData?.map((item, i) => {
            return (
              <RowRenderer
                key={i}
                item={item}
                tableConfig={sortedVariantTableConfig}
                columnWidth={columnWidth}
                parentItem={parentItem}
              />
            );
          })}
        </MuiTable>
      </TableContainer>
    </ProductRow>
  );
};
