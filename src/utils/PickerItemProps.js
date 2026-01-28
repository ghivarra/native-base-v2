import PropTypes from 'prop-types';

const ItemValue = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const PickerItemProps = {
    /**
     * Label for the item.
     */
  label: PropTypes.string.isRequired,
    
    /**
     * Value to be used by the Picker when this item is selected. 
     * Can be a string or an integer.
     */
  value: ItemValue,
    
    /**
     * Color of the item label. 
     * @platform ios
     */
  color: PropTypes.string,

    /**
     * If set to false, the picker item will be disabled, i.e. the user will not be able to 
     * select this item.
     * @platform android
     */
  enabled: PropTypes.bool,

    /**
     * Used to locate this view in end-to-end tests.
     */
  testID: PropTypes.string,
};