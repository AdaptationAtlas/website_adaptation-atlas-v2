const languages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'fr', title: 'French' },
];

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault)?.id,
};

export { i18n }