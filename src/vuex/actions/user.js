export const setUserInfo = (store, userInfo) => {
	console.log("actions....setUserInfo", userInfo);
	store.commit('SETUSERINFO', userInfo);
};
