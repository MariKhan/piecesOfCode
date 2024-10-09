import { FC, RefObject, useContext, useEffect, useMemo, useState } from 'react';
import { RowRenderer } from './RowRenderer';
import { FlexDir } from 'app/styled-components/styles';
import { TableSkeleton } from './components/Skeleton';
import MuiTableBody from '@mui/material/TableBody';
import { NoSearchContent } from './NoSearchContent';
import { SupplyQueueTableDefaultValueCtx } from '../context/TSupplyQueueTableContext';
import { TableConfigType, TableData } from '../types';
import { TableContextProvider } from '../context/VariantTableConfigContext';

interface TableBodyProps {
  tableRef: RefObject<HTMLDivElement>;
  tableData: TableData;
  countShowRowPerPage: number | null;
  widthToUse: number;
  loading: boolean;
  tableConfig: TableConfigType[];
}

export const TableBody: FC<TableBodyProps> = ({
  tableConfig,
  tableData,
  widthToUse,
  tableRef,
  countShowRowPerPage,
  loading,
}) => {
  const [showHeightAnimation, setShowHeightAnimation] = useState(true);
  const { searchValue, colorSearch, categorySearch } = useContext(SupplyQueueTableDefaultValueCtx);
  const skeletonArray = useMemo(() => {
    return new Array(countShowRowPerPage).fill(null).map((_, index) => index + 1);
  }, [countShowRowPerPage]);
  useEffect(() => {
    setShowHeightAnimation(true);
    return () => setShowHeightAnimation(false);
  }, []);
  return (
    <MuiTableBody sx={{ width: `${widthToUse}px`, height: '100%' }}>
      {tableData?.length === 0 && (searchValue || colorSearch || categorySearch) ? (
        <NoSearchContent widthToUse={widthToUse} height={tableRef.current?.offsetHeight} />
      ) : (
        <TableContextProvider>
          {tableData && !loading ? (
            tableData?.map(item => {
              return (
                <RowRenderer
                  key={item?.id}
                  item={item}
                  tableConfig={tableConfig}
                  tableRef={tableRef}
                  showHeightAnimation={showHeightAnimation}
                />
              );
            })
          ) : (
            <>
              <FlexDir gap='5px' dir='column' mt='12px'>
                {skeletonArray.map(f => (
                  <TableSkeleton key={f} width={widthToUse} />
                ))}
              </FlexDir>
            </>
          )}
        </TableContextProvider>
      )}
    </MuiTableBody>
  );
};
