import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback,
  View
} from 'react-native';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import variable from '../theme/variables/platform';
import { TouchableHighlightProps } from '../utils/TouchableHighlightProps';

class ListItem extends Component {
  render() {
    const { theme, ...otherProps } = this.props
    const variables = theme ? theme['@@shoutem.theme/themeStyle'].variables : variable;

    if (
      Platform.OS === 'ios' ||
      Platform.OS === 'web' ||
      variables.androidRipple === false ||
      (!this.props.onPress && !this.props.onLongPress) ||
      Platform.Version <= 21
    ) {
      return (
        <TouchableHighlight
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}
          ref={c => (this._root = c)}
          underlayColor={variables.listBtnUnderlayColor}
          {...otherProps}
          style={this.props.touchableHighlightStyle}
        >
          <View {...otherProps} testID={undefined}>
            {this.props.children}
          </View>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableNativeFeedback
        ref={c => (this._root = c)}
        useForeground
        {...otherProps}
      >
        <View style={{ marginLeft: -17, paddingLeft: 17 }}>
          <View {...otherProps} testID={undefined}>
            {this.props.children}
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

ListItem.propTypes = {
  ...TouchableHighlightProps,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]),
  touchableHighlightStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  itemDivider: PropTypes.bool,
  button: PropTypes.bool
};

const StyledListItem = connectStyle(
  'NativeBase.ListItem',
  {},
  mapPropsToStyleNames
)(ListItem);

export { StyledListItem as ListItem };
