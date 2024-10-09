import Dialog from '@mui/material/Dialog';
import { useFetchSupplyQueueStockUnits } from 'app/api/graphqlApiRequests/productService/getStockUnitsByProductId';
import { ProductResponse } from 'app/api/types/ProductsServiceTypes';
import { ChangeQuantityItemModal } from 'app/components/ChangeQuantityItemModal';
import { Menu } from 'app/components/Menu';
import { IMenuItem } from 'app/components/Menu/Menu';
import { logisticsPagePaths } from 'app/constants/pagePaths';
import { useActions } from 'app/hooks/redux';
import { DeleteSupplyQueueIcon, OnWaySupplyQueueIcon } from 'app/styled-components/NewIcons.styled';
import { FlexDir } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { StockUnitResponseWithProductId } from '../../../../context/SupplyQueueTableContext';
import { ActionsDeleteOverlay } from './DeleteProduct';

interface MenuRendererProps {
  row: Maybe<ProductResponse>;
}

export const MenuRenderer: FC<MenuRendererProps> = ({ row }) => {
  const tMain = useTranslations('main');
  const router = useRouter();
  const [value, setValue] = useState<string>('1');
  const {
    fetchSupplyQueueStockUnits,
    queryResult: { isLoading },
  } = useFetchSupplyQueueStockUnits();
  const [addRowStep, setAddRowStep] = useState(0);
  const [loadedStockUnits, setLoadedStockUnits] = useState<StockUnitResponseWithProductId[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [stockUnitIds, setStockUnitIds] = useState<Maybe<string>[]>([]);

  const nextAddRowStep = () => {
    setAddRowStep(p => {
      if (loadedStockUnits.length > p + 1) {
        return p + 1;
      } else {
        setOpenAddDialog(false);
        router.push(logisticsPagePaths.DELIVERY_FORMALIZATION);
        setLoadedStockUnits([]);
        setAddRowStep(0);
        return p;
      }
    });
  };

  const menuItems: IMenuItem[] = [
    {
      id: 1,
      title: tMain('supplyQueue_menuAdd'),
      icon: <OnWaySupplyQueueIcon />,
      onClick: () => {
        if (row) {
          fetchSupplyQueueStockUnits({ productId: row.id, filter: { supply: true } }).then(res => {
            const stockUnits = res.findAllStockUnitByProductId ?? [];
            setLoadedStockUnits(
              stockUnits.map(m => ({
                ...m,
                productId: row?.id,
                supply: true,
              })),
            );
            setOpenAddDialog(true);
          });
        }
      },
      loading: isLoading,
    },
    {
      id: 2,
      title: tMain('supplyQueue_menuDelete'),
      icon: <DeleteSupplyQueueIcon />,
      onClick: () => {
        if (row) {
          fetchSupplyQueueStockUnits({ productId: row.id, filter: { supply: true } }).then(res => {
            const ids = (res?.findAllStockUnitByProductId ?? [])
              .map(m => m?.id)
              .filter((id): id is Maybe<string> => id !== undefined);
            setStockUnitIds(ids);
            setOpenDeleteDialog(true);
          });
        }
      },
      loading: isLoading,
    },
  ];

  const selectedRowStep = loadedStockUnits[addRowStep];
  const toggleAddDialogHandler = () => setOpenAddDialog(p => !p);
  const toggleDeleteDialogHandler = () => setOpenDeleteDialog(p => !p);

  const { setAddedProductsCardsSupply, setAddedVariantCardsSupply, setAddedProductsSupply } = useActions();

  const addedVariantProduct = () => {
    if (selectedRowStep) {
      setAddedProductsCardsSupply(row!);
      setAddedVariantCardsSupply(selectedRowStep);
      setAddedProductsSupply({
        productId: Number(row?.id),
        stockUnit: {
          stockUnitId: String(selectedRowStep?.id),
          quantity: +value,
          weight: 0,
        },
      });
    }
    nextAddRowStep();
  };

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
          loading={isLoading}
          options={{
            position: { horizontal: 'right', vertical: 'center' },
            width: '260px',
            marginLeft: '0',
            iconPosition: 'left',
          }}
        />
      </FlexDir>
      <ChangeQuantityItemModal
        isMulti
        item={selectedRowStep}
        openModal={openAddDialog}
        toggleModal={toggleAddDialogHandler}
        value={value}
        setValue={setValue}
        addItem={addedVariantProduct}
        max={selectedRowStep?.supplyQuantity ?? 0}
        steps={{ step: addRowStep + 1, maxSteps: loadedStockUnits.length }}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={toggleDeleteDialogHandler}
        PaperProps={{
          sx: {
            maxWidth: '580px',
            width: '580px',
            borderRadius: '40px',
            padding: '40px',
          },
        }}>
        <ActionsDeleteOverlay toggleModal={toggleDeleteDialogHandler} stockUnitIds={stockUnitIds} />
      </Dialog>
    </>
  );
};
