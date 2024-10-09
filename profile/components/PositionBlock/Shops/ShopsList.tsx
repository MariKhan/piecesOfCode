import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useGetAllShopsForProfileQuery } from 'app/store/features/shop/shop.api';
import { Skeleton } from '@mui/material';
import { VerticalScrollbarWithAnimation } from 'app/components/VerticalScrollbarWithAnimation';
import { FlexDir, Text } from 'app/styled-components/styles';
import AddIcon from '../../../../../../public/static/newIcons/profile/Add.svg';
import { ShopProfileDto } from '@/types/userServiceTypes';
import { shopPagePaths } from 'app/constants/pagePaths';
import { useTypedSelector } from 'app/hooks/redux';
import { ShopCard } from './ShopCard';
import { NoShops } from './NoShops';

export const ShopsList = () => {
  const router = useRouter();

  const tProfile = useTranslations('profile');

  const mainCompanyId = useTypedSelector(state => state.profileReducer?.userInfo?.mainCompanyId);

  const { data: shops, isLoading: isShopsLoading } = useGetAllShopsForProfileQuery('', {
    skip: !mainCompanyId,
  });
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {Array.isArray(shops) && shops?.length > 0 && !isShopsLoading ? (
        <VerticalScrollbarWithAnimation scrollableRef={parentRef}>
          <FlexDir dir='column' gap='16px' mb='16px'>
            {!isShopsLoading && shops?.map((shop: ShopProfileDto) => <ShopCard key={shop.id} {...shop} />)}

            <FlexDir
              bgColor='#F7F7FA'
              padding='18px'
              borderRadius='12px'
              justifyContent='center'
              alignItems='center'
              cursor='pointer'
              onClick={() => router.push(shopPagePaths.SHOP_CREATE)}
              gap='12px'>
              <AddIcon />
              <Text fontSize='14px' lineHeight='20px' fontWeight={500} color='#50528C' textAlign='center'>
                {tProfile('profile_addMoreShop')}
              </Text>
            </FlexDir>
          </FlexDir>
        </VerticalScrollbarWithAnimation>
      ) : (
        !shops ||
        (Array.isArray(shops) &&
          shops?.length === 0 &&
          [1, 2, 3].map((_, index) => (
            <Skeleton key={index} variant='rectangular' width='100%' height={230} style={{ borderRadius: 16 }} />
          )))
      )}

      {((Array.isArray(shops) && shops?.length === 0) || (!shops && !isShopsLoading)) && <NoShops />}
    </>
  );
};
