// This component is used to display a dropdown menu with links to the user's profile, login, and sign up pages.    

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from '@/components/ui/dropdown-menu';
  import { LuAlignLeft } from 'react-icons/lu';
  import Link from 'next/link';
  import { Button } from '../ui/button';
  import UserIcon from './UserIcon';
  import { links } from '@/utils/links';
  import SignOutLink from './SignOutLink';
  import { SignedOut, SignedIn , SignInButton, SignUpButton } from '@clerk/nextjs';
  import { auth } from '@clerk/nextjs/server';

function LinksDropdown() {
    const {userId} = auth();
    const isAdminUser = userId === process.env.ADMIN_USER_ID;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='flex gap-4 max-w-[100px]'>
                    <LuAlignLeft className='w-6 h-6' />
                    <UserIcon />    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-52' align='start' sideOffset={10}>
                <SignedOut>
                    <DropdownMenuItem>
                        <SignInButton mode='modal'>
                            <button className='w-full text-left capitalize'>Login</button>
                        </SignInButton>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <SignUpButton mode='modal'>
                            <button className='w-full text-left capitalize'>Sign up</button>
                        </SignUpButton>
                    </DropdownMenuItem>
                </SignedOut>
                <SignedIn>
                    {links.map((link) => {
                        if (link.label === 'admin' && !isAdminUser) return null;
                        // Split the label into words, capitalize the first word, and join them back
                        const transformedLabel = link.label
                            .split(' ')
                            .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word)
                            .join(' ');
                        // Iterate through links imported from utils/links.ts
                        // Return a dropdown menu item with the transformed label
                        return (
                            <DropdownMenuItem key={link.href}>
                                <Link href={link.href} className='w-full'>
                                    {transformedLabel}
                                </Link>
                            </DropdownMenuItem>
                        );
                    })}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SignOutLink />
                    </DropdownMenuItem>
                </SignedIn>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LinksDropdown;

