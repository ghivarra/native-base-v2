/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import variables from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

import { Input } from './Input';
import { Label } from './Label';
import { Icon } from './Icon';
import { Thumbnail } from './Thumbnail';
import { TouchableOpacityProps } from '../utils/TouchableOpacityProps';

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      text: '',
      topAnim: new Animated.Value(18),
      opacAnim: new Animated.Value(1),
    };
  }

  componentDidMount() {
    this.syncFromChildren(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.syncFromChildren(nextProps);
  }

  getInitialStyle() {
    return {
      roundedInputGroup: {
        borderWidth: this.props.rounded ? variables.borderWidth * 2 : undefined,
        borderRadius: this.props.rounded
          ? variables.inputGroupRoundedBorderRadius
          : undefined,
      },
    };
  }

  syncFromChildren(props) {
    const children = React.Children.toArray(props.children);

    this.label = children.find(c => c.type === Label);
    this.input = children.find(c => c.type === Input);
    this.icon = children.find(c => c.type === Icon);
    this.image = children.find(c => c.type === Thumbnail);

    this.inputProps = (this.input && this.input.props) ? this.input.props : {};

    if (props.floatingLabel && this.inputProps && this.inputProps.value) {
      this.setState({ isFocused: true });
      this.floatUp(-16);
    }
  }

  prepareRootProps() {
    const { style, ...others } = this.props;
    return {
      ...others,
      style: [this.getInitialStyle().roundedInputGroup, style],
    };
  }

  floatBack() {
    Animated.timing(this.state.topAnim, {
      toValue: 18,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.opacAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  floatUp() {
    Animated.timing(this.state.topAnim, {
      toValue: -16,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.opacAnim, {
      toValue: 0.7,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  renderFloating(labelProps, inputProps, offset = 0) {
    return (
      <View>
        <Animated.View
          style={{
            position: 'absolute',
            left: offset,
            right: 0,
            transform: [{ translateY: this.state.topAnim }],
            opacity: this.state.opacAnim,
          }}
        >
          <Label {...labelProps} />
        </Animated.View>

        <Input
          ref={c => (this._inputRef = c)}
          {...inputProps}
          onFocus={() => {
            this.setState({ isFocused: true });
            this.floatUp();
            inputProps.onFocus && inputProps.onFocus();
          }}
          onBlur={e => {
            if (!this.state.text.length) {
              this.setState({ isFocused: false });
              this.floatBack();
            }
            inputProps.onBlur && inputProps.onBlur(e);
          }}
          onChangeText={text => {
            this.setState({ text });
            inputProps.onChangeText && inputProps.onChangeText(text);
          }}
        />
      </View>
    );
  }

  renderChildren() {
    if (!this.props.floatingLabel) return this.props.children;

    const labelProps = (this.label && this.label.props) ? this.label.props : {};
    const inputProps = this.inputProps || {};

    return this.renderFloating(labelProps, inputProps);
  }

  render() {
    return (
      <TouchableOpacity
        ref={c => (this._root = c)}
        {...this.prepareRootProps()}
        activeOpacity={1}
      >
        {this.renderChildren()}
      </TouchableOpacity>
    );
  }
}


Item.propTypes = {
  ...TouchableOpacityProps,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  inlineLabel: PropTypes.bool,
  floatingLabel: PropTypes.bool,
  stackedLabel: PropTypes.bool,
  fixedLabel: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
};

const StyledItem = connectStyle(
  'NativeBase.Item',
  {},
  mapPropsToStyleNames
)(Item);

export { StyledItem as Item };