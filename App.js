import React, { useEffect, useMemo, useState } from "react";

import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./components/Header";
import GameButton from "./components/GameButton";
import LevelCard from "./components/LevelCard";
import StatsCard from "./components/StatsCard";
import PuzzleBoard from "./components/PuzzleBoard";

import { LEVELS } from "./data/levels";

import {
  createPieces,
  shufflePieces,
  swapPieces,
  isPuzzleSolved,
} from "./utils/puzzle";

import { formatTime } from "./utils/timer";

import { generatePuzzleImage } from "./utils/imageGenerator";

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const [unlockedLevel, setUnlockedLevel] = useState(1);

  const [pieces, setPieces] = useState([]);

  const [selectedPiece, setSelectedPiece] = useState(null);

  const [moves, setMoves] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [imageNumber, setImageNumber] = useState(0);

  const level = LEVELS[currentLevel] || LEVELS[0];

  const puzzleSize = Number(level?.size) || 4;

  const puzzleImage = useMemo(() => {
    try {
      return generatePuzzleImage(imageNumber);
    } catch (error) {
      console.log("IMAGE ERROR:", error);
      return null;
    }
  }, [imageNumber]);

  useEffect(() => {
    if (!playing || completed) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, completed]);

  function createPuzzle(size) {
    try {
      const original = createPieces(size);

      const shuffled = shufflePieces(original);

      setPieces(shuffled);
    } catch (error) {
      console.log("CREATE PUZZLE ERROR:", error);
      setPieces([]);
    }
  }

  function startLevel(index) {
    if (index < 0 || index >= LEVELS.length) {
      return;
    }

    if (index + 1 > unlockedLevel) {
      Alert.alert(
        "🔒 Level Locked",
        "Complete the previous level first."
      );

      return;
    }

    const selectedLevel = LEVELS[index];

    const size = Number(selectedLevel?.size) || 4;

    setCurrentLevel(index);
    setSelectedPiece(null);
    setMoves(0);
    setSeconds(0);
    setCompleted(false);

    createPuzzle(size);

    setPlaying(true);
  }

  function selectPiece(position) {
    if (!playing || completed) {
      return;
    }

    if (!Array.isArray(pieces) || pieces.length === 0) {
      return;
    }

    if (selectedPiece === null) {
      setSelectedPiece(position);
      return;
    }

    if (selectedPiece === position) {
      setSelectedPiece(null);
      return;
    }

    const updated = swapPieces(
      pieces,
      selectedPiece,
      position
    );

    setPieces(updated);

    setSelectedPiece(null);

    setMoves((previous) => previous + 1);

    if (isPuzzleSolved(updated)) {
      completeLevel();
    }
  }

  function completeLevel() {
    setCompleted(true);
    setPlaying(false);

    const nextUnlock = currentLevel + 2;

    if (nextUnlock > unlockedLevel) {
      setUnlockedLevel(
        Math.min(nextUnlock, LEVELS.length)
      );
    }
  }

  function shufflePuzzle() {
    if (!playing || completed) {
      return;
    }

    setPieces(shufflePieces(pieces));

    setSelectedPiece(null);

    setMoves((previous) => previous + 1);
  }

  function newImage() {
    if (!playing) {
      return;
    }

    const nextImage =
      (imageNumber + 1) % 4;

    setImageNumber(nextImage);

    setSelectedPiece(null);
    setMoves(0);
    setSeconds(0);
    setCompleted(false);

    createPuzzle(puzzleSize);

    setPlaying(true);
  }

  function nextLevel() {
    const next = currentLevel + 1;

    if (
      next < LEVELS.length &&
      next + 1 <= unlockedLevel
    ) {
      startLevel(next);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#020617"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Header
          title="Image Puzzle"
          subtitle="Complete the picture and level up!"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            SELECT LEVEL
          </Text>

          <View style={styles.levelRow}>
            {LEVELS.map((item, index) => (
              <LevelCard
                key={item.id}
                level={item}
                active={
                  index === currentLevel &&
                  playing
                }
                locked={
                  index + 1 > unlockedLevel
                }
                onPress={() =>
                  startLevel(index)
                }
              />
            ))}
          </View>
        </View>

        {playing && (
          <StatsCard
            level={currentLevel + 1}
            pieces={puzzleSize * puzzleSize}
            moves={moves}
            time={formatTime(seconds)}
          />
        )}

        {playing && (
          <View style={styles.gameSection}>
            <Text style={styles.sectionTitle}>
              {level.name} PUZZLE
            </Text>

            <Text style={styles.instruction}>
              Tap two pieces to swap
              their positions
            </Text>

            <PuzzleBoard
              size={puzzleSize}
              pieces={pieces}
              image={puzzleImage}
              selectedPiece={selectedPiece}
              onPiecePress={selectPiece}
            />
          </View>
        )}

        {playing && (
          <View style={styles.controls}>
            <View style={styles.controlButton}>
              <GameButton
                title="SHUFFLE"
                icon="🔀"
                type="secondary"
                onPress={shufflePuzzle}
              />
            </View>

            <View style={styles.controlButton}>
              <GameButton
                title="NEW IMAGE"
                icon="🖼️"
                type="secondary"
                onPress={newImage}
              />
            </View>
          </View>
        )}

        {!playing && !completed && (
          <View style={styles.startCard}>
            <Text style={styles.startEmoji}>
              🧩
            </Text>

            <Text style={styles.startTitle}>
              Ready to Puzzle?
            </Text>

            <Text style={styles.startText}>
              Start with 4×4 and unlock
              harder levels.
            </Text>

            <GameButton
              title="START PUZZLE"
              icon="🚀"
              onPress={() =>
                startLevel(currentLevel)
              }
            />
          </View>
        )}

        {completed && (
          <View style={styles.completeCard}>
            <Text style={styles.trophy}>
              🏆
            </Text>

            <Text style={styles.completeTitle}>
              PUZZLE COMPLETE!
            </Text>

            <Text style={styles.completeText}>
              Excellent work!
            </Text>

            <View style={styles.results}>
              <View style={styles.result}>
                <Text style={styles.resultValue}>
                  {moves}
                </Text>

                <Text style={styles.resultLabel}>
                  MOVES
                </Text>
              </View>

              <View style={styles.result}>
                <Text style={styles.resultValue}>
                  {formatTime(seconds)}
                </Text>

                <Text style={styles.resultLabel}>
                  TIME
                </Text>
              </View>
            </View>

            {currentLevel <
            LEVELS.length - 1 ? (
              <GameButton
                title="NEXT LEVEL"
                icon="🚀"
                onPress={nextLevel}
              />
            ) : (
              <Text style={styles.allComplete}>
                👑 ALL LEVELS{"\n"}
                COMPLETE!
              </Text>
            )}

            <View style={{ height: 10 }} />

            <GameButton
              title="PLAY AGAIN"
              icon="🔄"
              type="secondary"
              onPress={() =>
                startLevel(currentLevel)
              }
            />
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            🧩 PUZZLE QUEST
          </Text>

          <Text style={styles.footerText}>
            4×4 • 8×8 • 16×16
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#020617",
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 40,
    backgroundColor: "#020617",
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: "center",
  },

  levelRow: {
    flexDirection: "row",
    width: "100%",
  },

  gameSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },

  instruction: {
    color: "#64748b",
    fontSize: 10,
    marginBottom: 12,
    textAlign: "center",
  },

  controls: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
  },

  controlButton: {
    flex: 1,
    marginHorizontal: 3,
  },

  startCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e3a5f",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginTop: 10,
  },

  startEmoji: {
    fontSize: 55,
    marginBottom: 10,
  },

  startTitle: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
  },

  startText: {
    color: "#64748b",
    fontSize: 12,
    textAlign: "center",
    marginTop: 7,
    marginBottom: 15,
    lineHeight: 19,
  },

  completeCard: {
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#2563eb",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginTop: 10,
  },

  trophy: {
    fontSize: 60,
  },

  completeTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 5,
  },

  completeText: {
    color: "#60a5fa",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 18,
  },

  results: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,
  },

  result: {
    flex: 1,
    alignItems: "center",
  },

  resultValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  resultLabel: {
    color: "#64748b",
    fontSize: 8,
    fontWeight: "900",
    marginTop: 3,
    letterSpacing: 1,
  },

  allComplete: {
    color: "#facc15",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 12,
    textAlign: "center",
  },

  footer: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
  },

  footerTitle: {
    color: "#475569",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.5,
  },

  footerText: {
    color: "#334155",
    fontSize: 8,
    marginTop: 4,
  },
});