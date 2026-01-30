/* eslint-disable new-cap */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Pressable,
  Platform,
  View,
  StyleSheet
} from 'react-native'
import { connectStyle } from 'native-base-shoutem-theme'

import variable from '../theme/variables/platform'
import { PLATFORM } from '../theme/variables/commonColor'
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames'

import { Text } from './Text'
import { TouchableOpacityProps } from '../utils/TouchableOpacityProps'

const styles = StyleSheet.create({
  childContainer: {
    minHeight: variable.buttonDefaultHeight,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Button extends React.PureComponent {
  setRoot = (c) => {
    this._root = c
  }

  getInitialStyle() {
    return {
      borderWidth: this.props.bordered
        ? variable.buttonDefaultBorderWidth
        : undefined,
      borderRadius:
        this.props.rounded && this.props.bordered
          ? variable.borderRadiusLarge
          : variable.buttonDefaultBorderRadius,
    }
  }

  prepareRootProps() {
    // eslint-disable-next-line no-unused-vars
    const { style, theme, ...others } = this.props

    return {
      ...others,
      style: StyleSheet.flatten([
        this.getInitialStyle(),
        style,
      ]),
    }
  }

  renderChildren(variables) {
    if (
      Platform.OS === PLATFORM.IOS ||
      !variables.buttonUppercaseAndroidText
    ) {
      return this.props.children
    }

    return React.Children.map(this.props.children, child =>
      child && child.type === Text
        ? React.cloneElement(child, {
          uppercase:
              this.props.buttonUppercaseAndroidText === false
                ? false
                : variables.buttonUppercaseAndroidText,
          ...child.props,
        })
        : child
    )
  }

  render() {
    const { theme, disabled, activeOpacity } = this.props
    const variables = theme
      ? theme['@@shoutem.theme/themeStyle'].variables
      : variable

    const rootProps = this.prepareRootProps()
    const children = this.renderChildren(variables)

    return (
      <Pressable
        {...rootProps}
        ref={this.setRoot}
        disabled={disabled}
        android_ripple={
          Platform.OS === 'android' && variables.androidRipple !== false
            ? {
              color:
                  this.props.androidRippleColor ||
                  variables.androidRippleColor,
            }
            : undefined
        }
        style={({ pressed }) => [
          rootProps.style,
          pressed &&
            Platform.OS === 'ios' && {
              opacity:
                activeOpacity > 0
                  ? activeOpacity
                  : variable.buttonDefaultActiveOpacity,
            },
        ]}
      >
        <View style={styles.childContainer}>
          {children}
        </View>
      </Pressable>
    )
  }
}

Button.propTypes = {
  ...TouchableOpacityProps,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
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
  active: PropTypes.bool,
}



const StyledButton = connectStyle(
  'NativeBase.Button',
  {},
  mapPropsToStyleNames
)(Button)

export { StyledButton as Button }