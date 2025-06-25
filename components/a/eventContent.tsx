import { useChat } from "@/hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function EventContent() {
  const theme = useTheme();
  const { logs } = useChat();

  const [visibleCount, setVisibleCount] = useState(0);
  const opacityAnim = useRef(logs.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const showNext = (index: number) => {
      if (index >= logs.length) return;
      Animated.timing(opacityAnim[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setVisibleCount((prev) => prev + 1);
          showNext(index + 1);
        }, 1000);
      });
    };
    setTimeout(() => showNext(0), 500);
  }, [logs.length, opacityAnim]);

  return (
    <View style={styles.block}>
      {logs.slice(0, visibleCount).map((log, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.eventLog,
            {
              color: log.text.includes("[server]")
                ? theme.colors.secondary
                : theme.colors.primary,
              opacity: opacityAnim[i],
            },
          ]}
        >
          {log.time} {log.text}
        </Animated.Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: wp("2%"),
  },
  eventLog: {
    fontSize: wp("3.5%"),
    fontStyle: "italic",
  },
});
