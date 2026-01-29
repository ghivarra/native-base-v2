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

class IconNB extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRoot = this.setRoot.bind(this);
  }

  setRoot(c) {
    this._root = c;
  }

  // eslint-disable-next-line class-methods-use-this
  getIcon(iconType, theme) {
    let finalIcon;
    if (!iconType) {
      finalIcon = (theme && theme['@@shoutem.theme/themeStyle'].variables.iconFamily) ? (theme && theme['@@shoutem.theme/themeStyle'].variables.iconFamily) : "Ionicons";
    } else {
      finalIcon = iconType
    }

    switch (finalIcon) {
      case 'AntDesign': return AntDesign;
      case 'Entypo': return Entypo;
      case 'EvilIcons': return EvilIcons;
      case 'Feather': return Feather;
      case 'FontAwesome': return FontAwesome;
      case 'FontAwesome5': return FontAwesome5;
      case 'Fontisto': return Fontisto;
      case 'Foundation': return Foundation;
      case 'Icomoon': return Icomoon;
      case 'Ionicons': return Ionicons;
      case 'MaterialCommunityIcons': return MaterialCommunityIcons;
      case 'MaterialIcons': return MaterialIcons;
      case 'Octicons': return Octicons;
      case 'SimpleLineIcons': return SimpleLineIcons;
      case 'Zocial': return Zocial;
      default: return Ionicons;
    }
  }

  render() {
    const { theme, type, ...otherProps } = this.props;
    const Icon = this.getIcon(type, theme);

    return <Icon ref={this.setRoot} {...otherProps} />;
  }
}

IconNB.propTypes = {
  type: PropTypes.oneOf([
    'AntDesign',
    'Entypo',
    'EvilIcons',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Icomoon',
    'Ionicons',
    'MaterialCommunityIcons',
    'MaterialIcons',
    'Octicons',
    'SimpleLineIcons',
    'Zocial',
  ]),
};

const StyledIconNB = connectStyle(
  'NativeBase.IconNB',
  {},
  mapPropsToStyleNames
)(IconNB);

export { StyledIconNB as IconNB };