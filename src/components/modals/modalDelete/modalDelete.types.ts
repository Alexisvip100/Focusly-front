// Navbar.types.ts

export interface NavItem {
  label: string;
  href: string;
}

export interface NavbarProps {
  navItems?: NavItem[];
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
  onMobileMenuClick?: () => void;
}
