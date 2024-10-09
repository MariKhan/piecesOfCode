import { Dispatch, FC, SetStateAction } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Button } from 'app/components/ui/NewButton';
import { SupplyCardsList } from './SupplyCards';
import { SupplyQueueFilters } from './SupplyQueueFilters';
import { useTranslations } from 'next-intl';
import { InDev } from 'app/components/inDev';

interface ISupplyQueueHeader {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  maxValue?: string;
  minValue?: string;
  setMaxValue: Dispatch<SetStateAction<string>>;
  setMinValue: Dispatch<SetStateAction<string>>;
}

export const SupplyQueueHeader: FC<ISupplyQueueHeader> = ({ activeTab, setActiveTab, setMaxValue, setMinValue }) => {
  const tMain = useTranslations('main');

  return (
    <>
      <FlexDir justifyContent='space-between' mb='20px'>
        <Text fontSize='24px' lineHeight='32px' fontWeight={500}>
          {tMain('product_supplyQueue')}
        </Text>
        <FlexDir gap='16px'>
          <InDev>
            <Button size='medium' outlined>
              {tMain('product_supplyQueue_remainsProducts')}
            </Button>
          </InDev>
          <InDev>
            <Button size='medium'>{tMain('product_supplyQueue_createRequisition')} </Button>
          </InDev>
        </FlexDir>
      </FlexDir>
      <SupplyCardsList />
      <SupplyQueueFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
    </>
  );
};
