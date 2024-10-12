import ThemeSwitcher from "@/components/ThemeSwitch";
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="ml-2 sm:ml-6 flex space-x-4 sm:space-x-8">
              <Link href="/auth/login" className="border-transparent text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 sm:px-2 pt-1 text-xs sm:text-sm font-medium">
                Login
              </Link>
              <Link href="/auth/register" className="border-transparent text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 sm:px-2 pt-1 text-xs sm:text-sm font-medium">
                Register
              </Link>
              <Link href="/auth/logout" className="border-transparent text-gray-900 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 sm:px-2 pt-1 text-xs sm:text-sm font-medium">
                Logout
              </Link>
            </div>
          </div>
          <div className="ml-2 sm:ml-6 flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
