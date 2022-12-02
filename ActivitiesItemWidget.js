import React from "react";
import {View, StyleSheet, Text} from "react-native";
import AppAvatar from "@src/components/AppAvatar";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {getAvatar} from "@src/utils";
import {dateRenderer, spanRenderer} from "@src/utils/htmlRender";
import {stripActivityTags} from "@src/utils/buddypress";
import HTML from "react-native-render-html";
import ActivityPrivacyButton from "@src/components/Activity/Privacy/ActivityPrivacyButton";

const ActivityHeader = props => {
	const {
		user,
		item,
		global,
		colors,
		tagsStyles,
		attemptDeepLink,
		showAvatar,
		style,
		textColor,
		setItemHeight = () => {},
		onChangePrivacy,
		privacyModalVisible,
		contentWrapperStyle,
		avatarSize,
		hidePrivacy
	} = props;

	const lightText = colors.descLightTextColor;

	let activityContent = item.action;

	let avatarName = item?.user?.name || "";
	if (item?.user?.id === user?.id) avatarName = user.name; // user is unavailable during guest login

	const showPrivacy =
		!hidePrivacy &&
		item.can_edit &&
		(item.type === "activity_update" || item.type === "activity_comment") &&
		item.component !== "groups";

	const onLayout = ({
		nativeEvent: {
			layout: {height}
		}
	}) => {
		setItemHeight(height);
	};

	const tColor = textColor || colors.textColor;

	return (
		<View style={[global.row, styles.header, style]}>
			{showAvatar && (
				<View style={styles.avatarContainer}>
					<AppTouchableOpacity onPress={item.authorClick}>
						<AppAvatar
							userId={item.user.user_id}
							size={avatarSize || 40}
							name={avatarName}
							source={
								item.avatarUrl
									? {uri: getAvatar(item.avatarUrl, 96)}
									: require("@src/assets/img/default/default-member-img.png")
							}
                            style={styles.avatar}
						/>
					</AppTouchableOpacity>
				</View>
			)}
			<View
				onLayout={onLayout}
				style={[
					styles.text,
					{marginLeft: showAvatar ? 10 : 0},
					contentWrapperStyle
				]}
			>
				<HTML
					classesStyles={{"activity-to": {marginHorizontal: 3}}}
					tagsStyles={{
						...tagsStyles,
						rawtext: {
							...global.activityHtmlrawtext,
							color: tColor
						},
						p: {...global.activityHtmlp, color: tColor},
						a: {
							...global.activityHtmla,
							color: tColor,
							textDecorationLine: "none"
						}
					}}
					baseFontStyle={Object.assign(
						{},
						global.activityHtml,
						textColor ? {color: textColor} : {}
					)}
					html={stripActivityTags(activityContent)}
					onLinkPress={attemptDeepLink(false)}
					renderers={{
						a: dateRenderer,
						span: spanRenderer
					}}
				/>

				<Text style={[global.activityDate, {color: lightText, marginTop: 3}]}>
					{item.dateRecorded}
				</Text>
			</View>
			{showPrivacy &&
				!!item.privacy &&
				item.privacy !== "media" && (
					<ActivityPrivacyButton
						privacyModalVisible={privacyModalVisible}
						privacy={item.privacy}
						onPress={onChangePrivacy}
						colors={colors}
						global={global}
						style={{width: 18, height: 13}}
					/>
				)}
		</View>
	);
};

const styles = StyleSheet.create({
	item: {},
	header: {
		alignItems: "flex-start",
		justifyContent: "space-between",
		marginBottom: 11
	},
	text: {
		flex: 1
	},
	avatarContainer: {
		borderWidth: 10,
		borderColor: "#23ff56",
		shadowColor: "#23ff56",
		shadowOpacity: 1,
		shadowRadius: 10,
		shadowOffset: {
			height: 1,
			width: 1
		},
        elevation: 23,
		borderRadius: 30,
		width: 50,
		height: 50,
	},
    avatar: {
        marginTop: 5,
        marginLeft: 5
    }
});

export default ActivityHeader;
