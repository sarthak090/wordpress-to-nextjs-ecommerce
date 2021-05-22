export const addUserDataToLoc = (userData) => {
  const wcUserData = {
    billingAddress: { ...userData },
    email: userData.email,
    wishList: [{}],
  };
  setLoacalStorage("wcUserData", wcUserData);
};

const setLoacalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));
