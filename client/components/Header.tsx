import ThemeSwitcher from "@/components/ThemeSwitch";
import Link from 'next/link';

const Header = () => {
  return (
    <header className="p-4 bg-gray-100 dark:bg-gray-900 flex justify-between">
      <nav className="items-center flex">
        <Link className="mr-4 font-bold" href="/auth/login">
          Login
        </Link>
        <Link className="mr-4 font-bold" href="/auth/register">
          Register
        </Link>
        <Link className="font-bold" href="/auth/logout">
          Logout
        </Link>
      </nav>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
