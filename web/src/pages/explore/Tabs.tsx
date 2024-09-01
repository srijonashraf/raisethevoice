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
    <ul className="flex flex-wrap gap-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 mb-5">
      {tabs.map((tab) => (
        <li
          key={tab.key}
          className={cn('inline-block p-4 rounded-t-lg cursor-pointer', {
            'border-b-2 border-black': tab.key === activeTab,
          })}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
}
