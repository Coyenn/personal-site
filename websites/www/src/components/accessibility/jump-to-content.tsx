export default function JumpToContent() {
  return (
    <a
      href='#content'
      className='pointer-events-none absolute left-0 top-0 z-[99999] bg-gray1 p-2 text-gray6 opacity-0 focus:pointer-events-auto focus:opacity-100'
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
}
