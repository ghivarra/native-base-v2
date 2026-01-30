import React from "react";
import { Pressable, Platform, View, StyleSheet } from "react-native";

const COLORS = {
  primary: "#3F51B5",
  success: "#4CAF50",
  danger: "#F44336",
  warning: "#FF9800",
  info: "#00BCD4",
  dark: "#222",
  light: "#F4F4F4",
};

const DEFAULTS = {
  minHeight: 48,
  radius: 4,
  radiusRounded: 24,
  paddingH: 16,
  paddingV: 10,
  ripple: "rgba(255,255,255,0.25)",
  activeOpacity: 0.7,
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

function resolveVariant(props) {
  return Object.keys(COLORS).find(k => props[k]);
}

function Button(props) {
  const {
    children,
    style,
    onPress,
    disabled,
    block,
    full,
    rounded,
    bordered,
    transparent,
    small,
    large,
    activeOpacity = DEFAULTS.activeOpacity,
  } = props;

  const variant = resolveVariant(props);
  const bgColor = variant ? COLORS[variant] : COLORS.primary;

  const minHeight = small ? 36 : large ? 56 : DEFAULTS.minHeight;
  const radius = rounded ? DEFAULTS.radiusRounded : DEFAULTS.radius;

  const baseStyle = {
    minHeight,
    borderRadius: radius,
    paddingHorizontal: DEFAULTS.paddingH,
    paddingVertical: small ? 6 : large ? 14 : DEFAULTS.paddingV,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  if (block || full) baseStyle.alignSelf = "stretch";

  if (transparent) {
    baseStyle.backgroundColor = "transparent";
  } else if (bordered) {
    baseStyle.borderWidth = 1;
    baseStyle.borderColor = bgColor;
    baseStyle.backgroundColor = "transparent";
  } else {
    baseStyle.backgroundColor = bgColor;
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={
        Platform.OS === "android" ? { color: DEFAULTS.ripple } : undefined
      }
      style={({ pressed }) => [
        baseStyle,
        pressed && Platform.OS === "ios" && { opacity: activeOpacity },
        style,
      ]}
    >
      <View style={styles.content}>{children}</View>
    </Pressable>
  );
}

Button.displayName = "Button";
export default Button;
