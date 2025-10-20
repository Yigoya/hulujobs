import React, { useEffect, useMemo, useRef, useState } from 'react';
import { COUNTRIES } from '../utils/countries';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const CountryCodeSelect: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selected = useMemo(() => {
    return COUNTRIES.find((c) => c.dialCode === value) || COUNTRIES[0];
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="w-28 px-3 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center gap-2"
      >
        {/* Prefer emoji; flag-icons fallback could be added with selected.code if needed */}
        <span className="text-lg leading-none">{selected.flag}</span>
        <span className="font-medium text-gray-800">{selected.dialCode}</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country or code..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
          <ul role="listbox" className="max-h-72 overflow-auto">
            {COUNTRIES.filter(
              (c) =>
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.dialCode.includes(query)
            ).map((opt) => (
              <li
                key={`${opt.code}-${opt.dialCode}`}
                role="option"
                aria-selected={opt.dialCode === value}
                onClick={() => {
                  onChange(opt.dialCode);
                  setOpen(false);
                  setQuery('');
                }}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  opt.dialCode === value ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-xl leading-none">{opt.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{opt.name}</div>
                  <div className="text-xs text-gray-500">{opt.dialCode}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelect;
