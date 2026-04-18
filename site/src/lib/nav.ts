import { sections } from '../data/sections';

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Build the sidebar nav tree. Kept as a function so pages can pass in the
 * current URL later for highlighting active links. */
export function buildNav(): NavItem[] {
  return [
    { label: 'Home', href: '/' },
    {
      label: 'Sections',
      href: '/sections/',
      children: sections.map((s) => ({
        label: s.title,
        href: `/sections/${s.slug}/`,
      })),
    },
    { label: 'Contributors', href: '/contributors/' },
    { label: 'Contributing', href: '/contributing/' },
    { label: 'Stewardship', href: '/stewardship/' },
  ];
}
