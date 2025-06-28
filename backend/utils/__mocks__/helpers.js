const actualHelpers = jest.requireActual('../../utils/helpers');

const mockHelpers = {
  ...actualHelpers,
  isProd: () => false,
  signAccessToken: jest.fn(() => 'mockAccessToken'),
  signRefreshToken: jest.fn(() => 'mockRefreshToken'),
};

module.exports = mockHelpers;