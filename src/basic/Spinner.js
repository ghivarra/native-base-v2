import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class Spinner extends Component {
  render() {
    const { theme, ...otherProps } = this.props
    const variables = theme ? theme['@@shoutem.theme/themeStyle'].variables : variable;

    return (
      <ActivityIndicator
        ref={c => (this._root = c)}
        {...otherProps}
        color={
          this.props.color
            ? this.props.color
            : this.props.inverse
            ? variables.inverseSpinnerColor
            : variables.defaultSpinnerColor
        }
        size={this.props.size ? this.props.size : 'large'}
      />
    );
  }
}

Spinner.propTypes = {
  animating: PropTypes.bool,
  hidesWhenStopped: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.oneOf(["small", "large"])], PropTypes.number),
  color: PropTypes.string,
  inverse: PropTypes.bool
};

const StyledSpinner = connectStyle(
  'NativeBase.Spinner',
  {},
  mapPropsToStyleNames
)(Spinner);

export { StyledSpinner as Spinner };
