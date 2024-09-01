export type UserT = {
  id: number;
  last_login: null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  type: string;
  profile?: UserProfileT;
};

export type UserProfileT = {
  bio: string;
  address: string;
  website: string;
  avatar: string;
  phone: string;
  email: string;
};
