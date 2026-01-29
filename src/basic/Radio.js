/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Platform } from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';
import Icon from 'react-native-vector-icons/Ionicons';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import variable from '../theme/variables/platform';
import computeProps from '../utils/computeProps';
import { TouchableOpacityProps } from '../utils/TouchableOpacityProps';

class Radio extends React.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
  }

  getVariables() {
    const themeVars = this.props.theme['@@shoutem.theme/themeStyle'].variables;
    return themeVars || variable;
  }

  prepareRootProps() {
    const defaultProps = {
      standardStyle: false
    };
    return computeProps(this.props, defaultProps);
  }

  render() {
    const {
      selected,
      selectedColor,
      color,
      standardStyle,
      // eslint-disable-next-line no-unused-vars
      theme,
      // eslint-disable-next-line no-unused-vars
      ...rest
    } = this.props;

    const variables = this.getVariables();

    return (
      <TouchableOpacity
        ref={c => (this._root = c)}
        {...this.prepareRootProps()}
      >
        {Platform.OS === 'ios' && !standardStyle ? (
          selected ? (
            <Icon
              style={{
                color: selectedColor || variables.radioColor,
                lineHeight: 25,
                height: 20,
                fontSize: variables.radioBtnSize
              }}
              name="ios-checkmark"
            />
          ) : null
        ) : (
          <Icon
            style={{
              color:
                Platform.OS === 'ios'
                  ? selected
                    ? selectedColor || variables.radioColor
                    : color || undefined
                  : selected
                  ? selectedColor ||
                    variables.radioSelectedColorAndroid
                  : color || undefined,
              lineHeight: variables.radioBtnLineHeight,
              fontSize: variables.radioBtnSize
            }}
            name={
              Platform.OS === 'ios'
                ? selected
                  ? 'ios-radio-button-on'
                  : 'ios-radio-button-off'
                : selected
                ? 'md-radio-button-on'
                : 'md-radio-button-off'
            }
          />
        )}
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  ...TouchableOpacityProps,
  selected: PropTypes.bool,
  standardStyle: PropTypes.bool,
  theme: PropTypes.shape({})
};

const StyledRadio = connectStyle(
  'NativeBase.Radio',
  {},
  mapPropsToStyleNames
)(Radio);

export { StyledRadio as Radio };
