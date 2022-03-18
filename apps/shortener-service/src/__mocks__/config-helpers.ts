export const ConfigHelpers = jest.fn().mockImplementation(() => {
  return {
    getHostURL: jest.fn().mockImplementation(() => 'http://test.io'),
  };
});
