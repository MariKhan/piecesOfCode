import { FC } from 'react';
import { Text } from 'app/styled-components/styles';

interface IProductWillEndDataRenderer {
  onWayQuantity: number;
}

export const ProductWillEndDataRenderer: FC<IProductWillEndDataRenderer> = ({ onWayQuantity }) => {
  return (
    <>
      {onWayQuantity === 0 ? (
        <Text color='#9697BA' fontSize='14px'>
          - days
        </Text>
      ) : (
        <Text color='#50528C' fontSize='14px' ellipsis>
          {onWayQuantity} days
        </Text>
      )}
    </>
  );
};
