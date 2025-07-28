import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';
import TextLink from '../text/text-link';

interface BlockProps {
  header?: string;
  children: React.ReactNode;
  className?: string;
  link?: string;
}

export default function Block({ header, children, className, link }: BlockProps) {
  return (
    <div className={cn("w-full flex flex-col h-fit p-4", className)}>
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col gap-2">
        {header &&
        <div className="flex items-center justify-between">
          <h2 className="text-black dark:text-white text-lg font-semibold">{header}</h2>
          {link && <TextLink href={link} className="flex items-center gap-2">See all <ArrowRightIcon size={16} /></TextLink>}
        </div>}
        <div className="flex-1 flex items-center">
          {children}
        </div>
      </div>
    </div>
  );
}