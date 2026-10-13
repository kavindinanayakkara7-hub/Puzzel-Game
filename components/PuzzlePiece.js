import React from "react";

import {
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

export default function PuzzlePiece({
  piece,
  position,
  size,
  image,
  selected,
  onPress,
  pieceSize,
}) {
  const originalRow =
    Math.floor(piece / size);

  const originalColumn =
    piece % size;

  const fullSize =
    pieceSize * size;

  return (
    <Pressable
      onPress={() => onPress(position)}
      style={[
        styles.piece,
        {
          width: pieceSize,
          height: pieceSize,
        },
        selected && styles.selected,
      ]}
    >
      <Image
        source={image}
        resizeMode="stretch"
        style={{
          position: "absolute",

          width: fullSize,
          height: fullSize,

          left:
            -originalColumn *
            pieceSize,

          top:
            -originalRow *
            pieceSize,
        }}
      />
    </Pressable>
  );
}

const styles =
  StyleSheet.create({
    piece: {
      overflow: "hidden",
      position: "relative",
      borderWidth: 0.5,
      borderColor:
        "rgba(255,255,255,0.35)",
      backgroundColor: "#111827",
    },

    selected: {
      borderWidth: 3,
      borderColor: "#facc15",
      zIndex: 10,
    },
  });