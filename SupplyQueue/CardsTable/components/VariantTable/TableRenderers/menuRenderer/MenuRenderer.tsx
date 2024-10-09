import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';
import Dialog from '@mui/material/Dialog';
import { ChangeQuantityItemModal } from 'app/components/ChangeQuantityItemModal';
import { Menu } from 'app/components/Menu';
import { IMenuItem } from 'app/components/Menu/Menu';
import { logisticsPagePaths } from 'app/constants/pagePaths';
import { useActions } from 'app/hooks/redux';
import { DeleteSupplyQueueIcon, OnWaySupplyQueueIcon } from 'app/styled-components/NewIcons.styled';
import { FlexDir } from 'app/styled-components/styles';
import { SupplyQueueTableDefaultValueCtx } from 'app/view/(root)/(logistics)/SupplyQueue/context/TSupplyQueueTableContext';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useContext, useState } from 'react';
import { ActionsDeleteOverlay } from './DeleteProduct';

interface MenuRendererProps {
  row?: Maybe<StockUnitResponse>;
  item?: Maybe<ProductResponse>;
}

export const MenuRenderer: FC<MenuRendererProps> = ({ row, item }) => {
  const tMain = useTranslations('main');
  const [showMenu, setShowMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState<'add' | 'delete' | null>(null);
  const [value, setValue] = useState<string>('1');
  const { setAddedProductsCardsSupply, setAddedVariantCardsSupply, setAddedProductsSupply } = useActions();
  const { inputValues } = useContext(SupplyQueueTableDefaultValueCtx);
  const router = useRouter();

  const handleOpenDialog = (type: 'add' | 'delete') => {
    setOpenDialog(type);
    setShowMenu(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const patchedStockUnit = row && { ...row, productId: String(item?.id), supply: true };

  const menuItems: IMenuItem[] = [
    {
      id: 1,
      title: tMain('supplyQueue_menuAdd'),
      icon: <OnWaySupplyQueueIcon />,
      onClick: () => {
        handleOpenDialog('add');
      },
      loading: false,
    },
    {
      id: 2,
      title: tMain('supplyQueue_menuDelete'),
      icon: <DeleteSupplyQueueIcon />,
      onClick: () => handleOpenDialog('delete'),
      loading: false,
    },
  ];

  const addedVariantProduct = () => {
    if (row) {
      setAddedProductsCardsSupply(item!);
      setAddedVariantCardsSupply(row);
      setAddedProductsSupply({
        productId: Number(item?.id),
        stockUnit: {
          stockUnitId: String(row?.id),
          quantity: +value,
          weight: 0,
        },
      });
      router.push(logisticsPagePaths.DELIVERY_FORMALIZATION);
      handleCloseDialog();
    }
  };
  const maxValue = row ? inputValues[Number(row?.id)] : '1';

  return (
    <>
      <FlexDir
        bgColor='#fff'
        width='100%'
        height='100%'
        alignItems='center'
        justifyContent='center'
        style={{ cursor: 'pointer' }}>
        <Menu
          menuItems={menuItems}
          options={{
            position: { horizontal: 'right', vertical: 'center' },
            width: '260px',
            marginLeft: '0',
            iconPosition: 'left',
          }}
        />
      </FlexDir>
      {openDialog === 'add' && (
        <ChangeQuantityItemModal
          openModal={openDialog === 'add'}
          toggleModal={handleCloseDialog}
          item={patchedStockUnit}
          value={value}
          setValue={setValue}
          max={maxValue}
          addItem={addedVariantProduct}
        />
      )}
      <Dialog
        open={openDialog === 'delete'}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            maxWidth: '580px',
            width: '580px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        <ActionsDeleteOverlay handleCloseDialog={handleCloseDialog} stockUnitId={patchedStockUnit?.id} />
      </Dialog>
    </>
  );
};
