export function createPieces(size) {
  const safeSize = Number(size);

  if (
    !Number.isInteger(safeSize) ||
    safeSize < 2
  ) {
    return [];
  }

  const total =
    safeSize * safeSize;

  return Array.from(
    { length: total },
    (_, index) => ({
      id: index,
      correctPosition: index,
      currentPosition: index,
    })
  );
}

export function shufflePieces(pieces) {
  if (!Array.isArray(pieces)) {
    return [];
  }

  const shuffled = [...pieces];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    const temp = shuffled[i];

    shuffled[i] = shuffled[j];

    shuffled[j] = temp;
  }

  return shuffled.map(
    (piece, index) => ({
      ...piece,
      currentPosition: index,
    })
  );
}

export function swapPieces(
  pieces,
  first,
  second
) {
  if (!Array.isArray(pieces)) {
    return [];
  }

  if (
    first < 0 ||
    second < 0 ||
    first >= pieces.length ||
    second >= pieces.length
  ) {
    return pieces;
  }

  const updated = [...pieces];

  const temp = updated[first];

  updated[first] = updated[second];

  updated[second] = temp;

  return updated.map(
    (piece, index) => ({
      ...piece,
      currentPosition: index,
    })
  );
}

export function isPuzzleSolved(pieces) {
  if (!Array.isArray(pieces)) {
    return false;
  }

  if (pieces.length === 0) {
    return false;
  }

  return pieces.every(
    (piece, index) =>
      piece &&
      piece.correctPosition === index
  );
}