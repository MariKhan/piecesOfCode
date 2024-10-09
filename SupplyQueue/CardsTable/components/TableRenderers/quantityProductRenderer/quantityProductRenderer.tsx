import { FC } from 'react';
import { Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';

interface QuantityProductRendererProps {
  supplyQuantity: Maybe<number>;
}

export const QuantityProductRenderer: FC<QuantityProductRendererProps> = ({ supplyQuantity }) => {
  return (
    <>
      <Text color='#50528C' fontSize='14px'>
        {supplyQuantity} pcs
      </Text>
    </>
  );
};
