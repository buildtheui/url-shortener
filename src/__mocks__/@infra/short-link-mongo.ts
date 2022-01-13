export const ShortLinkMongo = jest.fn().mockImplementation(() => {
  return {
    save: jest.fn(),
    generateShortId: jest.fn().mockImplementation(() => "asdfQWERTY"),
  };
});
