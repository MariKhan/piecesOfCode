import { shopPagePaths } from 'app/constants/pagePaths';
import { EmployeesLightBlueIcon } from 'app/styled-components/NewIcons.styled';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShopProfileDto } from '@/types/userServiceTypes';
import ArrowRightIcon from '../../../../../../public/static/newIcons/profile/ArrowRight20.svg';

export const ShopCard = ({ id, name, description, avatarLink, employeeCount }: ShopProfileDto) => {
  const router = useRouter();

  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  return (
    <FlexDir
      bgColor='#F7F7FA'
      padding='24px'
      borderRadius='16px'
      dir='column'
      gap='16px'
      onClick={() => router.push(`${shopPagePaths.SHOP_ID.replace(':shopId', String(id))}`)}
      cursor='pointer'>
      <FlexDir gap='16px' alignItems='center' cursor='pointer'>
        <Image
          src={avatarLink || ''}
          alt={tCommon('common_shopAvatarImage')}
          width={64}
          height={64}
          style={{ borderRadius: '54px' }}
        />
        <FlexDir gap='4px'>
          <Text fontSize='14px' fontWeight={500} lineHeight='20px' color='#50528C' ellipsis>
            {name}
          </Text>
          <ArrowRightIcon width='20px' height='20px' />
        </FlexDir>
      </FlexDir>

      <Text
        fontSize='14px'
        fontWeight={500}
        lineHeight='24px'
        color='rgba(127, 128, 170, 1)'
        style={{ opacity: !description ? '0.5' : '' }}>
        {!description ? tMain('main_noDescription') : description}
      </Text>

      <FlexDir justifyContent='space-between'>
        <FlexDir gap='8px' alignItems='center'>
          <EmployeesLightBlueIcon />
          <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#7F80AA'>
            {tMain('main_employees')}
          </Text>
        </FlexDir>
        <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#50528C'>
          {employeeCount}
        </Text>
      </FlexDir>
    </FlexDir>
  );
};
