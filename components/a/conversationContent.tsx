import { useChat } from "@/hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ConversationContent() {
  const theme = useTheme();
  const { messages } = useChat();

  const [visibleCount, setVisibleCount] = useState(0);
  const opacityAnim = useRef(messages.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const showNext = (index: number) => {
      if (index >= messages.length) return;
      Animated.timing(opacityAnim[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(
          () => {
            setVisibleCount((prev) => prev + 1);
            showNext(index + 1);
          },
          messages[index].from === "user" ? 500 : 1200
        );
      });
    };

    showNext(0);
  }, [messages, opacityAnim]);

  return (
    <View style={styles.container}>
      {messages.slice(0, visibleCount).map((msg, i) => (
        <Animated.View
          key={i}
          style={[
            msg.from === "user" ? styles.bubbleRight : styles.bubbleLeft,
            {
              opacity: opacityAnim[i],
              backgroundColor:
                msg.from === "user"
                  ? theme.colors.primaryContainer
                  : theme.colors.secondaryContainer,
            },
          ]}
        >
          <Text
            style={[
              msg.from === "user" ? styles.textRight : styles.textLeft,
              {
                color:
                  msg.from === "user"
                    ? theme.colors.onPrimaryContainer
                    : theme.colors.onSecondaryContainer,
              },
            ]}
          >
            {msg.text}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("3%"),
  },
  bubbleRight: {
    alignSelf: "flex-end",
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
    borderTopRightRadius: 0,
    maxWidth: "80%",
  },
  bubbleLeft: {
    alignSelf: "flex-start",
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("3%"),
    borderTopLeftRadius: 0,
    maxWidth: "80%",
  },
  textRight: {
    fontSize: wp("4%"),
  },
  textLeft: {
    fontSize: wp("4%"),
  },
});
