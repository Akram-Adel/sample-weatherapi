module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@Navigation': './src/Navigation.d.ts',
          '@Theme': './src/Theme',
          '@Atoms': './src/Components/UI/Atoms',
          '@Pages': './src/Components/Pages',
        },
      },
    ],
  ],
};
