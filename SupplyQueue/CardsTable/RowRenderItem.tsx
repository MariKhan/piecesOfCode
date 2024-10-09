import { FC, memo } from 'react';
import { CreateProductWithTemplateLastCell, TableBodyRow } from './Table.styled';
import { FlexDir } from 'app/styled-components/styles';
import { CircularProgress } from '@mui/material';
import { ArrowLightBlueIcon } from 'app/styled-components/NewIcons.styled';
import { deepEqual } from 'app/utils/deepEqual';
import { TableConfigType } from '../types';
import { rowHeight } from 'app/constants';
import { MenuRenderer } from './components/TableRenderers/menuRenderer';
import { ProductResponse } from '@/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

interface RowRenderItemProps {
  row: TableConfigType;
  item: Maybe<ProductResponse>;
  isLoading: boolean;
  showVariants: boolean;
  showVariantsHandler: (id?: string) => void;
}

export const RowRenderItem: FC<RowRenderItemProps> = memo(
  ({ row, item, showVariants, isLoading, showVariantsHandler }) => {
    return (
      row.showColumn &&
      (row.id === 10 || row.id === 9 ? (
        <CreateProductWithTemplateLastCell
          onClick={e => {
            e.stopPropagation();
            row.id === 10 && showVariantsHandler(item?.id);
          }}
          offset={row.id === 9 ? '60px' : '0'}>
          {row.id === 10 ? (
            <FlexDir
              justifyContent='center'
              alignItems='center'
              style={{ cursor: 'pointer', height: `${rowHeight}px` }}>
              {isLoading ? (
                <CircularProgress size={15} sx={{ color: '#7f80aa' }} />
              ) : (
                <ArrowLightBlueIcon showVariants={showVariants} />
              )}
            </FlexDir>
          ) : (
            <FlexDir
              alignItems='center'
              justifyContent='center'
              style={{ cursor: 'pointer', height: `${rowHeight}px` }}>
              <MenuRenderer row={item} />
            </FlexDir>
          )}
        </CreateProductWithTemplateLastCell>
      ) : (
        <TableBodyRow
          key={row.id}
          onClick={e => {
            row.id === 1 && e.stopPropagation();
          }}>
          <FlexDir style={{ height: `${rowHeight}px` }} alignItems='center'>
            {item && row.render(item, showVariantsHandler)}
          </FlexDir>
        </TableBodyRow>
      ))
    );
  },
  deepEqual,
);
