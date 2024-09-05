import { useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { cn, getUserAvatar, getUserFullName } from 'utils';

type CommentBoxProps = {
  className?: string;
};

export default function CommentBox({ className }: CommentBoxProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<any>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: any) => {
    setValue(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={cn('w-full flex gap-3 pt-5', className)}>
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
        />
        <IoSend className="absolute bottom-[12px] right-2 -rotate-45 text-[17px] text-gray-400" />
      </div>
    </div>
  );
}
