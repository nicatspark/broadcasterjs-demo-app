import styled from 'styled-components'
import { keyframes } from 'styled-components'

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
  scroll-snap-type: y proximity;
  scroll-padding-top: 0.5rem;
  h1 {
    text-align: center;
    margin-top: max(15vh - 50px, 4rem);
    font-family: 'Playfair Display';
    font-style: italic;
    font-size: min(max(2rem, 7vw), 5rem);
    position: relative;
    color: #000000;
  }
  .limited {
    max-width: 35rem;
    margin: 1.5rem auto;
    line-height: 1.8rem;
  }
`

const ping = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  80% {
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(5);
    opacity: 0;
  }
`

export const Section = styled.div`
  transition: border-color 3s, background-color 3s;
  position: relative;
  &.rerendered {
    border-color: yellow;
    background-color: yellow;
    transition: none;
  }
  &.emitter:after {
    background-image: url('https://hervy.s3.eu-north-1.amazonaws.com/broadcaster.jpg');
  }
  &.receiver:after {
    background-image: url('https://hervy.s3.eu-north-1.amazonaws.com/listener.jpg');
  }
  &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    mix-blend-mode: darken;
    opacity: 0.1;
  }
`

export const Contact = styled.div`
  padding: 0.5em 1em;
  font-size: 0.7rem;
  a {
    color: #666;
    text-decoration: none;
  }
`

export const Logoimage = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  top: 6rem;
  height: 80px;
  isolation: isolate;
  filter: blur(0.5px);
  img {
    width: 80px;
  }
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(5);
    border-left: 1px solid black;
    border-right: 1px solid black;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    animation: ${ping} 4s ease-out infinite;
    z-index: -1;
    filter: blur(2px);
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
