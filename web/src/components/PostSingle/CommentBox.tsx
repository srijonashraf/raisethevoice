import { Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { useGetCommentsQuery, useSubmitCommentMutation } from 'store/api/feed';
import { requireAuth } from 'store/prompt';
import { CommentT, PostT } from 'types/feed';
import { cn, getUserAvatar, getUserFullName } from 'utils';

type CommentBoxProps = {
  className?: string;
  post: PostT;
};

export default function CommentBox({ className, post }: CommentBoxProps) {
  const [comments, setComments] = useState<CommentT[]>();
  const [value, setValue] = useState('');
  const textareaRef = useRef<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, refetch } = useGetCommentsQuery(post.id);
  const [submitComment] = useSubmitCommentMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setComments(data);
  }, [data]);

  const handleChange = (e: any) => {
    setValue(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      dispatch(requireAuth());
    } else if (value) {
      setComments([
        { id: Math.random(), content: value, user, feed: post },
        ...(comments ?? []),
      ]);
      submitComment({ postId: post.id, content: value }).then(() => {
        refetch();
      });
      setValue('');
    }
  };

  return (
    <div className="border-t mt-4">
      <div className="mt-4">
        {comments ? (
          comments?.length ? (
            <div className="flex flex-col gap-3 max-h-[120px] overflow-y-auto">
              {comments?.map((comment) => (
                <div key={comment.id} className="w-full flex gap-3">
                  <img
                    src={getUserAvatar(comment.user.profile)}
                    alt="default avatar"
                    className="w-8 h-8 rounded-full"
                  />

                  <div className="bg-gray-100 px-2.5 py-1.5 rounded-lg">
                    <h6 className="font-medium">
                      {getUserFullName(comment.user)}
                    </h6>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null
        ) : post.total_comments > 0 ? (
          <Skeleton title={false} paragraph={{ rows: 2 }} />
        ) : null}
      </div>

      <div className={cn('w-full flex gap-3 mt-4', className)}>
        <img
          src={getUserAvatar(user?.profile)}
          alt="default avatar"
          className="w-8 h-8 rounded-full"
        />

        <div className="w-full relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:border-gray-300"
            placeholder={`Comment as ${getUserFullName(user)}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmitComment();
              }
            }}
          />
          <IoSend
            className="absolute bottom-[12px] right-2 -rotate-45 text-[17px] text-gray-400 cursor-pointer"
            onClick={handleSubmitComment}
          />
        </div>
      </div>
    </div>
  );
}
