import { FC, memo } from 'react';
import Image from 'next/image';
import { FlexDir, Text } from 'app/styled-components/styles';
import { Maybe } from 'graphql/jsutils/Maybe';

interface ProductCardRendererProps {
  title: Maybe<string>;
  photo: Maybe<string>;
}

export const ProductCardRenderer: FC<ProductCardRendererProps> = memo(({ title, photo }) => {
  return (
    <>
      <FlexDir alignItems='center' gap='6px' width='90%' cursor='pointer'>
        {photo ? <Image src={photo} width={48} height={48} alt={'text'} style={{ borderRadius: '8px' }} /> : null}
        <FlexDir dir='column' width='90%'>
          <Text ellipsis fontSize='14px' color='#1E2057'>
            {title}
          </Text>
        </FlexDir>
      </FlexDir>
    </>
  );
});
