import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from 'app/components/ui/Tooltip';
import { settingsPagePaths } from 'app/constants/pagePaths';
import { ShieldStarCircleIcon, UserCircleIcon } from 'app/styled-components/NewIcons.styled';
import ArrowRightIcon from '../../../../../../public/static/newIcons/profile/ArrowRight.svg';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useRouter } from 'next/navigation';
import CircleQuestionIcon from '../../../../../../public/static/newIcons/QuestionCircle.svg';
import { useTranslations } from 'next-intl';

interface AddCompanyModalProps {
  toggleModal: () => void;
  isCustomerCompany: boolean;
}

export const AddCompanyModal = ({ toggleModal, isCustomerCompany }: AddCompanyModalProps) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');
  const tProfile = useTranslations('profile');

  const router = useRouter();

  const CompanyType = [
    {
      icon: <UserCircleIcon />,
      header: tMain('main_customer'),
      subHeader: tMain('main_addCustomer_desc'),
      tooltipInfo: 'tooltip Info',
      path: settingsPagePaths.COMPANY_REGISTER_CUSTOMER,
    },
    {
      icon: <ShieldStarCircleIcon />,
      header: tCommon('common_company'),
      subHeader: tMain('main_addCompany_desc'),
      tooltipInfo: 'tooltip Info',
      path: settingsPagePaths.COMPANY_REGISTER_LEGAL,
    },
  ];
  return (
    <FlexDir dir='column' style={{ position: 'relative' }}>
      <FlexDir alignItems='center' dir='column' gap='16px' mb='24px'>
        <FlexDir
          cursor='pointer'
          onClick={toggleModal}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            top: '0',
            right: '0',
          }}>
          <CloseIcon htmlColor='#1E2057' />
        </FlexDir>
        <Text fontSize='24px' lineHeight='32px' fontWeight={500}>
          {tCommon('common_addCompany')}
        </Text>
        <Text fontSize='14px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
          {tProfile('profile_selectTypeCompanyForCreate')}
        </Text>
      </FlexDir>
      {CompanyType?.map((el, index) => (
        <FlexDir
          key={index}
          bgColor='#F7F7FA'
          alignItems='center'
          justifyContent='space-between'
          padding='24px '
          mb='12px'
          borderRadius='20px'
          cursor='pointer'
          disabled={el.header === 'Customer' && isCustomerCompany}
          onClick={() => {
            return el.header === 'Customer' && isCustomerCompany ? null : router.push(el.path);
          }}>
          <FlexDir>
            <FlexDir mr='12px'>{el.icon}</FlexDir>
            <FlexDir dir='column' gap='8px'>
              <FlexDir gap='8px' alignItems='center'>
                <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#50528C'>
                  {el.header}
                </Text>
                <Tooltip title={el.tooltipInfo}>
                  <FlexDir>
                    <CircleQuestionIcon />
                  </FlexDir>
                </Tooltip>
              </FlexDir>
              <Text fontSize='12px' lineHeight='16px' fontWeight={500} color='#7F80AA'>
                {el.subHeader}
              </Text>
            </FlexDir>
          </FlexDir>
          <ArrowRightIcon />
        </FlexDir>
      ))}
    </FlexDir>
  );
};
