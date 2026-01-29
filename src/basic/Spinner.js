/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

class Spinner extends React.Component {
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
      color,
      inverse,
      size,
      // eslint-disable-next-line no-unused-vars
      theme,
      ...rest
    } = this.props;

    const variables = this.getVariables();

    return (
      <ActivityIndicator
        ref={c => (this._root = c)}
        {...rest}
        color={
          color || inverse
            ? variables.inverseSpinnerColor
            : variables.defaultSpinnerColor
        }
        size={size || 'large'}
      />
    );
  }
}

Spinner.propTypes = {
  animating: PropTypes.bool,
  hidesWhenStopped: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['small', 'large']),
    PropTypes.number
  ]),
  color: PropTypes.string,
  inverse: PropTypes.bool,
  theme: PropTypes.shape({})
};

const StyledSpinner = connectStyle(
  'NativeBase.Spinner',
  {},
  mapPropsToStyleNames
)(Spinner);

export { StyledSpinner as Spinner };