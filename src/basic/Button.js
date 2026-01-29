/* eslint-disable new-cap */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Platform,
  View,
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variable from '../theme/variables/platform';
import { PLATFORM } from '../theme/variables/commonColor';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

import { Text } from './Text';
import { TouchableOpacityProps } from '../utils/TouchableOpacityProps';

const styles = StyleSheet.create({
  childContainer: {
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
  }

  setRoot = c => {
    this._root = c;
  };

  getVariables() {
    if (this.props && this.props.theme && this.props.theme['@@shoutem.theme/themeStyle'] && this.props.theme['@@shoutem.theme/themeStyle'].variables) {
      return this.props.theme['@@shoutem.theme/themeStyle'].variables
    }
    return variable
  }

  getInitialStyle() {
    return {
      borderedBtn: {
        borderWidth: this.props.bordered
          ? variable.buttonDefaultBorderWidth
          : undefined,
        borderRadius:
          this.props.rounded && this.props.bordered
            ? variable.borderRadiusLarge
            : variable.buttonDefaultBorderRadius
      }
    };
  }

  prepareRootProps() {
    // eslint-disable-next-line no-unused-vars
    const { style, theme, ...others } = this.props;
    return {
      ...others,
      style: StyleSheet.flatten(
        StyleSheet.compose(this.getInitialStyle().borderedBtn, style)
      )
    };
  }

  render() {
    const variables = this.getVariables();

    const children =
      Platform.OS === PLATFORM.IOS || !variables.buttonUppercaseAndroidText
        ? this.props.children
        : React.Children.map(this.props.children, child =>
            child && child.type === Text
              ? React.cloneElement(child, {
                ...child.props,
                uppercase:
                    this.props.buttonUppercaseAndroidText === false
                      ? false
                      : variables.buttonUppercaseAndroidText
              })
              : child
          );

    const rootProps = this.prepareRootProps();

    if (
      Platform.OS === PLATFORM.IOS ||
      Platform.OS === PLATFORM.WEB ||
      variables.androidRipple === false ||
      Platform.Version < 21
    ) {
      return (
        <TouchableOpacity
          {...rootProps}
          ref={this.setRoot}
          activeOpacity={
            this.props.activeOpacity > 0
              ? this.props.activeOpacity
              : variable.buttonDefaultActiveOpacity
          }
        >
          {children}
        </TouchableOpacity>
      );
    }

    if (this.props.rounded) {
      const buttonStyle = { ...rootProps.style };
      const buttonFlex =
        this.props.full || this.props.block
          ? variable.buttonDefaultFlex
          : buttonStyle.flex;

      return (
        <View
          style={[
            { maxHeight: buttonStyle.height },
            buttonStyle,
            { paddingTop: undefined, paddingBottom: undefined }
          ]}
        >
          <TouchableNativeFeedback
            ref={this.setRoot}
            onPress={this.props.onPress}
            background={TouchableNativeFeedback.Ripple(
              this.props.androidRippleColor || variables.androidRippleColor,
              true
            )}
          >
            <View
              style={[
                styles.childContainer,
                {
                  paddingTop: buttonStyle.paddingTop,
                  paddingBottom: buttonStyle.paddingBottom,
                  height: buttonStyle.height,
                  flexGrow: buttonFlex
                }
              ]}
            >
              {children}
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }

    return (
      <TouchableNativeFeedback
        ref={this.setRoot}
        onPress={this.props.onPress}
        background={
          this.props.transparent
            ? TouchableNativeFeedback.Ripple('transparent')
            : TouchableNativeFeedback.Ripple(
                variables.androidRippleColor,
                false
              )
        }
      >
        <View {...rootProps}>{children}</View>
      </TouchableNativeFeedback>
    );
  }
}

Button.propTypes = {
  ...TouchableOpacityProps,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  block: PropTypes.bool,
  primary: PropTypes.bool,
  transparent: PropTypes.bool,
  success: PropTypes.bool,
  danger: PropTypes.bool,
  warning: PropTypes.bool,
  info: PropTypes.bool,
  bordered: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  large: PropTypes.bool,
  small: PropTypes.bool,
  active: PropTypes.bool
};

const StyledButton = connectStyle(
  'NativeBase.Button',
  {},
  mapPropsToStyleNames
)(Button);

export { StyledButton as Button };
