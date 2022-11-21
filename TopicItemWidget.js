//In custom_code/components/TopicItemWidget.js...
import React from "react";
import {View, Text, Image, StyleSheet, Platform} from "react-native";
import {getAvatar} from "@src/utils";
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AppAvatar from "@src/components//AppAvatar";
import {titleTrim} from "@src/utils";
const margin = Platform.OS === "ios" ? 16 : 14;

const TopicItemWidget = ({topic, global, colors, isLast, textColor}) => {

return (
  <AppTouchableOpacity onPress={topic.toSingle}>
   <View
     style={[
       styles.itemInner,
       styles.border,
       {
          borderBottomColor: isLast ? "transparent" : colors.borderColor,
          marginBottom: isLast ? 0 : margin - 1
       }
     ]}
   >
     <AppTouchableOpacity
       onPress={topic.navigateToProfile ? topic.navigateToProfile : () => {}}
       style={styles.itemAvatarWrap}
     >
       <AppAvatar
         size={40}
         name={topic.author.name}
         source={{
           uri: getAvatar(topic.author.avatar, 78)
         }}
         
         style={styles.userAvatar}
       />
         </AppTouchableOpacity>
           <View
             style={{
               flex: 1
             }}
           >
             <Text
               style={[
                 global.itemTitle,
                 textColor && {color: textColor},
                 {marginBottom: 5, marginTop: 2}
               ]}
             >
               {titleTrim(topic.title)}
             </Text>
             <Text
               style={[
                 textColor && {color: textColor},
                 {marginBottom: 5, marginTop: 2}
               ]}
             >
               {topic.shortContent}
             </Text>
             <View style={global.row}>
               <Text style={global.itemMeta}>{topic.author.name}</Text>
               <View style={global.dotSep} />
               <Text style={global.itemMeta}>{topic.voiceCount}</Text>
               <View style={global.dotSep} />
               <Text style={[global.itemMeta, {flexShrink: 1}]} numberOfLines={1}>
                 {topic.replyCount}
               </Text>
             </View>
           </View>
         </View>
       </AppTouchableOpacity>
  );
};

export default TopicItemWidget;

const styles = StyleSheet.create({
	itemInner: {
	  alignItems: "flex-start",
   flexDirection: "row"
 },
 itemAvatarWrap: {
   marginRight: 10,
   marginTop: 3
 },
 border: {
   paddingBottom: margin,
   borderBottomWidth: StyleSheet.hairlineWidth
 },
 userAvatar: {
    borderWidth: "5",
    borderColor: "#23ff56",
    shadowColor: "#23ff56",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
        height: 3,
        width: 3
    }
 }
});
