import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LevelCard({
  level,
  active,
  locked,
  onPress,
}) {
  const size =
    Number(level?.size) || 4;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,

        active &&
          styles.activeCard,

        locked &&
          styles.lockedCard,

        pressed &&
          styles.pressed,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>
          {locked ? "🔒" : "🧩"}
        </Text>
      </View>

      <Text style={styles.name}>
        {level?.name || "LEVEL"}
      </Text>

      <Text style={styles.size}>
        {size}×{size}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 95,
    marginHorizontal: 3,
    paddingVertical: 10,
    paddingHorizontal: 3,
    borderRadius: 14,
    backgroundColor:
      "#0f172a",
    borderWidth: 1,
    borderColor:
      "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },

  activeCard: {
    backgroundColor:
      "#172554",
    borderColor:
      "#3b82f6",
    borderWidth: 2,
  },

  lockedCard: {
    opacity: 0.45,
  },

  pressed: {
    transform: [
      {
        scale: 0.96,
      },
    ],
  },

  iconContainer: {
    marginBottom: 4,
  },

  icon: {
    fontSize: 20,
  },

  name: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "900",
  },

  size: {
    color: "#60a5fa",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 3,
  },
});