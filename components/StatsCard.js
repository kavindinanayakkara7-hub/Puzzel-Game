import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function StatsCard({
  level,
  pieces,
  moves,
  time,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.icon}>
          🎯
        </Text>

        <Text style={styles.value}>
          {level}
        </Text>

        <Text style={styles.label}>
          LEVEL
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text style={styles.icon}>
          🧩
        </Text>

        <Text style={styles.value}>
          {pieces}
        </Text>

        <Text style={styles.label}>
          PIECES
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text style={styles.icon}>
          🔄
        </Text>

        <Text style={styles.value}>
          {moves}
        </Text>

        <Text style={styles.label}>
          MOVES
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text style={styles.icon}>
          ⏱️
        </Text>

        <Text style={styles.value}>
          {time}
        </Text>

        <Text style={styles.label}>
          TIME
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    minHeight: 80,
    backgroundColor:
      "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor:
      "#1e293b",
    marginBottom: 16,
    paddingVertical: 10,
  },

  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    width: 1,
    backgroundColor:
      "#1e293b",
    marginVertical: 8,
  },

  icon: {
    fontSize: 14,
    marginBottom: 3,
  },

  value: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  label: {
    color: "#64748b",
    fontSize: 7,
    fontWeight: "900",
    marginTop: 2,
  },
});