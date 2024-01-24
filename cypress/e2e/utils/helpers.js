export const createRandomUser = () => {
  const randomSuffix = Math.random().toString(36).substring(2, 7)
  return {
    username: `testUser${randomSuffix}`,
    email: `test+${randomSuffix}@example.com`,
    password: 'password123',
  }
}
