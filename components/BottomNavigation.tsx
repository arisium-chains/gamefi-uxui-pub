'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Clock, Settings } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Car,
      label: 'My Racers',
      active: pathname === '/'
    },
    {
      href: '/history',
      icon: Clock,
      label: 'Race History',
      active: pathname === '/history'
    },
    {
      href: '/settings',
      icon: Settings,
      label: 'Settings',
      active: pathname === '/settings'
    }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${item.active ? 'active' : ''}`}
          >
            <Icon className="bottom-nav-icon" />
            <span className="bottom-nav-text">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}