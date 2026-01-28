import { Component } from "react";
import PropTypes from "prop-types";

/**
 * React 19–safe NativeBase base component
 * Legacy context completely removed
 */
export default class NativeBaseComponent extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    theme: PropTypes.object
  };

  /**
   * Return theme ONLY from props.
   * If NativeBase root passes it, it works.
   * If not, component must handle missing theme gracefully.
   */
  getTheme() {
    return this.props.theme || null;
  }

  /**
   * Legacy API kept for compatibility.
   * foregroundColor context no longer exists.
   */
  getContextForegroundColor() {
    return undefined;
  }
}
