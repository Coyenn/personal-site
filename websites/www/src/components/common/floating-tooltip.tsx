export interface FloatingTooltipProps {
  text: string;
  children: React.ReactNode;
}

function FloatingTooltip(props: FloatingTooltipProps) {
  const { text, children } = props;

  return <div data-tooltip={text}>{children}</div>;
}

export default FloatingTooltip;
