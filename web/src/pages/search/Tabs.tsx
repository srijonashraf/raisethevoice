import { cn } from 'utils';

const tabs = [
  { label: 'Top' },
  { label: 'Latest' },
  { label: 'People' },
  { label: 'Media' },
  { label: 'List' },
];

export default function Tabs() {
  return (
    <ul className="flex flex-wrap gap-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5">
      {tabs.map((tab, idx) => (
        <li
          key={tab.label}
          className={cn(
            'inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-100',
            {
              'bg-gray-100': idx === 0,
            }
          )}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
}
