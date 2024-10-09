import { FC, memo } from 'react';
import { formatEnum } from 'app/utils/formatEnum';
import { Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';

interface CategoryRendererProps {
  category: Maybe<string>;
}

export const CategoryRenderer: FC<CategoryRendererProps> = memo(({ category }) => {
  return (
    <Text color='#50528C' fontSize='14px' lineHeight='20px' fontWeight={500} ellipsis>
      {formatEnum(category as string)}
    </Text>
  );
});
