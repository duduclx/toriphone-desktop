const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

const pickPalette = (name) => {
  if (!name) {
    return colorPalette[0];
  }
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

export default pickPalette
