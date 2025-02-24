'use client';

// import { Button } from '~/components/ui/button';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('~/components/pattern/ThemeToggle').then((c) => c.ThemeToggle));
const ProfileMenu = dynamic(() => import('./app-profile-menu').then((c) => c.ProfileMenu));

export const Header = () => (
  <header className="bg-background/80 backdrop-blur-sm text-foreground justify-between sticky top-0 z-30 flex h-14 px-6 w-full transition-shadow duration-100 [transform:translate3d(0,0,0)] border-b items-center">
    <div className="font-bold">MaraForm</div>

    <div className="flex gap-2 items-center">
      {/* <nav className="flex gap-2 items-center mr-8">
        <Button asChild size="sm" variant="link">
          <a href="/dashboard/manage-forms">Manage Forms</a>
        </Button>
      </nav> */}

      <ThemeToggle />
      <ProfileMenu />
    </div>
  </header>
);
