import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';
import { Divider } from '@mui/material';
import { ICompanyCard } from 'app/utils/interfaces';
import { companyCardRole } from 'app/utils/constants';
import { formatEnum } from 'app/utils/formatEnum';
import { Avatar, AvatarGroup } from './CompaniesCards.styled';
import ArrowRightIcon from '../../../../../../public/static/newIcons/profile/ArrowRight20.svg';
import { settingsPagePaths } from 'app/constants/pagePaths';
import { useRouter } from 'next/navigation';
import {
  AdminsLightBlue16Icon,
  BagLightBlueIcon,
  CompaniesLightBlue16Icon,
  ProfileWhiteIcon,
} from 'app/styled-components/NewIcons.styled';

export const CompaniesCard: FC<ICompanyCard> = ({
  companyId,
  name,
  englishName,
  avatarLink,
  type,
  role,
  shopCount,
  admins,
}) => {
  const tCommon = useTranslations('common');
  const tMain = useTranslations('main');
  const router = useRouter();

  const findCurrentRole = companyCardRole(tMain, tCommon)?.find(c => c.role.toLowerCase() === role.toLowerCase());
  return (
    <>
      <FlexDir
        bgColor='#F7F7FA'
        padding='24px'
        borderRadius='16px'
        dir='column'
        gap='16px'
        cursor='pointer'
        onClick={() => router.push(`${settingsPagePaths.COMPANY_ID.replace(':companyId', String(companyId))}`)}>
        <FlexDir gap='16px'>
          <Image
            src={avatarLink || ''}
            alt={tCommon('common_companyAvatarImage')}
            width={64}
            height={64}
            style={{ borderRadius: '54px' }}
          />
          <FlexDir dir='column' gap='8px'>
            <FlexDir dir='column'>
              <FlexDir gap='4px'>
                <Text fontSize='14px' fontWeight={500} lineHeight='20px' color='#50528C' ellipsis>
                  {name}
                </Text>
                <ArrowRightIcon width='20px' height='20px' />
              </FlexDir>
              {type !== 'CUSTOMER' && (
                <Text fontSize='14px' fontWeight={500} lineHeight='20px' color='#50528C' ellipsis>
                  {englishName}
                </Text>
              )}
            </FlexDir>

            {findCurrentRole && (
              <FlexDir>
                <FlexDir
                  bgColor={findCurrentRole?.bgColor}
                  borderRadius='28px'
                  padding='4px 10px 4px 4px '
                  gap='4px'
                  alignItems='center'>
                  <ProfileWhiteIcon />
                  <Text fontSize='12px' fontWeight={500} lineHeight='16px' color='#fff'>
                    {findCurrentRole?.label}
                  </Text>
                </FlexDir>
              </FlexDir>
            )}
          </FlexDir>
        </FlexDir>

        <Divider />
        <FlexDir dir='column' gap='16px'>
          <FlexDir justifyContent='space-between'>
            <FlexDir gap='8px' alignItems='center'>
              <CompaniesLightBlue16Icon />
              <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#7F80AA'>
                {tCommon('common_companyType')}
              </Text>
            </FlexDir>
            <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#50528C'>
              {formatEnum(type)}
            </Text>
          </FlexDir>
          <FlexDir justifyContent='space-between'>
            <FlexDir gap='8px' alignItems='center'>
              <BagLightBlueIcon />
              <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#7F80AA'>
                {tCommon('common_stores')}
              </Text>
            </FlexDir>
            <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#50528C'>
              {shopCount}
            </Text>
          </FlexDir>
          <FlexDir justifyContent='space-between' height='24px'>
            <FlexDir gap='8px' alignItems='center'>
              <AdminsLightBlue16Icon />
              <Text fontSize='14px' fontWeight={500} lineHeight='24px' color='#7F80AA'>
                {tMain('company_companyCard_admins')}
              </Text>
            </FlexDir>

            <FlexDir>
              {admins?.adminList?.length === 0 && (
                <Text fontSize='16px' fontWeight={500} lineHeight='20px'>
                  -
                </Text>
              )}
              {admins?.adminList?.length === 1 &&
                admins?.adminList?.map(({ id, avatarLink }) => (
                  <Image
                    key={id}
                    src={avatarLink || ''}
                    alt={tCommon('common_companyAvatarImage')}
                    width={24}
                    height={24}
                    style={{ borderRadius: '60px' }}
                  />
                ))}

              <AvatarGroup>
                {admins?.adminList?.length > 1 &&
                  admins?.adminList?.map(({ id, avatarLink }) => (
                    <Avatar key={id} hasRemainQuantity={admins?.remainQuantity > 0}>
                      <Image
                        src={avatarLink || ''}
                        alt={tCommon('common_companyAvatarImage')}
                        width={24}
                        height={24}
                        style={{ borderRadius: '30px', border: '2px solid #fff' }}
                      />
                    </Avatar>
                  ))}

                {admins?.remainQuantity > 0 && (
                  <FlexDir
                    justifyContent='center'
                    alignItems='center'
                    borderRadius='30px'
                    width='24px'
                    height='24px'
                    bgColor='#7F80AA'
                    border='2px solid #fff'
                    style={{ zIndex: '5' }}>
                    <Text color='#fff' fontSize='12px' fontWeight={500} lineHeight='20px'>
                      +{admins?.remainQuantity}
                    </Text>
                  </FlexDir>
                )}
              </AvatarGroup>
            </FlexDir>
          </FlexDir>
        </FlexDir>
      </FlexDir>
    </>
  );
};
