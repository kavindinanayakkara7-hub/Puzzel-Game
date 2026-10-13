import React from "react";

import {
  Image,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

export default function PuzzleBoard({
  size,
  pieces,
  image,
  selectedPiece,
  onPiecePress,
}) {
  const { width } =
    useWindowDimensions();

  const safeSize =
    Number.isInteger(
      Number(size)
    ) &&
    Number(size) >= 2
      ? Number(size)
      : 4;

  const boardSize =
    Math.min(
      width - 28,
      390
    );

  const tileSize =
    boardSize / safeSize;

  if (
    !Array.isArray(pieces) ||
    pieces.length === 0
  ) {
    return null;
  }

  return (
    <View
      style={[
        styles.board,
        {
          width: boardSize,
          height: boardSize,
        },
      ]}
    >
      {pieces.map(
        (piece, index) => {
          if (!piece) {
            return null;
          }

          /*
            IMPORTANT:

            piece.correctPosition tells
            us which part of image this
            piece belongs to.
          */

          const correctPosition =
            Number.isInteger(
              piece.correctPosition
            )
              ? piece.correctPosition
              : index;

          const correctRow =
            Math.floor(
              correctPosition /
                safeSize
            );

          const correctColumn =
            correctPosition %
            safeSize;

          /*
            Current position
            */

          const currentRow =
            Math.floor(
              index / safeSize
            );

          const currentColumn =
            index % safeSize;

          const selected =
            selectedPiece === index;

          /*
            Position of tile on board
            */

          const left =
            currentColumn *
            tileSize;

          const top =
            currentRow *
            tileSize;

          /*
            Position of image
            inside tile
          */

          const imageLeft =
            -correctColumn *
            tileSize;

          const imageTop =
            -correctRow *
            tileSize;

          return (
            <Pressable
              key={
                `piece-${
                  piece.id ?? index
                }`
              }
              onPress={() =>
                onPiecePress(index)
              }
              style={[
                styles.tile,
                {
                  width: tileSize,
                  height: tileSize,
                  left,
                  top,
                  borderWidth:
                    selected
                      ? 3
                      : 0.5,
                  borderColor:
                    selected
                      ? "#facc15"
                      : "#020617",
                  zIndex:
                    selected
                      ? 10
                      : 1,
                },
              ]}
            >
              {image && (
                <Image
                  source={image}
                  resizeMode="stretch"
                  style={{
                    position:
                      "absolute",

                    width:
                      boardSize,

                    height:
                      boardSize,

                    left:
                      imageLeft,

                    top:
                      imageTop,
                  }}
                />
              )}

              {selected && (
                <View
                  style={
                    styles.selectedOverlay
                  }
                />
              )}
            </Pressable>
          );
        }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    position: "relative",
    backgroundColor:
      "#0f172a",
    overflow: "hidden",
    borderRadius: 12,
    borderWidth: 2,
    borderColor:
      "#1e3a5f",
  },

  tile: {
    position: "absolute",
    overflow: "hidden",
    backgroundColor:
      "#0f172a",
  },

  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor:
      "rgba(250,204,21,0.20)",
  },
});