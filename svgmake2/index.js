const header = `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.width * settings.block.size +
  (settings.width * settings.block.padding + settings.block.padding)}" height="${settings.height * settings.block.size +
  (settings.height * settings.block.padding + settings.block.padding)}">`;

const footer = `</svg>`;

// Генерация пути для тела змеи
const getSnakePath = (frame) => {
  const snakeBlocks = frame.filter(([type]) => type === 0);
  let d = "";
  snakeBlocks.forEach(([_, x, y]) => {
    const PosX = x * settings.block.size + (x ? x * settings.block.padding : 0);
    const PosY = y * settings.block.size + (y ? y * settings.block.padding : 0);
    const size = settings.block.size;
    d += `M${PosX} ${PosY}H${PosX + size}V${PosY + size}H${PosX}Z `;
  });
  return d.trim() || "M0 0H0V0H0Z";
};

// Генерация анимации тела с дискретным перемещением и остановкой
const getSnakeAnimation = (frames) => {
  const values = frames.map(getSnakePath).join(";");
  const keyTimes = frames.map((_, i) => i / (frames.length - 1)).join(";");
  return `<path d="${values.split(";")[0]}" fill="${settings.colors[0]}">
    <animate attributeName="d" dur="${frames.length * settings.speed}ms" values="${values}" keyTimes="${keyTimes}" calcMode="discrete" fill="freeze" />
  </path>`;
};

const getAppleAnimation = (frames) => {
  const applePositions = frames.map(frame => {
    const apple = frame.find(([type]) => type === 1);
    if (!apple) return [-settings.block.size, -settings.block.size];
    const [_, x, y] = apple;
    return [
      x * settings.block.size + (x ? x * settings.block.padding : 0),
      y * settings.block.size + (y ? y * settings.block.padding : 0)
    ];
  });
  const xValues = applePositions.map(pos => pos[0]).join(";");
  const yValues = applePositions.map(pos => pos[1]).join(";");
  const keyTimes = frames.map((_, i) => i / (frames.length - 1)).join(";");
  return `<rect x="${applePositions[0][0]}" y="${applePositions[0][1]}" width="${settings.block.size}" height="${settings.block.size}" fill="${settings.colors[1]}">
    <animate attributeName="x" dur="${frames.length * settings.speed}ms" values="${xValues}" keyTimes="${keyTimes}" calcMode="discrete" fill="freeze" />
    <animate attributeName="y" dur="${frames.length * settings.speed}ms" values="${yValues}" keyTimes="${keyTimes}" calcMode="discrete" fill="freeze" />
  </rect>`;
};

const make = (frames) => {
  return header + getSnakeAnimation(frames) + getAppleAnimation(frames) + footer;
};