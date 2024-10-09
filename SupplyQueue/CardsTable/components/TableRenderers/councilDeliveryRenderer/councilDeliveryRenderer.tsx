import { FC, memo } from 'react';
import { Text } from 'app/styled-components/styles';

interface CouncilDeliveryRendererProps {}

export const CouncilDeliveryRenderer: FC<CouncilDeliveryRendererProps> = memo(() => {
  return <Text color='#50528C' fontSize='14px' lineHeight='20px' fontWeight={500}></Text>;
});
