export const Header = () => {
  return (
    <header className='p-5 pl-10 flex items-center justify-between bg-background'>
      <div className='text-5xl text-text '>FePo</div>
      <div className='flex items-center justify-between w-[50vw]'>
        <nav className='flex gap-16 text-text'>
          <div>events</div>
          <div>places</div>
          <div>people</div>
          <div>people</div>
        </nav>
        <div className='flex items-center gap-8'>
          <div className='text-text'>name</div>
          <svg
            width='64'
            height='64'
            viewBox='0 0 64 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='32'
              cy='32'
              r='32'
              fill='#F9F5FF'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.42322 51.234L10.4321 36.1604C11.4807 32.2178 15.0501 29.4736 19.1298 29.4736H46.4829C50.5959 29.4736 54.1856 32.262 55.2031 36.2472L58.6449 49.7276C52.909 58.3316 43.1165 64 32 64C21.546 64 12.2629 58.9871 6.42322 51.234Z'
              fill='#7C4DFF'
            />
            <circle
              cx='32.8421'
              cy='16.8421'
              r='10.1053'
              fill='#7C4DFF'
            />
          </svg>
        </div>
      </div>
    </header>
  )
}
