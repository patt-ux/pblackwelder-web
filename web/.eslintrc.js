module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
  ],
  rules: {
    // Allow anchor tags with href="#" or without href (used as buttons)
    'jsx-a11y/anchor-is-valid': ['warn', {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
      aspects: ['invalidHref', 'preferButton'],
    }],
    // Alternative: disable completely
    // 'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      // You can override rules for specific file patterns
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};

