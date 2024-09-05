import { useState } from 'react';
import { cn } from 'utils';

const tabs = [
  { key: 'for-you', label: 'For you' },
  { key: 'trending', label: 'Trending' },
  { key: 'people', label: 'People' },
  { key: 'pages', label: 'Pages' },
  { key: 'groups', label: 'Groups' },
  { key: 'events', label: 'Events' },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="">
      <ul className="flex w-full max-w-[785px] gap-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 fixed bg-white z-50">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={cn(
              'inline-block p-4 pt-6 rounded-t-lg cursor-pointer border-black hover:border-b-2',
              {
                'border-b-2': tab.key === activeTab,
              }
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="h-[85px]" />
    </div>
  );
}
