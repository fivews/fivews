import { createGlobalStyle } from 'styled-components';
import { breakpoint, color } from '../../settings';
import { setType } from '../../mixins';

const GlobalStyle = createGlobalStyle`

  /* RESET */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }

  /* NORMALIZE */

  body {
    ${setType('m')};
  }
  a {
    font-size: inherit;
    text-decoration: none;
  }
  img {
    line-height: 0;
  }
  abbr {
    text-decoration: none;
  }

  body,
  body * {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${color.flare200};
  }
  ::-moz-selection {
    background: ${color.flare200};
  }

  ${breakpoint.phone} {
    .hide-phone,
    .hide-mobile,
    .show-tablet,
    .show-desktop,
    .show-hdesktop {
      display: none;
    }
  }
  ${breakpoint.tablet} {
    .hide-mobile,
    .hide-tablet,
    .show-desktop,
    .show-hdesktop {
      display: none;
    }
  }
  ${breakpoint.tabletPlus} {
    .show-phone {
      display: none;
    }
  }
  ${breakpoint.desktop} {
    .hide-desktop,
    .show-tablet,
    .show-hdesktop {
      display: none;
    }
  }
  ${breakpoint.desktopPlus} {
    .show-tablet,
    .show-mobile {
      display: none;
    }
  }
  ${breakpoint.hdesktop} {
    .hide-hdesktop,
    .show-phone,
    .show-mobile,
    .show-tablet,
    .show-desktop { display: none;}
  }

  /* react-slick */

  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    line-height: 0;
    margin: 0;
    overflow: hidden;
    padding: 0;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }

  /* THEME */

  .slick-dots,
  .slick-next,
  .slick-prev {
    position: absolute;
    display: block;
    padding: 0;
  }
  .slick-dots li button:before,
  .slick-next:before,
  .slick-prev:before {
    font-family: slick;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-loading .slick-list {
    /* background: url(ajax-loader.gif) center center no-repeat #fff; */
  }
  /* @font-face {
    font-family: slick;
    font-weight: 400;
    font-style: normal;
    src: url(fonts/slick.eot);
    src: url(fonts/slick.eot?#iefix) format('embedded-opentype'), url(fonts/slick.woff) format('woff'),
      url(fonts/slick.ttf) format('truetype'), url(fonts/slick.svg#slick) format('svg');
  }*/
  .slick-next,
  .slick-prev {
    font-size: 0;
    line-height: 0;
    top: 50%;
    width: 20px;
    height: 20px;
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: 0;
    background: 0 0;
  }
  .slick-next:focus,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-prev:hover {
    color: transparent;
    outline: 0;
    background: 0 0;
  }
  .slick-next:focus:before,
  .slick-next:hover:before,
  .slick-prev:focus:before,
  .slick-prev:hover:before {
    opacity: 1;
  }
  .slick-next.slick-disabled:before,
  .slick-prev.slick-disabled:before {
    opacity: 0.25;
  }
  .slick-next:before,
  .slick-prev:before {
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
  }
  .slick-prev {
    left: -25px;
  }
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }
  .slick-prev:before {
    content: 'â†';
  }
  .slick-next:before,
  [dir='rtl'] .slick-prev:before {
    content: 'â†’';
  }
  .slick-next {
    right: -25px;
  }
  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }
  [dir='rtl'] .slick-next:before {
    content: 'â†';
  }
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }
  .slick-dots {
    bottom: -25px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .slick-dots li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
  }
  .slick-dots li button:focus,
  .slick-dots li button:hover {
    outline: 0;
  }
  .slick-dots li button:focus:before,
  .slick-dots li button:hover:before {
    opacity: 1;
  }
  .slick-dots li button:before {
    font-size: 6px;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: 'â€¢';
    text-align: center;
    opacity: 0.25;
    color: #000;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: #000;
  }

`;

export default GlobalStyle;