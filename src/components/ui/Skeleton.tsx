import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'animate-pulse bg-zinc-800/80',
          {
            'rounded-md h-4': variant === 'text',
            'rounded-xl': variant === 'rect',
            'rounded-full': variant === 'circle',
          },
          className
        )
      )}
      {...props}
    />
  );
};

export default Skeleton;
