const getRecipientEmail = (users, userLoggedIn) => {
  return users?.find((user) => user !== userLoggedIn?.email);
};

export default getRecipientEmail;
