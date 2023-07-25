import React from 'react';
import { GoogleButton } from '@/shared/ui/GoogleButton/GoogleButton';
import { GitHubButton } from '@/shared/ui/GitHubButton/GitHubButton';
import style from './signup.module.scss';

export const SocialButtons = () => {
  return (
    <div className={style.iconWrapper}>
      <GoogleButton />
      <GitHubButton />
    </div>
  );
};
