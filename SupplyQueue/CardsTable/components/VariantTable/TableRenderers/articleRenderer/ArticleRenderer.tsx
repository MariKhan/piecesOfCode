import { FC } from 'react';
import { FlexDir, Text } from 'app/styled-components/styles';
import Image from 'next/image';
import { Maybe } from 'graphql/jsutils/Maybe';

interface ArticleRendererProps {
  article?: Maybe<string>;
  photo?: Maybe<string>;
}

export const ArticleRenderer: FC<ArticleRendererProps> = ({ article, photo }) => {
  return (
    <FlexDir alignItems='center' gap='6px'>
      {photo ? <Image src={photo} width={48} height={48} alt={'text'} style={{ borderRadius: '8px' }} /> : null}

      <Text fontSize='12px' color='#50528C' ellipsis>
        {article}
      </Text>
    </FlexDir>
  );
};
