import { ChangeEvent } from 'react';
import { cn } from 'utils';

type InputProps = {
  type?: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label ? (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      ) : null}

      <input
        type="text"
        className={cn(
          'bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:border-gray-300 block w-full p-2.5',
          className
        )}
        required
        {...props}
      />
    </div>
  );
}
