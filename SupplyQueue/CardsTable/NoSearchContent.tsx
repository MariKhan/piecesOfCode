import { headerTableHeight } from 'app/constants';
import { LoupeOrange100Icon } from 'app/styled-components/NewIcons.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

export const NoSearchContent: FC<{ widthToUse: number; height?: null | number }> = ({ widthToUse, height }) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');
  return (
    <FlexDir
      dir='column'
      height={`calc(${height}px - ${headerTableHeight + 20}px)`}
      bgColor='#fff'
      gap='32px'
      borderRadius='16px'
      width={`${widthToUse}px`}
      alignItems='center'
      justifyContent='center'>
      <FlexDir>
        <LoupeOrange100Icon />
      </FlexDir>
      <FlexDir dir='column' gap='12px' style={{ textAlign: 'center' }}>
        <Text color='#1E2057' fontSize='24px' fontWeight={500}>
          {tCommon('common_nothingWasFound')}
        </Text>
        <Text color='#7F80AA' fontSize='16px'>
          {tMain('products_noSearchContentDesc')}
        </Text>
      </FlexDir>
    </FlexDir>
  );
};
