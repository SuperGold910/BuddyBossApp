
// import AvatarImageUpload from "@src/components/AvatarImageUpload"




// export const applyCustomCode = (externalCodeSetup) => {
// 	const UserAvatar = (props) => {
// 		return (
// 			<>
// 				<Text>Tap avatar to edit</Text>
// 				<AvatarImageUpload
// 					isOwnAccount={props.isOwnAccount}
// 					user={props.user}
// 					size={100}
// 					imagePickerProps={{ cropping: true, cropperCircleOverlay: true }}
// 					style={{
// 						borderWidth: "2",
// 						borderColor: "#23ff56",
// 						shadowColor: "#23ff56",
// 						shadowOpacity: 0.8,
// 						shadowRadius: 2,
// 						shadowOffset: {
// 							height: 1,
// 							width: 1
// 						}
// 					}}
// 				/>
// 			</>
// 		)
// 	}
// 	externalCodeSetup.profileScreenHooksApi.setUserAvatar(UserAvatar);

// 	externalCodeSetup.cssApi.addGlobalStyle("itemAvatar", {
// 		marginRight: 10,
// 		width: 32,
// 		height: 32,
// 		borderRadius: 15,
// 		backgroundColor: "transparent",
// 		borderWidth: "2",
// 		borderColor: "#23ff56",
// 		shadowColor: "#23ff56",
// 		shadowOpacity: 0.8,
// 		shadowRadius: 2,
// 		shadowOffset: {
// 			height: 1,
// 			width: 1
// 		}
// 	});
// };

import TopicItemWidget from "./TopicItemWidget"
export const applyCustomCode = externalCodeSetup => {

 externalCodeSetup.appPagesHooksApi.setTopicItemWidgetComponent((props) => {
   return <TopicItemWidget {...props} />
 });
}