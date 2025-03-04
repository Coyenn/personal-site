import BaseIcon, { type BaseIconProps } from '@/src/components/icons/icon-base';

export interface CopyIconProps extends BaseIconProps {}

export default function CopyIcon(props: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M19.707 7.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L9 16.586l9.293-9.293a1 1 0 0 1 1.414 0Z"
        clipRule="evenodd"
      />
    </BaseIcon>
  );
}
