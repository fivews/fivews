import Img from 'gatsby-image';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { bool } from 'prop-types';
import { graphql, navigate, StaticQuery } from 'gatsby';

import { withTheme } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { PointerIcon, ShareIcon } from '@storycopter/ui/elements';
import { breakpoint, color, time, zindex, track } from '@storycopter/ui/settings';
import { setHeight, setSpace, setType } from '@storycopter/ui/mixins';

const Side = styled(({ lx, rx, ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: row;
  flex: 0 0 143px;
  justify-content: ${({ lx, rx }) => (rx ? 'flex-end' : 'flex-start')};

  ${({ lx, rx }) =>
    rx
      ? `
  ${IconButton} {${setSpace('mlx')}}`
      : ``}
`;
const Main = styled.div`
  flex: 1 1 100%;
  ${breakpoint.phone} {
    display: none;
  }
`;
const Toolbar = styled.div`
  pointer-events: auto;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.palette.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  letter-spacing: ${track.l};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  text-transform: uppercase;
  transition: opacity ${time.m};
  & > span {
    ${setSpace('phs')};
    ${setSpace('pvx')};
    ${setType('x')};
    background-color: ${color.shadow200};
    border-radius: 1px;
    pointer-events: auto;
  }
`;
const Summary = styled.div`
  display: none;
  opacity: 0;
  transition: opacity ${time.m};
  text-align: center;
  .summary-title {
    position: relative;
    top: -2px;
  }
  .summary-text {
    position: relative;
    top: -2px;
  }
`;
const Preview = styled.div`
  .preview-thumb {
    ${setSpace('mtx')};
  }
  .preview-title {
  }
  .preview-text {
    ${setSpace('mbx')};
  }
`;

const BreadcrumbMarker = styled.a`
  background-color: transparent;
  border-radius: 100px;
  cursor: pointer;
  display: inline-block;
  font-size: 1px;
  height: 34px;
  line-height: 34px;
  position: relative;
  transition: background-color ${time.m}, border-color ${time.m}, box-shadow ${time.m};
  width: 34px;
  &:hover {
    background-color: ${color.flare100};
    box-shadow: 0 0 5px ${color.shadow300};
  }
  .breadcrumb-tick {
    background: ${color.flare800};
    border-radius: 1px;
    box-shadow: 0 0 2px ${color.shadow300};
    display: block;
    height: 10px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
  }
  .breadcrumb-title,
  .breadcrumb-order {
    height: 1px;
    overflow: hidden;
    visibility: hidden;
    width: 1px;
  }
`;
const Breadcrumb = styled.li`
  position: relative;
  text-align: center;
  z-index: 1;
`;
const Breadcrumbs = styled.nav`
  bottom: 0;
  display: flex;
  display: none;
  flex-direction: row;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transform: translateY(50%);
  transition: opacity ${time.m};
  &:before {
    background: white;
    content: ' ';
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    top: 50%;
    width: ${({ count, current }) => (100 / count) * current - 100 / count / 2}%;
  }
  & > ol {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  ${Breadcrumb} {
    flex: 0 0 ${({ count }) => 100 / count}%;
  }
`;

const Element = styled(({ isHovered, theme, ...props }) => <header {...props} />)`
  ${setHeight('h')};
  ${setSpace('pam')};
  align-items: center;
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
  ${({ isHovered }) =>
    isHovered
      ? `
    background-color: ${color.mono900};
    box-shadow: 0 0 0 10px ${color.shadow300};
    pointer-events: auto;
    ${Breadcrumbs} {
      display: block;
      opacity: 1;
    }
    ${Summary} {
      display: block;
      opacity: 1;
    }
    ${Title} {
      display: none;
      opacity: 0;
    }
  `
      : ``};
`;

const TopBarQuery = graphql`
  query TopBarQuery {
    allChaptersJson {
      edges {
        node {
          meta {
            cover {
              name
            }
            order
            path
            text
            title
            uid
          }
        }
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "chapters" }, name: { eq: "cover" } }) {
      edges {
        node {
          childImageSharp {
            thumb: fixed(width: 40, height: 40, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
            preview: fixed(width: 160, height: 80, quality: 95, cropFocus: CENTER, fit: COVER) {
              ...GatsbyImageSharpFixed
            }
          }
          relativePath
        }
      }
    }
  }
`;

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
    this.toggleSharePopover = this.toggleSharePopover.bind(this);
    this.toggleHoveredState = this.toggleHoveredState.bind(this);
  }

  toggleHoveredState(state) {
    this.setState({ isHovered: state });
  }
  toggleSharePopover(state) {
    this.setState({ isHovered: state });
  }

  render() {
    const { allowPrev, allowNext, theme } = this.props;

    return (
      <StaticQuery
        query={TopBarQuery}
        render={data => {
          // fetch cover images by name
          const covers = data.allFile.edges.map(el => el.node);
          const toc = data.allChaptersJson.edges
            .map(el => el.node.meta)
            .map(el => {
              return {
                ...el,
                cover: {
                  ...el.cover,
                  ..._.find(covers, o => o.relativePath.startsWith(el.uid)),
                },
              };
            });

          // fetch active chapter
          const thisChapter = _.find(toc, o => o.path === this.props.path);

          // console.group('TopBar.js');
          // console.log(toc);
          // console.groupEnd();

          return (
            <PopupState variant="popover" popupId="sharePopover">
              {popupState => (
                <>
                  <Element
                    isHovered={this.state.isHovered || popupState.isOpen}
                    onMouseOut={() => this.toggleHoveredState(false)}
                    onMouseOver={() => this.toggleHoveredState(true)}
                    theme={theme}>
                    <Side lx>
                      <Toolbar>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Tooltip title="Table of contents">
                              <IconButton>
                                <MenuIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Tooltip title="Previous page">
                              <IconButton
                                disabled={!allowPrev}
                                style={{
                                  borderBottomRightRadius: 0,
                                  borderTopRightRadius: 0,
                                }}>
                                <KeyboardArrowLeftIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Next page">
                              <IconButton
                                disabled={!allowNext}
                                style={{
                                  borderBottomLeftRadius: 0,
                                  borderTopLeftRadius: 0,
                                }}>
                                <KeyboardArrowRightIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Toolbar>
                    </Side>
                    <Main>
                      <Title theme={theme}>
                        <span>Hiking Cima dell’Uomo</span>
                      </Title>
                      <Summary>
                        {thisChapter ? (
                          <>
                            <Typography
                              className="summary-title"
                              component="h2"
                              display="block"
                              noWrap
                              variant="caption">
                              Hiking Cima dell’Uomo
                            </Typography>
                            <Typography
                              className="summary-title"
                              component="p"
                              display="block"
                              noWrap
                              variant="subtitle2">
                              {thisChapter.title}
                            </Typography>
                          </>
                        ) : null}
                      </Summary>
                      <Breadcrumbs count={toc.length} current={thisChapter ? thisChapter.order : null}>
                        {toc.length > 1 ? (
                          <ol>
                            {_.sortBy(toc, [o => o.order]).map((chapter, i) => (
                              <Breadcrumb key={chapter.uid}>
                                <Tooltip
                                  title={
                                    <Preview>
                                      <Img fixed={chapter.cover.childImageSharp.preview} className="preview-thumb" />
                                      <Typography
                                        className="preview-title"
                                        component="h2"
                                        display="block"
                                        noWrap
                                        variant="subtitle1">
                                        {chapter.title}
                                      </Typography>
                                      <Typography
                                        className="preview-text"
                                        component="p"
                                        display="block"
                                        noWrap
                                        variant="caption">
                                        {chapter.text}
                                      </Typography>
                                    </Preview>
                                  }>
                                  <BreadcrumbMarker onClick={() => navigate(chapter.path)}>
                                    <span className="breadcrumb-order">{chapter.id}</span>
                                    <span className="breadcrumb-title">{chapter.title}</span>
                                    <span className="breadcrumb-tick"></span>
                                  </BreadcrumbMarker>
                                </Tooltip>
                              </Breadcrumb>
                            ))}
                          </ol>
                        ) : null}
                      </Breadcrumbs>
                    </Main>
                    <Side rx>
                      <Toolbar>
                        <Grid container spacing={1}>
                          <Grid item>
                            <Tooltip title="Share">
                              <IconButton {...bindTrigger(popupState)}>
                                <ShareIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Tooltip title="Take action">
                              <IconButton>
                                <PointerIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Toolbar>
                    </Side>
                  </Element>
                  <Menu
                    {...bindMenu(popupState)}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}>
                    <MenuItem onClick={popupState.close}>Facebook</MenuItem>
                    <MenuItem onClick={popupState.close}>Twitter</MenuItem>
                    <MenuItem onClick={popupState.close}>Email</MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          );
        }}
      />
    );
  }
}

export default withTheme(TopBar);

TopBar.propTypes = {
  allowNext: bool,
  allowPrev: bool,
  isCredits: bool,
  isHome: bool,
};
TopBar.defaultProps = {
  allowPrev: null,
  allowNext: null,
  isCredits: null,
  isHome: null,
};
