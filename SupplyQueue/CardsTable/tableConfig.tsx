import { ProductResponse } from '@/types/ProductsServiceTypes';
import { TCommon, TMain, TTables } from 'app/global';
import { Maybe } from 'graphql/jsutils/Maybe';
import { TableConfigType } from '../types';
import { CategoryRenderer } from './components/TableRenderers/categoryRenderer';
import { CheckboxRenderer } from './components/TableRenderers/checkboxRenderer';
import { ColorRenderer } from './components/TableRenderers/colorRenderer';
import { ProductCardRenderer } from './components/TableRenderers/productCardRenderer';
import { QuantityProductRenderer } from './components/TableRenderers/quantityProductRenderer';
import { RemainsRenderer } from './components/TableRenderers/remainsRenderer';

export const initialTableConfig = (args: {
  tCommon: (key: keyof TCommon['common']) => string;
  tMain: (key: keyof TMain['main']) => string;
  tTables: (key: keyof TTables['tableColumnNames']) => string;
}): TableConfigType[] => [
  {
    id: 1,
    headerCellName: '',
    key: 'id',
    render: (row: Maybe<ProductResponse>) => <CheckboxRenderer row={row} />,
    width: '30px',
    showColumn: true,
    sortable: false,
  },

  {
    id: 2,
    key: 'name, photo',
    headerCellName: args.tMain('product_productName'),
    render: (row: Maybe<ProductResponse>) => <ProductCardRenderer title={row?.name} photo={row?.photo} />,
    width: '230px',
    showColumn: true,
    sortable: false,
  },
  {
    id: 3,
    key: 'color {hex, name}',
    headerCellName: args.tCommon('common_selectColor'),
    render: (row: Maybe<ProductResponse>) => <ColorRenderer colors={row?.color} />,
    width: '150px',
    showColumn: true,
    sortable: false,
  },

  {
    id: 4,
    key: 'remains',
    headerCellName: args.tMain('main_remains'),
    render: (row: Maybe<ProductResponse>) => <RemainsRenderer remains={row?.remains} />,
    width: '230px',
    showColumn: true,
    sortable: false,
  },
  {
    id: 5,
    key: 'supplyQuantity',
    headerCellName: args.tTables('table_quantityOfProducts'),
    render: (row: Maybe<ProductResponse>) => <QuantityProductRenderer supplyQuantity={row?.supplyQuantity} />,
    width: '200px',
    showColumn: true,
    sortable: false,
  },
  // {
  //   id: 6,
  //   key: 'onWayQuantity',
  //   headerCellName: 'Product will end via',
  //   render: (row: Maybe<ProductResponse>) => <ProductWillEndDataRenderer onWayQuantity={row.onWayQuantity} />,
  //   width: '230px',
  //   showColumn: true,
  //   sortable: true,
  // },

  // {
  //   id: 7,
  //   key: 'onSaleQuantity',
  //   headerCellName: 'Council of Delivery',
  //   render: (row: Maybe<ProductResponse>) => <CouncilDeliveryRenderer />,
  //   width: '205px',
  //   showColumn: true,
  //   sortable: false,
  // },

  {
    id: 8,
    key: 'category',
    headerCellName: args.tCommon('common_category'),
    render: (row: Maybe<ProductResponse>) => <CategoryRenderer category={row?.category as string} />,
    width: '230px',
    showColumn: true,
    sortable: false,
  },

  {
    id: 9,
    headerCellName: '',
    render: () => <div />,
    width: '60px',
    showColumn: true,
    sortable: false,
  },

  {
    id: 10,
    headerCellName: '',
    render: () => <div />,
    width: '60px',
    showColumn: true,
    sortable: false,
  },
];
