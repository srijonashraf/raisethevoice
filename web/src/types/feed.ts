import { UserProfileT, UserT } from 'types';

export type AuthorT = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: number;
  profile: UserProfileT;
};

export type PostT = {
  id: number;
  title: string;
  author: AuthorT;
  created_at: string;
  content: string;
  tag?: any;
  total_comments: number;
  upvote_count: number;
  downvote_count: number;
  share_count: number;
  is_active: boolean;
  is_upvoted: boolean;
  is_downvoted: boolean;
  visits: number;
};

export type CommentT = {
  id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
  feed: PostT;
  user: UserT;
};
