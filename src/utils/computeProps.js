import { StyleSheet } from 'react-native';

module.exports = function computeProps(incomingProps = {}, defaultProps = {}) {
  // eslint-disable-next-line no-unused-vars
  const { children, style: incomingStyle, ...rest } = incomingProps;

  const computedProps = {
    ...defaultProps,
    ...rest,
  };

  if (incomingStyle || defaultProps.style) {
    computedProps.style = StyleSheet.flatten([
      defaultProps.style,
      incomingStyle
    ]);
  }

  return computedProps;
};