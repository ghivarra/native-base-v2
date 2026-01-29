/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';
import { SafeAreaView } from 'react-native-safe-area-context';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this._root = null;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { style, theme, ...rest } = this.props;

    return (
      <SafeAreaView
        style={{
          backgroundColor: getStyle(style).backgroundColor
        }}
      >
        <View ref={c => (this._root = c)} {...rest} style={style} />
      </SafeAreaView>
    );
  }
}

Footer.propTypes = {
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