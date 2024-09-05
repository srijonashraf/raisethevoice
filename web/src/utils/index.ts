import { message } from 'antd';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { UserProfileT, UserT } from 'types';

export function cn(...inputs: any) {
  return twMerge(classNames(inputs));
}

export const getUserFullName = (user?: UserT) => {
  if (user?.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  return user?.first_name ?? 'N/A';
};

export function splitFullName(fullName: string) {
  const [first_name, ...lastNameParts] = fullName.trim().split(' ');
  const last_name = lastNameParts.join(' ');

  return { first_name, last_name };
}

export const getUserAvatar = (profile?: UserProfileT) => {
  return profile?.avatar || '/default-avatar.webp';
};

export const showError = ({ data }: any) => {
  message.error(data?.detail ?? data.non_field_errors?.[0]);
};
