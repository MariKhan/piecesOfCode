import { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { ArrowRightLightBlue24Icon } from 'app/styled-components/NewIcons.styled';
import { InDev } from 'app/components/inDev';

export interface ISupplyCard {
  title: string;
  value: string;
  width: string;
  onClick?: () => void;
}

export const SupplyCard: FC<ISupplyCard> = ({ title, value, width, onClick }) => {
  return (
    <FlexDir
      bgColor='#FFF'
      width={width}
      height='120px'
      border='1px solid #EAEAEF'
      padding='16px'
      borderRadius='16px'
      dir='column'
      justifyContent='space-between'
      onClick={onClick}
      cursor='pointer'>
      <FlexDir justifyContent='space-between'>
        <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
          {title}
        </Text>
        <ArrowRightLightBlue24Icon style={{ transform: 'rotate(180deg)' }} />
      </FlexDir>
      <Text fontSize='32px' lineHeight='24px' fontWeight={500} color='#50528C'>
        <InDev>{value}</InDev>
      </Text>
    </FlexDir>
  );
};
