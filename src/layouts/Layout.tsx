import { AppShell, Burger, Group, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from 'react-router-dom';
import React from 'react';
import Logo from '@/components/Logo/Logo';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

const links = [
  { title: 'Home', to: '/' },
  { title: 'History', to: '/history' },
];

export interface LayoutProps {
  children: React.ReactNode;
  title?: React.ReactNode;
}

export function Layout({ children, title }: LayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Logo />
            <Group ml="xl" gap={24} visibleFrom="sm">
              <NavLinks />
            </Group>
          </Group>
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <div className="flex flex-col gap-6 px-4">
          <NavLinks />
        </div>
      </AppShell.Navbar>

      <AppShell.Main className="flex flex-col sm:items-center">
        {title ? <Title className="text-2xl sm:text-3xl mb-6 mt-4">{title}</Title> : null}
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'text-primary-500 dark:text-primary-400' : '')}
        >
          <UnstyledButton>{link.title}</UnstyledButton>
        </NavLink>
      ))}
    </>
  );
}
