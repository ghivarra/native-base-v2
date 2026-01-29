/* eslint-disable react/forbid-prop-types */
import { connectStyle } from 'native-base-shoutem-theme';
import PropTypes from 'prop-types';
import React from 'react';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import variable from '../theme/variables/platform';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import getStyle from '../utils/getStyle';

class Content extends React.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
    this._scrollview = null;
  }

  getVariables() {
    if (this.props && this.props.theme && this.props.theme['@@shoutem.theme/themeStyle'] && this.props.theme['@@shoutem.theme/themeStyle'].variables) {
      return this.props.theme['@@shoutem.theme/themeStyle'].variables
    }
    return variable
  }

  render() {
    const {
      children,
      contentContainerStyle,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      padder,
      style,
      // eslint-disable-next-line no-unused-vars
      theme,
      ...rest
    } = this.props;

    const variables = this.getVariables();

    const containerStyle = {
      flex: 1,
      backgroundColor: getStyle(style).backgroundColor
    };

    return (
      <SafeAreaView style={containerStyle}>
        <KeyboardAwareScrollView
          {...rest}
          automaticallyAdjustContentInsets={false}
          resetScrollToCoords={disableKBDismissScroll ? null : { x: 0, y: 0 }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
          ref={c => {
            this._scrollview = c;
            this._root = c;
          }}
          contentContainerStyle={[
            { padding: padder ? variables.contentPadding : undefined },
            contentContainerStyle
          ]}
        >
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

Content.propTypes = {
  disableKBDismissScroll: PropTypes.bool,
  keyboardShouldPersistTaps: PropTypes.string,
  padder: PropTypes.bool,
  theme: PropTypes.shape({}),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ])
};

const StyledContent = connectStyle(
  'NativeBase.Content',
  {},
  mapPropsToStyleNames
)(Content);

export { StyledContent as Content };
