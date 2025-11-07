import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserButton from "@/features/auth/components/UserButton";

export function Header() {
  return (
    <>
      <div className="sticky top-0 right-0 left-0 z-50">
        <div className="w-full bg-white dark:bg-black/5">
          {/* Rest of the header content */}
          <div className="flex w-full items-center justify-center">
            <div
              className={`relative flex w-full items-center justify-between rounded-b-[28px] border-x border-b border-[rgba(230,230,230,0.7)] bg-linear-to-b from-white/90 via-gray-50/90 to-white/90 px-4 py-2.5 shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 ease-in-out sm:max-w-[1200px] sm:min-w-[800px] dark:border-[rgba(70,70,70,0.7)] dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90`}
            >
              <div className="relative z-10 flex w-full items-center justify-between gap-2">
                {/* Logo Section with Navigation Links */}
                <div className="flex items-center justify-center gap-6">
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2"
                  >
                    <Image
                      src={"/logo.svg"}
                      alt="Logo"
                      height={60}
                      width={60}
                    />

                    <span className="hidden text-lg font-extrabold sm:block">
                      VibeCode Editor
                    </span>
                  </Link>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  {/* Desktop Navigation Links */}
                  <div className="hidden items-center gap-4 sm:flex">
                    <Link
                      href="/docs/components/background-paths"
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      Docs
                    </Link>
                    {
                      <Link
                        href="/pricing"
                        className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      >
                        Pricing
                      </Link>
                    }
                    <Link
                      href="https://codesnippetui.pro/templates?utm_source=codesnippetui.com&utm_medium=header"
                      target="_blank"
                      className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                      API
                      <span className="rounded-lg border border-green-500 px-1 py-0.5 text-xs text-green-500 dark:border-green-400 dark:text-green-400">
                        New
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Right side items */}
                <div className="hidden items-center gap-3 sm:flex">
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <ThemeToggle />
                  <UserButton />
                </div>

                {/* Mobile Navigation remains unchanged */}
                <div className="flex items-center gap-4 sm:hidden">
                  <Link
                    href="/docs/components/action-search-bar"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    API
                  </Link>
                  <ThemeToggle />
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
