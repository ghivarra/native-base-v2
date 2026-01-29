import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import { connectStyle } from 'native-base-shoutem-theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';

class Footer extends Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { style, theme, ...otherProps } = this.props;

    return (
      <SafeAreaView
        style={{
          backgroundColor: getStyle(style).backgroundColor
        }}
      >
        <View ref={c => (this._root = c)} {...otherProps} />
      </SafeAreaView>
    );
  }
}

Footer.propTypes = {
  ...ViewPropTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledFooter = connectStyle(
  'NativeBase.Footer',
  {},
  mapPropsToStyleNames
)(Footer);
export { StyledFooter as Footer };
