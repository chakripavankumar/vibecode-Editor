import Link from "next/link";
import { Github as LucideGithub } from "lucide-react";

export function Footer() {
  const socialLinks = [
    {
      href: "#",
      icon: (
        <LucideGithub className="h-5 w-5 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" />
      ),
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col items-center space-y-6 px-4 py-8 text-center sm:px-6">
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
