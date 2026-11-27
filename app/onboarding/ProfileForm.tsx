'use client';

import ImageUpload from '@/app/ImageUpload';
import ErrorMessage from '@/ErrorMessage';
import { useActionState } from 'react';
import { updateUserPicture } from '../profile/actions';
import CloudinaryImage from '../profile/CloudinaryImage';
import { updateUserProfile } from './actions';
import styles from './OnboardingForm.module.scss';

type Props = {
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  profilePictureUrl: string | null;
};

export default function ProfileForm(props: Props) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, {});

  return (
    <div className={`${styles.container} ${styles.profileCard}`}>
      <section className={styles.partnerForm}>
        <h2 className="text-center">Complete your profile</h2>
        <h3 className="text-center">
          <i>You can finish this later</i>
        </h3>
        <div className="flex flex-col md:flex-row gap-6 items-start pt-4">
          <div className="flex flex-col items-center gap-2">
            {props.profilePictureUrl && (
              <CloudinaryImage
                publicId={props.profilePictureUrl}
                alt="Profile picture"
                width={150}
                height={150}
              />
            )}
            <ImageUpload
              folder="users"
              label="Upload profile picture"
              onUpload={updateUserPicture}
            />
          </div>

          <form className="pt-2 flex-1" action={formAction}>
            <label>
              First name
              <input
                name="firstName"
                placeholder="Enter first name"
                required
                defaultValue={props.firstName ?? ''}
              />
            </label>
            <label>
              Last name
              <input
                name="lastName"
                placeholder="Enter last name"
                required
                defaultValue={props.lastName ?? ''}
              />
            </label>
            <label>
              Birthdate
              <input
                name="birthDate"
                type="date"
                required
                max={new Date().toISOString().slice(0, 10)}
                defaultValue={props.birthDate ?? ''}
              />
            </label>
            <button disabled={isPending}>
              {isPending ? 'Saving…' : 'Save'}
            </button>
            {!!state.error && <ErrorMessage>{state.error}</ErrorMessage>}
            {state.success && <p>Saved!</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
