import React, { Component } from 'react';
import { Picker } from '@react-native-picker/picker';
import { connectStyle } from 'native-base-shoutem-theme';

import mapPropsToStyleNames from '../utils/mapPropsToStyleNames';
import { PickerItemProps } from '../utils/PickerItemProps';

class Item extends Component {
  render() {
    return <Picker.Item ref={c => (this._root = c)} {...this.props} />;
  }
}

Item.propTypes = {
  ...PickerItemProps
};

const StyledItem = connectStyle('NativeBase.Item', {}, mapPropsToStyleNames)(
  Item
);

export { StyledItem as Item };
