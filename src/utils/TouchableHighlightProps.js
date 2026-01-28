import PropTypes from 'prop-types';

const stylePropType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array,
]);

// This definition combines the essential props from TouchableWithoutFeedback (which 
// TouchableHighlight inherits from) and its own specific props.

export const TouchableHighlightProps = {
    // --- Inherited from TouchableWithoutFeedback Props ---
    
    // The core function to handle a press action
  onPress: PropTypes.func,
    // Invoked when the touch is released, but not if the touch is cancelled
  onPressOut: PropTypes.func, 
    // Invoked when the touch is started
  onPressIn: PropTypes.func,
    // Invoked when a long-press gesture is detected
  onLongPress: PropTypes.func,
    
    // Delay (in ms) before onPressIn is called
  delayPressIn: PropTypes.number,
    // Delay (in ms) before onPressOut is called
  delayPressOut: PropTypes.number,
    // Delay (in ms) before onLongPress is called
  delayLongPress: PropTypes.number,
    
    // If true, disable all interactions for this component.
  disabled: PropTypes.bool,
    
    // Style prop for the container View (approximation of ViewPropTypes)
  style: stylePropType,
    
    // The children to render within the touchable component
  children: PropTypes.node,


    // --- TouchableHighlight Specific Props ---

    /**
     * Determines what the opacity of the wrapped view should be when touch is active.
     */
  activeOpacity: PropTypes.number,
    
    /**
     * The color of the underlay that will show through when the touch is active.
     */
  underlayColor: PropTypes.string,
    
    /**
     * Called immediately after the underlay is shown.
     */
  onShowUnderlay: PropTypes.func,
    
    /**
     * Called immediately after the underlay is hidden.
     */
  onHideUnderlay: PropTypes.func,
    
    /**
     * Duration (in ms) for the fading animation of the underlay.
     */
  tvParallaxProperties: PropTypes.object,
};