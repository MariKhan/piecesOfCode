import { ColorRenderer } from './TableRenderers/colorRenderer';
import { SpecificationsRenderer } from './TableRenderers/specificationsRenderer';
import { RemainsRenderer } from './TableRenderers/remainsRenderer';
import { QuantityProductRenderer } from './TableRenderers/quantityProductRenderer';
import { VariantTableConfigType } from '../../../types';
import { CheckboxRenderer } from './TableRenderers/checkboxRenderer';
import { MenuRenderer } from './TableRenderers/menuRenderer';
import { ArticleRenderer } from './TableRenderers/articleRenderer';
import { TCommon, TMain, TTables } from 'app/global';
import { StockUnitResponse } from 'app/api/types/ProductsServiceTypes';
import { Maybe } from 'graphql/jsutils/Maybe';

export const variantTableConfig = (args: {
  tCommon: (key: keyof TCommon['common']) => string;
  tMain: (key: keyof TMain['main']) => string;
  tTables: (key: keyof TTables['tableColumnNames']) => string;
}): VariantTableConfigType[] => [
  {
    id: 1,
    headerCellName: '',
    key: '',
    render: (row: Maybe<StockUnitResponse>, _, productItem) => <CheckboxRenderer row={row} productItem={productItem} />,
    width: '60px',
    showColumn: true,
  },
  {
    id: 2,
    headerCellName: args.tMain('product_article'),
    key: 'article photo',
    render: (row: Maybe<StockUnitResponse>) => <ArticleRenderer article={row?.article} photo={row?.photo} />,
    width: '110px',
    showColumn: true,
  },
  {
    id: 3,
    headerCellName: args.tCommon('common_selectColor'),
    key: 'firstColor {hex, name} secondColor {hex, name}',
    render: (row: Maybe<StockUnitResponse>) => <ColorRenderer colors={[row?.firstColor, row?.secondColor]} />,
    width: '150px',
    showColumn: true,
  },
  {
    id: 4,
    headerCellName: args.tMain('productDrawer_specifications'),
    key: 'specification',
    render: (row: Maybe<StockUnitResponse>) => {
      return <SpecificationsRenderer specification={row?.specification} />;
    },
    width: '170px',
    showColumn: true,
  },
  {
    id: 5,
    headerCellName: args.tMain('main_remains'),
    key: 'remains',
    render: (row: Maybe<StockUnitResponse>) => <RemainsRenderer remains={row?.remains} />,
    width: '180px',
    showColumn: true,
  },
  // {
  //   id: 6,
  //   headerCellName: 'Product will end via',
  //   key: '',
  //   render: (row: Maybe<StockUnitResponse>) => <ProductWillEndDataRenderer onWayQuantity={row.onWayQuantity} />,
  //   width: '135px',
  //   showColumn: true,
  // },
  // {
  //   id: 7,
  //   headerCellName: 'Council of Delivery',
  //   key: '',
  //   render: (row: Maybe<StockUnitResponse>) => {
  //     return <CouncilDeliveryRenderer />;
  //   },
  //   width: '135px',
  //   showColumn: true,
  // },
  {
    id: 8,
    headerCellName: args.tTables('table_quantityOfProducts'),
    key: 'supplyQuantity',
    render: (row: Maybe<StockUnitResponse>) => (
      <QuantityProductRenderer stockUnitId={Number(row?.id)} supplyQuantity={row?.supplyQuantity} />
    ),
    width: '135px',
    showColumn: true,
  },

  {
    id: 10,
    headerCellName: '',
    key: 'id',
    render: (row: Maybe<StockUnitResponse>, _, productItem) => <MenuRenderer item={productItem} row={row} />,
    width: '60px',
    showColumn: true,
  },
];
