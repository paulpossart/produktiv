const bcrypt = {
  compare: jest.fn(),
  hash: jest.fn(async () => 'mock_hash_value')
};

module.exports = bcrypt;
