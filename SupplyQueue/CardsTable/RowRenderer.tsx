import { FC, memo, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ParentTableRow, ParentTableRowNestedTable } from './Table.styled';
import { deepEqual } from 'app/utils/deepEqual';
import { RowRenderItem } from './RowRenderItem';
import { TableConfigType } from '../types';
import { VariantTable } from './components/VariantTable';
import { rowHeight } from 'app/constants';
import { ProductDrawer } from 'app/components/ProductDrawer';
import { SupplyQueueTableDefaultValueCtx } from '../context/TSupplyQueueTableContext';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ProductResponse } from 'app/api/types/ProductsServiceTypes';
import { useGetSupplyQueueStockUnitsByProductId } from 'app/api/graphqlApiRequests/productService/getStockUnitsByProductId';
import { useIsSafari } from 'app/hooks/browserDetection';

interface RowRendererProps {
  item: Maybe<ProductResponse>;
  showHeightAnimation: boolean;
  tableRef: RefObject<HTMLDivElement>;
  tableConfig: TableConfigType[];
}

export const RowRenderer: FC<RowRendererProps> = memo(({ item, tableConfig, tableRef, showHeightAnimation }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const isSafari = useIsSafari();

  const { totalWidth } = useContext(SupplyQueueTableDefaultValueCtx);

  const widthToUse =
    tableRef?.current && tableRef?.current?.clientWidth > totalWidth ? tableRef?.current?.clientWidth : totalWidth;

  const { data, isLoading } = useGetSupplyQueueStockUnitsByProductId({
    skip: !productId,
    productId: String(productId),
    filter: { supply: true },
  });

  const tableHeight = Number(data?.findAllStockUnitByProductId?.length) * rowHeight;
  const height = showVariants ? `${tableHeight + 150}px` : `${rowHeight}px`;

  const parentRowRef = useRef<HTMLTableRowElement>(null);
  const [parentRowTop, setParentRowTop] = useState<number>(0);

  useEffect(() => {
    if (parentRowRef.current) {
      setParentRowTop(parentRowRef.current.offsetTop + parentRowRef.current.offsetHeight);
    }
  }, [showVariants]);

  const topValue = isSafari && showVariants ? `${parentRowTop}px` : '70px';

  const showVariantsHandler = useCallback(
    (id?: string) => {
      if (!productId) {
        setProductId(String(id));
      } else {
        setProductId(null);
      }
    },
    [productId],
  );
  useEffect(() => {
    if (data && !isLoading && productId) {
      setShowVariants(true);
    }
    if (!productId) {
      setShowVariants(false);
    }
  }, [data, isLoading, productId]);
  return (
    <>
      <ParentTableRow
        ref={parentRowRef}
        onClick={() => setOpenDrawer(true)}
        showVariants={showVariants}
        sx={{ height, transition: showHeightAnimation ? 'height 0.5s' : 'height 0s' }}>
        {tableConfig.map(row => (
          <RowRenderItem
            key={row.id}
            item={item}
            row={row}
            showVariants={showVariants}
            showVariantsHandler={showVariantsHandler}
            isLoading={isLoading}
          />
        ))}
        {showVariants && (
          <ParentTableRowNestedTable width={widthToUse} top={topValue} onClick={e => e.stopPropagation()}>
            <VariantTable
              parentItem={item}
              widthToUse={widthToUse}
              showVariants={showVariants}
              tableData={data?.findAllStockUnitByProductId}
            />
          </ParentTableRowNestedTable>
        )}
      </ParentTableRow>
      <ProductDrawer openDrawerInfo={openDrawer} setOpenDrawerInfo={setOpenDrawer} productId={item?.id} />
    </>
  );
}, deepEqual);
