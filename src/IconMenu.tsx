import styled from 'styled-components'
const NaviconWrapper = styled.div`
  position: relative;
  position: absolute;
  top: 0;
  right: 0;
  width: var(--menu-min-width);
  height: var(--menu-min-width);
  display: grid;
  place-items: center;
  .navicon {
    cursor: pointer;
  }
`

interface Props {
  onClick: (e: React.SyntheticEvent) => void
  showPieTimer: boolean
}

export const IconMenu = ({ onClick, showPieTimer }: Props) => {
  return (
    <NaviconWrapper
      onKeyPress={onClick}
      onClick={onClick}
      role='button'
      tabIndex={1}
    >
      {showPieTimer ? (
        <div className='pie navicon'></div>
      ) : (
        <svg
          className='navicon'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='16' height='16' fill='white' />
          <rect width='16' height='16' fill='white' />
          <line x1='2' y1='4.5' x2='14' y2='4.5' stroke='black' />
          <line x1='2' y1='8.5' x2='14' y2='8.5' stroke='black' />
          <line x1='2' y1='12.5' x2='14' y2='12.5' stroke='black' />
        </svg>
      )}
    </NaviconWrapper>
  )
}
