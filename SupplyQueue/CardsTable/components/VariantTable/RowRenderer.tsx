import { FC, useState } from 'react';
import { CreateProductWithTemplateCell, CreateProductWithTemplateRow } from './VariantTable.styled';
import { VariantTableConfigType } from '../../../types';
import { ProductDrawer } from 'app/components/ProductDrawer';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';

interface RowRendererProps {
  item: Maybe<StockUnitResponse>;
  columnWidth: number;
  tableConfig: VariantTableConfigType[];
  parentItem: Maybe<ProductResponse>;
}

export const RowRenderer: FC<RowRendererProps> = ({ item, tableConfig, columnWidth, parentItem }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <CreateProductWithTemplateRow onClick={() => setOpenDrawer(true)}>
        {tableConfig.map((m, i) => {
          const width = m.id === 1 || m.id === 10 ? '60px' : `${columnWidth}px`;
          return (
            m.showColumn && (
              <CreateProductWithTemplateCell
                key={i}
                width={width}
                onClick={e => {
                  (m.id === 1 || m.id === 10 || m.id === 8) && e.stopPropagation();
                }}>
                {m.render(item, () => {}, parentItem)}
              </CreateProductWithTemplateCell>
            )
          );
        })}
      </CreateProductWithTemplateRow>
      <ProductDrawer
        openDrawerInfo={openDrawer}
        setOpenDrawerInfo={setOpenDrawer}
        productId={parentItem?.id || '0'}
        stockUnitId={item?.id}
      />
    </>
  );
};
