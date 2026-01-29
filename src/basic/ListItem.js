/* eslint-disable react/forbid-prop-types */
import React from 'react';
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

class ListItem extends React.Component {
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
      children,
      onPress,
      onLongPress,
      touchableHighlightStyle,
      // eslint-disable-next-line no-unused-vars
      theme,
      ...rest
    } = this.props;

    const variables = this.getVariables();

    const useHighlight =
      Platform.OS === 'ios' ||
      Platform.OS === 'web' ||
      variables.androidRipple === false ||
      (!onPress && !onLongPress) ||
      Platform.Version <= 21;

    if (useHighlight) {
      return (
        <TouchableHighlight
          ref={c => (this._root = c)}
          onPress={onPress}
          onLongPress={onLongPress}
          underlayColor={variables.listBtnUnderlayColor}
          style={touchableHighlightStyle}
        >
          <View {...rest} testID={undefined}>
            {children}
          </View>
        </TouchableHighlight>
      );
    }

    return (
      <TouchableNativeFeedback
        ref={c => (this._root = c)}
        useForeground
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View style={{ marginLeft: -17, paddingLeft: 17 }}>
          <View {...rest} testID={undefined}>
            {children}
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
  button: PropTypes.bool,
  theme: PropTypes.shape({})
};

const StyledListItem = connectStyle(
  'NativeBase.ListItem',
  {},
  mapPropsToStyleNames
)(ListItem);

export { StyledListItem as ListItem };
