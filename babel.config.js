module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        alias: {
          '@Navigation': './src/Navigation.d.ts',
          '@Theme': './src/Theme',
          '@API': './src/API',
          '@Atoms': './src/Components/UI/Atoms',
          '@Molecules': './src/Components/UI/Molecules',
          '@Pages': './src/Components/Pages',
        },
      },
    ],
  ],
};
