import styled from 'styled-components'

// Using passed-props as SC example,
// prefer a css custom vars solution for this.
export const Pages = styled.div`
  transform: ${({ viewPage }: { viewPage: number }) =>
    `translateX(calc((var(--visible-width)) * -${viewPage - 1}))`};
  display: flex;
  flex-flow: row nowrap;
  transition: transform 300ms ease-out;
  position: relative;
  left: 0;
`

export const Page = styled.section`
  min-width: calc(100vw - var(--menu-min-width));
  outline: 1px solid #eee;
  padding: 0 1rem;
  max-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow: scroll;
  padding-bottom: 10rem;
  h1 {
    text-align: center;
    margin-top: max(15vh - 50px, 4rem);
    font-family: 'Playfair Display';
    font-style: italic;
    font-size: min(max(2rem, 7vw), 5rem);
  }
  .limited {
    max-width: 35rem;
    margin: 1.5rem auto;
    line-height: 1.8rem;
  }
`

export const Block = styled.div`
  max-width: ${({ limit }: { limit: number }) => limit};
  margin: ${({ my }: { my: number }) => my || '4rem'} auto;
  p {
    margin-bottom: 0;
    font-size: 0.8rem;
  }
  code {
    background-color: yellow;
    border-radius: 3px;
    padding: 0.3rem 1rem;
    line-height: 1.5rem;
  }
`

export const Separator = styled.div`
  height: 0;
  border-bottom: 1px dashed #555555;
  margin: 6rem auto 2rem auto;
`

export const Ttip = styled.span`
  position: relative;
  &[data-tool-tip] {
    &::after {
      content: attr(data-tool-tip);
      display: block;
      position: absolute;
      background-color: #ccc;
      border-radius: 5px;
      padding: 1em 3em;
      color: #444;
      font-size: 0.8em;
      bottom: 0;
      left: 0;
      white-space: wrap;
      transform: scale(0);
      transition: transform ease-out 150ms, bottom ease-out 150ms;
      max-width: 30rem;
      width: max-content;
    }
    &::before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 3rem;
      transform: translateY(-100%);
      width: 0;
      height: 0;
      opacity: 0;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #ccc transparent transparent transparent;
      transition: bottom 150ms ease-out, opacity 150ms ease-out;
      transition-delay: 0;
    }
    &:hover::after {
      bottom: 100%;
      transform: scale(1);
    }
    &:hover::before {
      bottom: 100%;
      opacity: 1;
      transform: scale(1) translateY(100%);
      transition-delay: 150ms;
    }
  }
`
