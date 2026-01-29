/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connectStyle } from 'native-base-shoutem-theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

import icoMoonConfig from '../basic/Icon/selection.json';
import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';

const Icomoon = createIconSetFromIcoMoon(icoMoonConfig);

const ICON_MAP = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Icomoon,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
};

class IconNB extends React.PureComponent {
  constructor(props) {
    super(props);
    this._root = null;
  }

  setRoot = c => {
    this._root = c;
  };

  getIcon(type) {
    if (!type) {
      if (this.props && this.props.theme && this.props.theme['@@shoutem.theme/themeStyle'] && this.props.theme['@@shoutem.theme/themeStyle'].variables && this.props.theme['@@shoutem.theme/themeStyle'].variables.iconFamily) {
        const themeType = this.props.theme['@@shoutem.theme/themeStyle'].variables
        return ICON_MAP[themeType]
      }
      
      return Ionicons
    }
    return ICON_MAP[type] || Ionicons;
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { type, theme, ...rest } = this.props;
    const Icon = this.getIcon(type);
    return <Icon ref={this.setRoot} {...rest} />;
  }
}

IconNB.propTypes = {
  type: PropTypes.oneOf(Object.keys(ICON_MAP)),
  theme: PropTypes.shape({})
};

const StyledIconNB = connectStyle(
  'NativeBase.IconNB',
  {},
  mapPropsToStyleNames
)(IconNB);

export { StyledIconNB as IconNB };
