import { FC } from 'react';
import { Text } from 'app/styled-components/styles';

interface ProductWillEndDataRendererProps {
  onWayQuantity: number;
}

export const ProductWillEndDataRenderer: FC<ProductWillEndDataRendererProps> = ({ onWayQuantity }) => {
  return (
    <>
      {onWayQuantity === 0 ? (
        <Text color='#9697BA' fontSize='14px'>
          - days
        </Text>
      ) : (
        <Text color='#50528C' fontSize='14px'>
          {onWayQuantity} days
        </Text>
      )}
    </>
  );
};
