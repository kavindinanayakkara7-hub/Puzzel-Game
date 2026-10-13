const puzzleImages = [
  require("../assets/images/space.png"),
  require("../assets/images/jungle.png"),
  require("../assets/images/galaxy.png"),
  require("../assets/images/fire.png"),
  require("../assets/images/ocean.png"),
  require("../assets/images/blossom.png"),
];

export function generatePuzzleImage(index = 0) {
  const safeIndex =
    Math.abs(Number(index) || 0) %
    puzzleImages.length;

  return puzzleImages[safeIndex];
}