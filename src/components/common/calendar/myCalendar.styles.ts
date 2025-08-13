import clsx from 'clsx';

const animationStyle =
  "before:absolute before:w-1 before:bg-fuchsia-300 before:content-[''] before:transition-all before:duration-300 before:ease-out after:absolute after:h-1 after:bg-fuchsia-300 after:content-[''] after:transition-all after:duration-300 after:ease-out";

export const buttonActiveStyle = clsx(
  'before:top-0 before:left-0 before:h-full after:top-0 after:left-0 after:w-full',
  animationStyle,
);

export const buttonInactiveStyle = clsx(
  'before:top-0 before:right-0 before:h-0 after:top-0 after:right-0 after:w-0 hover:bg-fuchsia-50',
  animationStyle,
);

export const divActiveStyle = clsx(
  'before:bottom-0 before:right-0 before:h-full after:bottom-0 after:right-0 after:w-full',
  animationStyle,
);

export const divInactiveStyle = clsx(
  'before:bottom-0 before:left-0 before:h-0 after:bottom-0 after:left-0 after:w-0 hover:bg-fuchsia-50',
  animationStyle,
);
