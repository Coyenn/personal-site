import BaseIcon, { type BaseIconProps } from '@/src/components/icons/icon-base';

export interface ArrowRightIconProps extends BaseIconProps {}

export default function ArrowRightIcon(props: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.79289 4.79289C8.18342 4.40237 8.81658 4.40237 9.20711 4.79289L16.2071 11.7929C16.5976 12.1834 16.5976 12.8166 16.2071 13.2071L9.20711 20.2071C8.81658 20.5976 8.18342 20.5976 7.79289 20.2071C7.40237 19.8166 7.40237 19.1834 7.79289 18.7929L14.0858 12.5L7.79289 6.20711C7.40237 5.81658 7.40237 5.18342 7.79289 4.79289Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}
