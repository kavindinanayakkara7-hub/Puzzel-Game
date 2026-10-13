import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Header({
  title,
  subtitle,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        🧩
      </Text>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 8,
  },

  logo: {
    fontSize: 38,
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
  },

  subtitle: {
    color: "#64748b",
    fontSize: 11,
    marginTop: 3,
  },
});