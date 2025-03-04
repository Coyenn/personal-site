import { type MotionProps, motion } from 'framer-motion';
import type React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & Partial<MotionProps>;

export interface BaseIconProps extends IconProps {
  asMotion?: boolean;
}

export default function BaseIcon(props: BaseIconProps) {
  const { asMotion, ...rest } = props;
  const Comp = asMotion ? motion.svg : 'svg';

  return (
    <Comp
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...(rest as IconProps)}
    />
  );
}
