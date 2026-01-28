import PropTypes from "prop-types";

const TouchableWithoutFeedbackProps = {
    // The core function to handle a press action
  onPress: PropTypes.func,
    // Invoked when the touch is released, but not if the touch is cancelled
  onPressOut: PropTypes.func, 
    // Invoked when the touch is started
  onPressIn: PropTypes.func,
    // Invoked when a long-press gesture is detected (min 500ms by default)
  onLongPress: PropTypes.func,
    
    // Delay (in ms) before onPressIn is called
  delayPressIn: PropTypes.number,
    // Delay (in ms) before onPressOut is called
  delayPressOut: PropTypes.number,
    // Delay (in ms) before onLongPress is called
  delayLongPress: PropTypes.number,
    
    // If true, disable all interactions for this component.
  disabled: PropTypes.bool,
    
    // Style prop - commonly used. For a full definition, you'd need ViewPropTypes,
    // but a general oneOfType is often used for flexibility in custom components.
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
    
    // Accessibility props (subset)
  accessibilityLabel: PropTypes.string,
  accessibilityHint: PropTypes.string,
  accessibilityRole: PropTypes.string,
    
    // The children to render within the touchable component
  children: PropTypes.node,
};

export const TouchableOpacityProps = {
  ...TouchableWithoutFeedbackProps,
    
    /**
     * Determines what the opacity of the wrapped view should be when touch is active. 
     * Defaults to 0.2 in React Native.
     */
  activeOpacity: PropTypes.number,
    
    // TV props (Apple TV, Android TV)
  hasTVPreferredFocus: PropTypes.bool, // iOS / Apple TV only
  nextFocusDown: PropTypes.number,     // Android TV only
  nextFocusForward: PropTypes.number,  // Android TV only
  nextFocusLeft: PropTypes.number,     // Android TV only
  nextFocusRight: PropTypes.number,    // Android TV only
  nextFocusUp: PropTypes.number,       // Android TV only
    
    // A ref setter
  ref: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};