/**
It is used to modify the appearance and structure of the activities widget item of an app page.
@method
@param {?React.ComponentType<ActivitiesItemWidgetComponentProps>} ActivitiesItemWidgetComponent
@example <caption>Use the default widget component and also modify the content display</caption>

//In custom_code/components/ActivitiesItemWidget.js...

* **/

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppAvatar from "@src/components/AppAvatar";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import { getAvatar } from "@src/utils";
import { dateRenderer, spanRenderer } from "@src/utils/htmlRender";
import { stripActivityTags } from "@src/utils/buddypress";
import HTML from "react-native-render-html";
const ActivityHeader = (props) => {
    const {
        user,
        item,
        global,
        colors,
        style,
        textColor,
        setItemHeight = () => { },
        avatarSize,
    } = props;
    const lightText = colors.descLightTextColor;
    let activityContent = item.action;
    //(The following codes are examples only and can be safely removed from the component)
    //Change the display content of the activity item.
    const status = `<span>(User status: verified)</span>`; //Create html element for displaying verified status
    activityContent += status;
    //End
    let avatarName = item?.user?.name || "";
    if (item?.user?.id === user?.id) avatarName = user.name; // user is unavailable during guest login
    const onLayout = ({
        nativeEvent: {
            layout: { height }
        }
    }) => {
        setItemHeight(height);
    };
    const tColor = textColor || colors.textColor;

    return (
        <View style={[global.row, styles.header, style]}>
                <AppTouchableOpacity onPress={item.authorClick} 
                overlayContainerStyle ={styles.userAvatar}>
                    <AppAvatar
                        userId={item.user.user_id}
                        size={avatarSize || 40}
                        name={avatarName}
                        overlayContainerStyle ={styles.userAvatar}
                        source={
                            item.avatarUrl
                                ? { uri: getAvatar(item.avatarUrl, 96) }
                                : require("@src/assets/img/default/default-member-img.png")
                        }
                    />
                </AppTouchableOpacity>
            <View
                onLayout={onLayout}
                style={[
                    styles.text,
                    { marginLeft:  10 },
                ]}
            >
                <HTML
                    classesStyles={{ "activity-to": { marginHorizontal: 3 } }}
                    tagsStyles={{
                        rawtext: {
                            ...global.activityHtmlrawtext,
                            color: tColor
                        },
                        p: { ...global.activityHtmlp, color: tColor },
                        a: {
                            ...global.activityHtmla,
                            color: tColor,
                            textDecorationLine: "none"
                        }
                    }}
                    baseFontStyle={Object.assign(
                        {},
                        global.activityHtml,
                        textColor ? { color: textColor } : {}
                    )}
                    html={stripActivityTags(activityContent)}
                    renderers={{
                        a: dateRenderer,
                        span: spanRenderer
                    }}
                />

                <Text style={[global.activityDate, { color: lightText, marginTop: 3 }]}>
                    {item.dateRecorded}
                </Text>
            </View>
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
    userAvatar: {
        borderWidth: "5",
        borderColor: "#23ff56",
        shadowColor: "#23ff56",
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: {
            height: 0,
            width: 0
        }
    }
});

export default ActivityHeader;