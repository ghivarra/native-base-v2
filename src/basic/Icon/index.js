/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from '../../theme/variables/platform';
import mapPropsToStyleNames from '../../utils/mapPropsToStyleNames';
import { IconNB } from '../IconNB';

import ic from './NBIcons.json';

const IS_IOS = Platform.OS === 'ios';

class Icon extends React.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
  }

  setRoot = c => {
    this._root = c;
  };

  getVariables() {
    const themeVars = this.props.theme['@@shoutem.theme/themeStyle'].variables;
    return themeVars || variable;
  }

  getName() {
    const variables = this.getVariables();
    const platformStyle = variables.platformStyle;

    if ((this.props.type || variables.iconFamily) === 'Ionicons') {
      if (typeof ic[this.props.name] !== 'object') {
        return this.props.name;
      }
      if (IS_IOS && platformStyle !== 'material') {
        return this.props.active
          ? ic[this.props.name].ios.active
          : ic[this.props.name].ios.default;
      }
      return this.props.active
        ? ic[this.props.name].android.active
        : ic[this.props.name].android.default;
    }
    return this.props.name;
  }

  getIconName() {
    if (IS_IOS) {
      if (this.props.ios) return this.props.ios;
      return this.props.active
        ? ic[this.props.name].ios.active
        : ic[this.props.name].ios.default;
    }
    if (this.props.android) return this.props.android;
    return this.props.active
      ? ic[this.props.name].android.active
      : ic[this.props.name].android.default;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { ios, android, name, theme, ...rest } = this.props;

    if (ios && android) {
      return (
        <IconNB
          ref={this.setRoot}
          {...rest}
          name={IS_IOS ? ios : android}
        />
      );
    }

    if (name && (android || ios)) {
      return (
        <IconNB
          ref={this.setRoot}
          {...rest}
          name={this.getIconName()}
        />
      );
    }

    return (
      <IconNB
        ref={this.setRoot}
        {...rest}
        name={this.getName()}
      />
    );
  }
}

Icon.propTypes = {
  ...IconNB.propTypes,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  name: PropTypes.string,
  ios: PropTypes.string,
  android: PropTypes.string,
  active: PropTypes.bool,
  type: PropTypes.string,
  theme: PropTypes.shape({})
};

const StyledIcon = connectStyle(
  'NativeBase.Icon',
  {},
  mapPropsToStyleNames
)(Icon);

export { StyledIcon as Icon };
