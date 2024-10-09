import { FC, memo, MouseEvent, useState } from 'react';
import { deepEqual } from 'app/utils/deepEqual';
import { VariantTableConfigType } from '../types';
import { CreateProductWithTemplateCell, CreateProductWithTemplateRow } from './Table.styled';
import { ProductDrawer } from 'app/components/ProductDrawer';
import { Maybe } from 'graphql/jsutils/Maybe';
import { StockUnitResponse } from '@/types/ProductsServiceTypes';

interface RowRendererProps {
  item?: Maybe<StockUnitResponse>;
  columnWidth: number;
  tableConfig: VariantTableConfigType[];
  productId: Maybe<string> | undefined;
}

export const RowRenderer: FC<RowRendererProps> = memo(({ item, tableConfig, columnWidth, productId }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCellClick = (e: MouseEvent<HTMLDivElement>, id: number) => {
    if (id === 1 || id === 10 || id === 8) {
      e.stopPropagation();
    } else {
      setOpenDrawer(true);
    }
  };

  return (
    <>
      <CreateProductWithTemplateRow onClick={() => setOpenDrawer(true)}>
        {tableConfig.map((m, i) => {
          const width = m.id === 1 || m.id === 10 ? '60px' : `${columnWidth}px`;
          return (
            m.showColumn && (
              <CreateProductWithTemplateCell key={i} width={width} onClick={e => handleCellClick(e, m.id)}>
                {m.render(item)}
              </CreateProductWithTemplateCell>
            )
          );
        })}
      </CreateProductWithTemplateRow>
      <ProductDrawer
        openDrawerInfo={openDrawer}
        setOpenDrawerInfo={setOpenDrawer}
        productId={productId}
        stockUnitId={item?.id}
      />
    </>
  );
}, deepEqual);
