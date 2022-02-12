import styled from 'styled-components'

const NaviconWrapper = styled.div`
  position: relative;
  position: absolute;
  top: 0;
  right: 0;
  width: var(--menu-min-width);
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1rem;
  cursor: pointer;
  .navicon {
    --transform-timing: transform 300ms ease-out 300ms;
    &.open .top {
      transition: var(--transform-timing);
      transform-origin: 2.5px 4.5px;
      transform: translateX(1.5px) rotate(45deg);
    }
    &.open .bottom {
      transition: var(--transform-timing);
      transform-origin: 2.5px 12.5px;
      transform: translateX(1.5px) rotate(-45deg);
    }
    &.open .middle {
      transition: var(--transform-timing);
      transform-origin: 7.8px 14px;
      transform: rotateY(90deg);
    }
  }
`

interface Props {
  onClick: (e: React.SyntheticEvent) => void
  showPieTimer: boolean
  className?: string
}

export const IconMenu = ({ onClick, showPieTimer, className = '' }: Props) => {
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
          className={`navicon ${className}`}
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='16' height='16' fill='white' />
          <line
            className='top'
            x1='2'
            y1='4.5'
            x2='14'
            y2='4.5'
            stroke='black'
          />
          <line
            className='middle'
            x1='2'
            y1='8.5'
            x2='14'
            y2='8.5'
            stroke='black'
          />
          <line
            className='bottom'
            x1='2'
            y1='12.5'
            x2='14'
            y2='12.5'
            stroke='black'
          />
        </svg>
      )}
    </NaviconWrapper>
  )
}
