const redisClient = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    publish: jest.fn().mockResolvedValue(1),
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
    isOpen: false
  };
  
  export { redisClient };
  