import { ChangeEvent, FC, memo, useContext, KeyboardEvent, useEffect, useState } from 'react';
import Input from 'app/components/ui/Inputs/Input/Input';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useUpdateSupplyQuantityMutation } from 'app/store/features/supplyQueue/supplyQueue.api';
import { SupplyQueueTableDefaultValueCtx } from '../../../../../context/TSupplyQueueTableContext';
import { useQueryClient } from '@tanstack/react-query';
import { Maybe } from 'graphql/jsutils/Maybe';

interface QuantityProductRendererProps {
  stockUnitId: number;
  supplyQuantity?: Maybe<number>;
}

export const QuantityProductRenderer: FC<QuantityProductRendererProps> = memo(({ stockUnitId, supplyQuantity }) => {
  const { inputValues, setInputValues } = useContext(SupplyQueueTableDefaultValueCtx);
  const [updateSupplyQuantity] = useUpdateSupplyQuantityMutation();

  const [initialValue, setInitialValue] = useState(supplyQuantity?.toString() || '');

  const queryClient = useQueryClient();

  useEffect(() => {
    if (supplyQuantity) {
      const valueStr = supplyQuantity.toString();
      setInitialValue(valueStr);
      setInputValues(prevValues => ({
        ...prevValues,
        [stockUnitId]: valueStr,
      }));
    }
  }, [supplyQuantity, setInputValues, stockUnitId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantityStr = e.target.value;
    setInputValues(prevValues => ({
      ...prevValues,
      [stockUnitId]: newQuantityStr,
    }));
  };

  const handleInputSubmit = () => {
    const newQuantityStr = inputValues[stockUnitId];
    const newQuantity = Number(newQuantityStr);
    updateSupplyQuantity({
      stockUnitId: Number(stockUnitId),
      quantity: newQuantity,
    }).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['SUPPLY_QUEUE'],
      });
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const handleBlur = () => {
    if (inputValues[stockUnitId] !== initialValue) {
      handleInputSubmit();
    }
  };

  return (
    <FlexDir width='120px' style={{ position: 'relative' }}>
      <Input
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        value={inputValues[stockUnitId] || ''}
        placeholder={supplyQuantity === undefined ? 'Quantity' : undefined}
        borderColor='#EAEAEF'
        wrapperWidth='120px'
        inputWidth='120px'
      />
      {supplyQuantity !== undefined && (
        <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <Text fontSize='15px'>pcs</Text>
        </div>
      )}
    </FlexDir>
  );
});
