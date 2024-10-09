import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import { WithDragAndDropProps } from 'app/hocs/withDragAndDrop';
import { VerificationDragDrowProps } from 'app/view/profile/Verification/VerificationDragDrow';
import { UploadIcon } from 'app/styled-components/NewIcons.styled';
import { WrapperImageUpload } from 'app/view/(root)/(employees)/company/CompanyRegister/CompanyRegister.styled';

export const VerificationContent = ({
  file,
  triggerFileInputClick,
  isDragActive,
  uploadError,
  removeFileHandler,
  isLoading,
  UploadAreaComponentWithPreview,
  error,
}: VerificationDragDrowProps & WithDragAndDropProps) => {
  const tMain = useTranslations('main');
  const tCommon = useTranslations('common');

  return (
    <FlexDir dir='column' gap='8px' width='100%' height='100%'>
      <Text fontSize='20px' lineHeight='24px' fontWeight={500} mb='4px'>
        {tCommon('common_idCard')}
      </Text>
      <Text fontSize='16px' lineHeight='24px' fontWeight={500} color='#7F80AA'>
        {tMain('main_downloadDocumentHere')}
      </Text>
      <WrapperImageUpload wrapperWidth='100%' wrapperHeight='100%'>
        <UploadAreaComponentWithPreview
          isDragActive={isDragActive}
          file={file}
          icon={() => <UploadIcon />}
          uploadError={uploadError}
          width={500}
          removeFileHandler={removeFileHandler}
          height={500}
          isLoading={isLoading}
          onClick={triggerFileInputClick}
          isEmpty={!file && error}
          responsiveImage
        />
      </WrapperImageUpload>
    </FlexDir>
  );
};
