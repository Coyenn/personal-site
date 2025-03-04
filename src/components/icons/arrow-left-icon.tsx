import BaseIcon, { type BaseIconProps } from '@/src/components/icons/icon-base';

export interface ArrowLeftIconProps extends BaseIconProps {}

export default function ArrowLeftIcon(props: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2071 4.79289C16.5976 5.18342 16.5976 5.81658 16.2071 6.20711L9.91421 12.5L16.2071 18.7929C16.5976 19.1834 16.5976 19.8166 16.2071 20.2071C15.8166 20.5976 15.1834 20.5976 14.7929 20.2071L7.79289 13.2071C7.40237 12.8166 7.40237 12.1834 7.79289 11.7929L14.7929 4.79289C15.1834 4.40237 15.8166 4.40237 16.2071 4.79289Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}
