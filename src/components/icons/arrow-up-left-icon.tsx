import BaseIcon, { type BaseIconProps } from '@/src/components/icons/icon-base';

export interface ArrowUpLeftIconProps extends BaseIconProps {}

export default function ArrowUpLeftIcon(props: ArrowUpLeftIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0001 6C16.0001 5.44772 15.5524 5 15.0001 5L6.00009 5C5.44781 5 5.00009 5.44772 5.00009 6L5.00009 15C5.00009 15.5523 5.44781 16 6.00009 16C6.55238 16 7.00009 15.5523 7.00009 15V8.41421L16.293 17.7071C16.6835 18.0976 17.3167 18.0976 17.7072 17.7071C18.0977 17.3166 18.0977 16.6834 17.7072 16.2929L8.41431 7L15.0001 7C15.5524 7 16.0001 6.55228 16.0001 6Z"
        fill="currentColor"
      />
    </BaseIcon>
  );
}
