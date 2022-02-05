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

export const Page = styled.div`
  min-width: calc(100vw - var(--menu-min-width));
  outline: 1px solid #eee;
  padding: 0 1rem;
  max-height: calc(100vh - var(--header-height) - var(--footer-height));
  overflow: scroll;
  padding-bottom: 10rem;
  h1 {
    text-align: center;
    margin-top: max(15vh - 50px, 4rem);
  }
  .limited {
    max-width: 35rem;
    margin: 1.5rem auto;
    line-height: 1.8rem;
  }
`

export const Block = styled.div`
  max-width: ${({ limit }: { limit: number }) => limit};
  margin: 4rem auto;
  p {
    margin-bottom: 0;
    font-size: 0.8rem;
  }
  code {
    background-color: yellow;
    border-radius: 3px;
    padding: 0.3rem 1rem;
  }
`
