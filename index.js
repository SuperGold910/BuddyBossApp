export const applyCustomCode = (externalCodeSetup: any) => {
	externalCodeSetup.cssApi.addGlobalStyle("itemAvatar" ,{
		marginRight: 10,
		width: 32,
		height: 32,
		borderRadius: 15,
		backgroundColor: "transparent",
		borderWidth: "2",
		borderColor: "#23ff56",
		shadowColor: "#23ff56",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
		height: 1,
		width: 1
		}
	});
};