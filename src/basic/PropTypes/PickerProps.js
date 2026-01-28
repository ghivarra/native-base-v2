import PropTypes from "prop-types";

const ItemValue = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

// Note: StyleProp<TextStyle> is approximated by a flexible prop type.
const stylePropType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array,
]);

export const PickerProps = {
    // Inherited from ViewProps (a subset of common view props)
  style: stylePropType,
    
  selectedValue: ItemValue,
    
  onValueChange: PropTypes.func,
    
  enabled: PropTypes.bool,
    
  mode: PropTypes.oneOf(['dialog', 'dropdown']),
    
  itemStyle: stylePropType,
    
  prompt: PropTypes.string,
    
  testID: PropTypes.string,
    
  dropdownIconColor: PropTypes.string,
    
  children: PropTypes.node,
};