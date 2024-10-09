import { FC, memo, useCallback, useMemo, useState } from 'react';
import { withDragAndDrop } from 'app/hocs/withDragAndDrop';
import { useLazyGetImagesIdsQuery, useSendImageIdMutation } from 'app/store/features/ImageUpload/ImageUpload.api';
import { deepEqual } from 'app/utils/deepEqual';
import { VerificationContent } from 'app/view/profile/Verification/VerificationContent';

export interface VerificationDragDrowProps {
  file?: File | null;
  setFile: (file: File | null) => void;
  updateProfileDataVerification: (data: { documentPhotoId: string | null }) => void;
  uploadError?: boolean;
  removeFileHandler?: () => void;
  isLoading?: boolean;
  error?: boolean;
}

export const VerificationDragDrow: FC<VerificationDragDrowProps> = memo(
  ({ file, setFile, updateProfileDataVerification, error }) => {
    const [uploadError, setUploadError] = useState(false);
    const [getImage] = useLazyGetImagesIdsQuery();
    const [sendFile, { isLoading }] = useSendImageIdMutation();

    const handleFileError = useCallback(
      (err: Error) => {
        updateProfileDataVerification({ documentPhotoId: null });
        setUploadError(true);
      },
      [updateProfileDataVerification],
    );

    const handleRemoveFile = useCallback(() => {
      setFile(null);
      updateProfileDataVerification({ documentPhotoId: null });
    }, [setFile, updateProfileDataVerification]);

    const handleSendFile = useCallback(
      (acceptedFiles: File[]) => {
        if (!acceptedFiles.length) return;

        const file = acceptedFiles[0];
        setFile(file);

        const formData = new FormData();
        formData.append('files', file);

        sendFile(formData)
          .unwrap()
          .then(ids => {
            const documentPhotoId = ids.join('');
            setUploadError(false);

            getImage(documentPhotoId)
              .unwrap()
              .then(() => setUploadError(false))
              .catch(() => setUploadError(true));

            updateProfileDataVerification({ documentPhotoId });
          })
          .catch(handleFileError);
      },
      [sendFile, getImage, setFile, updateProfileDataVerification, handleFileError],
    );

    const UploadAreaWithDragAndDrop = useMemo(
      () =>
        withDragAndDrop<VerificationDragDrowProps>({
          handleDrop: handleSendFile,
        })(VerificationContent),
      [handleSendFile],
    );

    return (
      <div style={{ height: '100%', width: '50%', overflow: 'hidden' }}>
        <UploadAreaWithDragAndDrop
          isLoading={isLoading}
          file={file}
          removeFileHandler={handleRemoveFile}
          uploadError={uploadError}
          updateProfileDataVerification={updateProfileDataVerification}
          error={error}
          setFile={setFile}
        />
      </div>
    );
  },
  deepEqual,
);
