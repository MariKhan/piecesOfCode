import { ProductResponse, StockUnitResponse } from '@/types/ProductsServiceTypes';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'app/components/ui/Inputs/Input/Input';
import { Button } from 'app/components/ui/NewButton';
import { logisticsPagePaths } from 'app/constants/pagePaths';
import { useActions } from 'app/hooks/redux';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SupplyQueueTableDefaultValueCtx } from '../context/TSupplyQueueTableContext';

interface IActionsAddOverlay {
  handleCloseDialog: () => void;
  row?: Maybe<StockUnitResponse>;
  item?: Maybe<ProductResponse>;
}

export const SquareButton = styled(FlexDir)`
  cursor: pointer;
  width: 64px;
  height: 64px;
  background-color: #f1f1f6;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e0e0e5;
    color: #50528c;
    border: none;
  }

  &:active {
    background-color: #d6d6db;
    color: #50528c;
    border: none;
  }
`;

export const ActionsAddOverlay: FC<IActionsAddOverlay> = ({ handleCloseDialog, row, item }) => {
  const [value, setValue] = useState<string>('1');
  const { setAddedProductsCardsSupply, setAddedVariantCardsSupply, setAddedProductsSupply } = useActions();
  const { inputValues } = useContext(SupplyQueueTableDefaultValueCtx);
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef) {
      inputRef?.current?.focus();
    }
  }, [inputRef, row]);
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
  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.currentTarget.value.replace(/\D/g, '');
    setValue(numericValue[0] === '0' ? numericValue[1] : numericValue);
    if (+numericValue > +maxValue) {
      setValue(maxValue);
      return;
    }
    if (numericValue === '0') {
      setValue('1');
    }
  };

  const setMaxMinValueHandler = (value: string) => {
    setValue(value);
  };
  useEffect(() => {
    setValue('1');
  }, [row]);

  return (
    <FlexDir width='100%' height='100%' dir='column' gap='24px'>
      <FlexDir alignItems='center' justifyContent='space-between'>
        <FlexDir gap='12px'>
          <Text fontWeight={500} fontSize='24px'>
            {tMain('cargoPlaces_productsToBeAdded')}
          </Text>
        </FlexDir>
        <CloseIcon htmlColor='#1E2057' onClick={() => handleCloseDialog()} style={{ cursor: 'pointer' }} />
      </FlexDir>
      <FlexDir alignItems='center' gap='12px' width='90%'>
        {row?.photo ? (
          <Image src={row?.photo} width={48} height={48} alt={'text'} style={{ borderRadius: '8px' }} />
        ) : null}
        <FlexDir dir='column' width='90%'>
          <Text ellipsis fontSize='14px' color='#1E2057'>
            {row?.article}
          </Text>
          <FlexDir>
            <FlexDir>
              <Text ellipsis fontSize='12px' color='#50528C'>
                {row?.article}
              </Text>
              <Text ellipsis fontSize='18px' fontWeight={500} color='#50528C' style={{ margin: '0 4px' }}>
                •
              </Text>
              <Text ellipsis fontSize='12px' color='#50528C'>
                {row?.firstColor?.name}
              </Text>
              <Text ellipsis fontSize='18px' fontWeight={500} color='#50528C' style={{ margin: '0 4px' }}>
                •
              </Text>
              <Text ellipsis fontSize='12px' color='#50528C'>
                {row?.specification}
              </Text>
            </FlexDir>
          </FlexDir>
        </FlexDir>
      </FlexDir>
      <FlexDir alignItems='center' gap='16px' justifyContent='center'>
        <SquareButton dir='column' onClick={() => setMaxMinValueHandler('1')}>
          <Text color='#50528C' fontSize='14px'>
            {tCommon('common_min')}
          </Text>
          <Text color='#50528C' fontSize='14px'>
            1
          </Text>
        </SquareButton>
        <FlexDir width='260px' style={{ position: 'relative' }}>
          <Input
            padding='24px 40px 24px 12px'
            onChange={onchangeHandler}
            value={value}
            borderColor='#EAEAEF'
            wrapperWidth='260px'
            height='64px'
            inputWidth='260px'
            ref={inputRef}
          />
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-53%)' }}>
            <Text fontSize='15px'>pcs</Text>
          </div>
        </FlexDir>
        <SquareButton dir='column' onClick={() => setMaxMinValueHandler(String(maxValue))}>
          <Text color='#50528C' fontSize='14px'>
            {tCommon('common_max')}
          </Text>
          <Text color='#50528C' fontSize='14px'>
            {maxValue}
          </Text>
        </SquareButton>
      </FlexDir>
      <FlexDir gap='24px'>
        <Button variant='secondary' onClick={addedVariantProduct}>
          {tCommon('common_add')}
        </Button>
        <Button variant='primary' outlined onClick={handleCloseDialog}>
          {tCommon('common_cancel')}
        </Button>
      </FlexDir>
    </FlexDir>
  );
};
