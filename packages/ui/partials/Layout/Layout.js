import React, { Component } from 'react';
import { array, bool, object } from 'prop-types';

import { FooBar, GlobalStyles, TopBar } from '@storycopter/ui/partials';
import { IdocProvider } from '@storycopter/ui/providers';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasOffset: false,
    };
    // this.watchPageYOffset = this.watchPageYOffset.bind(this);
  }

  // componentDidMount() {
  //   this.watchPageYOffset();
  //   window.addEventListener('scroll', this.watchPageYOffset);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.watchPageYOffset);
  // }

  // watchPageYOffset() {
  //   // this.setState({ hasOffset: window.pageYOffset > 0 });
  // }

  render() {
    const { children, isHome, isCredits, site } = this.props;

    // console.group('Layout.js');
    // console.log(this.props);
    // console.groupEnd();

    return (
      <IdocProvider>
        <GlobalStyles />
        <IdocProvider invert>
          <TopBar
            allowNext={!isCredits}
            allowPrev={!isHome && !isCredits}
            isCredits={isCredits}
            isHome={isHome}
            site={site}
          />
        </IdocProvider>
        <main>{children}</main>
        <FooBar></FooBar>
      </IdocProvider>
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: array.isRequired,
  isCredits: bool,
  isHome: bool,
  site: object.isRequired,
};

Layout.defaultProps = {
  isCredits: null,
  isHome: null,
};
