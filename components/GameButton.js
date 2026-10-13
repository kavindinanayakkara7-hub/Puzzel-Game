import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function GameButton({
  title,
  icon,
  type = "primary",
  onPress,
}) {
  const primary =
    type !== "secondary";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,

        primary
          ? styles.primary
          : styles.secondary,

        pressed &&
          styles.pressed,
      ]}
    >
      <Text style={styles.icon}>
        {icon}
      </Text>

      <Text
        style={[
          styles.title,
          primary
            ? styles.primaryText
            : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },

  primary: {
    backgroundColor:
      "#2563eb",
  },

  secondary: {
    backgroundColor:
      "#0f172a",
    borderWidth: 1,
    borderColor:
      "#1e3a5f",
  },

  pressed: {
    opacity: 0.7,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  icon: {
    fontSize: 17,
    marginRight: 7,
  },

  title: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  primaryText: {
    color: "#ffffff",
  },

  secondaryText: {
    color: "#cbd5e1",
  },
});