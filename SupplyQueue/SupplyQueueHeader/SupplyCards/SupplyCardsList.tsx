import { FC } from 'react';
import { FlexDir } from 'app/styled-components/styles';
import { ISupplyCard, SupplyCard } from './SupplyCard';
import { useTranslations } from 'next-intl';
import { TMain } from 'app/global';

interface ISupplyCardsList {}

export const supplyCardsData = (t: (key: keyof TMain['main']) => string): ISupplyCard[] => [
  { title: t('product_supplyQueue'), value: '1,394', width: '16%' },
  { title: t('supplyQueue_supplyCardsData_outStock'), value: '2,394', width: '16%' },
  { title: t('supplyQueue_supplyCardsData_overSoon'), value: '11,394', width: '18%' },
  { title: t('supplyQueue_supplyCardsData_lossDueLack'), value: '463,490 ¥', width: '23%' },
  { title: t('supplyQueue_supplyCardsData_lossNotDelivered'), value: '999,490 ¥', width: '27%' },
];
export const SupplyCardsList: FC<ISupplyCardsList> = () => {
  const tMain = useTranslations('main');

  return (
    <FlexDir gap='12px'>
      {supplyCardsData(tMain).map((supplyCard, index) => (
        <SupplyCard key={index} title={supplyCard.title} value={supplyCard.value} width={supplyCard.width} />
      ))}
    </FlexDir>
  );
};
