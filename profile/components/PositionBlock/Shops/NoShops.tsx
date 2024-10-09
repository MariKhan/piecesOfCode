import { FlexDir, Text } from 'app/styled-components/styles';
import { PlusCircleOpacity36Icon, StoreIcon } from 'app/styled-components/NewIcons.styled';
import { shopPagePaths } from 'app/constants/pagePaths';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from 'app/components/ui/NewButton';

export const NoShops = () => {
  const router = useRouter();

  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  return (
    <>
      <FlexDir dir='column' alignItems='center' alignSelf='center' justifyContent='center' height='100% ' width='300px'>
        <StoreIcon />
        <FlexDir alignSelf='center' mb='12px' mt='32px'>
          <Text textAlign='center' fontSize='17px' fontWeight={500} lineHeight='24px'>
            {tMain('shop_shopList_dontHaveActiveShops')}
          </Text>
        </FlexDir>
        <Text textAlign='center' fontSize='14px' fontWeight={500} lineHeight='20px' color='#7F80AA' mb='24px'>
          {tMain('shop_shopList_startOwnShop')}
        </Text>
        <FlexDir>
          <Button
            variant='secondary'
            size='medium'
            icon={<PlusCircleOpacity36Icon />}
            onClick={() => router.push(shopPagePaths.SHOP_CREATE)}>
            {tCommon('common_addShop')}
          </Button>
        </FlexDir>
      </FlexDir>
    </>
  );
};
