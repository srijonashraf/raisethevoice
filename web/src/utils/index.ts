import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { UserT } from 'types';

export function cn(...inputs: any) {
  return twMerge(classNames(inputs));
}

export const getUserFullName = (user?: UserT) => {
  if (user?.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`;
  }

  return 'N/A';
};
