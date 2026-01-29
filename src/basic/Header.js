/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/forbid-prop-types */
import { connectStyle } from 'native-base-shoutem-theme';
import PropTypes from 'prop-types';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';
import variable from '../theme/variables/platform';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this._root = null;
  }

  getVariables() {
    const themeVars = this.props.theme['@@shoutem.theme/themeStyle'].variables;
    return themeVars || variable;
  }

  render() {
    const {
      androidStatusBarColor,
      iosBarStyle,
      style,
      transparent,
      translucent,
      // eslint-disable-next-line no-unused-vars
      theme,
      ...rest
    } = this.props;

    const variables = this.getVariables();
    const platformStyle = variables.platformStyle;

    return (
      <View>
        <StatusBar
          backgroundColor={
            androidStatusBarColor
              ? androidStatusBarColor
              : variables.statusBarColor
          }
          barStyle={
            iosBarStyle
              ? iosBarStyle
              : platformStyle === 'material'
              ? 'light-content'
              : variables.iosStatusbar
          }
          translucent={transparent ? true : translucent}
        />
        <SafeAreaView
          style={{
            backgroundColor: getStyle(style).backgroundColor
          }}
        >
          <View ref={c => (this._root = c)} {...rest} style={style} />
        </SafeAreaView>
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  searchBar: PropTypes.bool,
  rounded: PropTypes.bool
};

const StyledHeader = connectStyle(
  'NativeBase.Header',
  {},
  mapPropsToStyleNames
)(Header);

export { StyledHeader as Header };
