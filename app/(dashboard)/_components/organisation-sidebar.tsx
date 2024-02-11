'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { LayoutDashboard, StarIcon } from 'lucide-react';

const font = Poppins({ subsets: ['latin'], weight: ['600'] });

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get('favorites');
  return (
    <div className="hidden lg:flex  flex-col  space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex gap-x-2 items-center">
          <Image src="/logo.svg" alt="logo" height={60} width={60} />
          <span className={cn('font-semibold text-xl', font.className)}>
            CollabFlow
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            },
            organizationSwitcherTrigger: {
              padding: '6px',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              justifyContent: 'space-between',
              backgroundColor: 'white',
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full "
          variant={favorites ? 'ghost' : 'secondary'}
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4  mr-2" />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full "
          variant={favorites ? 'secondary' : 'ghost'}
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: true },
            }}
          >
            <StarIcon className="h-4 w-4  mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
