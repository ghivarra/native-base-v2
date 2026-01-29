/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import variable from '../theme/variables/platform';

import NativeBaseComponent from './Base/NativeBaseComponent';

class Input extends NativeBaseComponent {
  constructor(props) {
    super(props);
    this._root = null;
    this._textInput = null;
  }

  getVariables() {
    if (this.props && this.props.theme && this.props.theme['@@shoutem.theme/themeStyle'] && this.props.theme['@@shoutem.theme/themeStyle'].variables) {
      return this.props.theme['@@shoutem.theme/themeStyle'].variables
    }
    return variable
  }

  render() {
    const {
      disabled,
      placeholderTextColor,
      // eslint-disable-next-line no-unused-vars
      theme,
      ...rest
    } = this.props;

    const variables = this.getVariables();

    return (
      <TextInput
        ref={c => {
          this._textInput = c;
          this._root = c;
        }}
        editable={!disabled}
        underlineColorAndroid="rgba(0,0,0,0)"
        placeholderTextColor={
          placeholderTextColor || variables.inputColorPlaceholder
        }
        {...rest}
      />
    );
  }
}

Input.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  theme: PropTypes.shape({})
};

const StyledInput = connectStyle(
  'NativeBase.Input',
  {},
  mapPropsToStyleNames
)(Input);

export { StyledInput as Input };
