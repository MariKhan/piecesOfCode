import { FC, memo } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import { useTranslations } from 'next-intl';
import { WarningTriangleSupplyQueueIcon } from 'app/styled-components/NewIcons.styled';
import { Tooltip } from 'app/components/ui/Tooltip';
import { Maybe } from 'graphql/jsutils/Maybe';

interface IRemainsRenderer {
  remains: Maybe<number>;
}

export const RemainsRenderer: FC<IRemainsRenderer> = memo(({ remains }) => {
  const tMain = useTranslations('main');

  return (
    <>
      {remains === 0 ? (
        <FlexDir alignItems='center' gap='4px'>
          <Text color='#db1e36' lineHeight='24px' fontSize='16px' ellipsis>
            {remains}
          </Text>
          <Tooltip title={tMain('supplyQueue_remainsRenderer_outOfStock')}>
            <WarningTriangleSupplyQueueIcon />
          </Tooltip>
        </FlexDir>
      ) : (
        <Text lineHeight='24px' fontSize='16px' ellipsis>
          {remains}
        </Text>
      )}
    </>
  );
});
