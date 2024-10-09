import { useState } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Slider } from 'app/components/Slider';
import { useTranslations } from 'next-intl';
import { CompaniesList } from './Companies';
import { ShopsList } from './Shops';

export const ProfilePosition = () => {
  const tAdmin = useTranslations('admin');
  const tCommon = useTranslations('common');
  const tMain = useTranslations('main');

  const buttons = [
    { id: 0, title: tCommon('common_company') },
    { id: 1, title: tMain('employees_employeesFiltersComponentUniversal_shop') },
  ];
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <FlexDir bgColor='#fff' padding='40px' borderRadius='24px' style={{ flex: '1' }} dir='column' gap='16px'>
      <FlexDir justifyContent='space-between' alignItems='center' mb='24px'>
        <Text fontSize='17px' lineHeight='24px' fontWeight={500}>
          {tAdmin('admins_positionSelect')}
        </Text>

        <FlexDir>
          <Slider
            buttons={buttons}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            layoutOptions={{
              activeBackgroundColor: '#fff',
              backgroundColor: '#f1f1f6',
              tabTextActiveColor: '#50528C',
              tabTextColor: '#50528C',
            }}
          />
        </FlexDir>
      </FlexDir>
      {activeTab === 0 && <CompaniesList />}
      {activeTab === 1 && <ShopsList />}
    </FlexDir>
  );
};
