export default {
  transform: {
    "^.+\\.jsx?$": ["babel-jest", { 
      presets: [["@babel/preset-env", { targets: { node: "current" } }]] 
    }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!nom-de-votre-module-esm)" // Incluez les modules ESM si nécessaire
  ],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
};