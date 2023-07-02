const createTokenUser = (user) => {
  const { email, name, _id: userId, role } = user;
  return { email, name, userId, role };
};

export default createTokenUser;
