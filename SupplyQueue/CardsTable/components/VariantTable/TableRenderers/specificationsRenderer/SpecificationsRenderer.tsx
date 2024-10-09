import { FC, memo } from 'react';
import { Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';

interface ISpecificationsRenderer {
  specification?: Maybe<string>;
}

export const SpecificationsRenderer: FC<ISpecificationsRenderer> = memo(({ specification }) => {
  return (
    <Text color='#50528C' lineHeight='24px' fontSize='14px' ellipsis>
      {specification}
    </Text>
  );
});
