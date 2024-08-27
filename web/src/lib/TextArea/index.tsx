import { ChangeEvent } from 'react';
import { cn } from 'utils';

type TextAreaProps = {
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  label?: string;
  className?: string;
  ref?: any;
};

export default function TextArea({
  label,
  className,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      ) : null}
      <textarea
        className={cn(
          'block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:border-gray-300',
          className
        )}
        rows={5}
        {...props}
      ></textarea>
    </div>
  );
}
