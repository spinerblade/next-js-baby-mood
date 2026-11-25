'use client';

import { CldImage } from 'next-cloudinary';

type Props = {
  publicId: string;
  alt: string;
  width: number;
  height: number;
};

export default function CloudinaryImage(props: Props) {
  return (
    <CldImage
      src={props.publicId}
      alt={props.alt}
      width={props.width}
      height={props.height}
      crop={{ type: 'auto', source: true }}
    />
  );
}
