import { Button } from 'app/components/ui/NewButton';
import { AddProductIcon, PlusCircleOpacity36Icon } from 'app/styled-components/NewIcons.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';

export const SupplyQueueNoContent = () => {
  const tMain = useTranslations('main');
  return (
    <FlexDir
      dir='column'
      height='100%'
      bgColor='#fff'
      gap='32px'
      borderRadius='16px'
      width='100%'
      alignItems='center'
      justifyContent='center'>
      <FlexDir>
        <AddProductIcon />
      </FlexDir>
      <FlexDir dir='column' gap='12px' style={{ textAlign: 'center' }}>
        <Text color='#1E2057' fontSize='24px' fontWeight={500}>
          {tMain('products_noContentTitle')}
        </Text>
      </FlexDir>
      <FlexDir>
        <Button variant='secondary' icon={<PlusCircleOpacity36Icon />}>
          {tMain('products_addProduct')}
        </Button>
      </FlexDir>
    </FlexDir>
  );
};
