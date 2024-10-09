import { FC, memo } from 'react';
import { Text } from 'app/styled-components/styles';

interface ICouncilDeliveryRenderer {}

export const CouncilDeliveryRenderer: FC<ICouncilDeliveryRenderer> = memo(() => {
  return (
    <Text color='#50528C' fontSize='14px' ellipsis>
      pcs
    </Text>
  );
});
