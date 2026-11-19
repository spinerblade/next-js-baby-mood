'use client';

import { CldUploadWidget } from 'next-cloudinary';

type Props = {
  folder: 'users' | 'babies' | 'achievements';
  label: string;
  onUpload: (publicId: string) => unknown;
};

export default function ImageUpload(props: Props) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      options={{
        folder: `baby-mood/${props.folder}`,
        sources: ['local', 'camera'],
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'heic'],
        maxFileSize: 5_000_000,
      }}
      onSuccess={async (result) => {
        if (typeof result.info === 'object' && 'public_id' in result.info) {
          await props.onUpload(result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button className="w-60" type="button" onClick={() => open()}>
          {props.label}
        </button>
      )}
    </CldUploadWidget>
  );
}
