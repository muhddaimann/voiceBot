import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import ConversationContent from "./conversationContent";
import EventContent from "./eventContent";

type Props = {
  activeMode: "default" | "pulse" | "mic";
};

export default function ChatHandler({ activeMode }: Props) {
  const theme = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [tab, setTab] = useState<"conversation" | "events">("conversation");
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const icon =
    activeMode === "pulse" || activeMode === "mic" ? "pulse" : "gesture-tap";

  const iconColor =
    activeMode === "default" ? theme.colors.outline : theme.colors.primary;

  return (
    <View
      style={[
        styles.wrapper,
        {
          marginTop: activeMode === "default" ? wp("50%") : wp("10%"),
        },
      ]}
    >
      <Animated.View
        style={[styles.iconWrapper, { transform: [{ scale: pulseAnim }] }]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={wp("30%")}
          color={iconColor}
        />
      </Animated.View>

      {activeMode === "default" ? (
        <Text style={[styles.text, { color: theme.colors.outline }]}>
          VAD listens automatically. PTT requires press to speak. Select to
          Start
        </Text>
      ) : (
        <>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                tab === "conversation" && {
                  borderBottomColor: theme.colors.primary,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setTab("conversation")}
            >
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      tab === "conversation"
                        ? theme.colors.primary
                        : theme.colors.outline,
                  },
                ]}
              >
                Conversation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                tab === "events" && {
                  borderBottomColor: theme.colors.primary,
                  borderBottomWidth: 2,
                },
              ]}
              onPress={() => setTab("events")}
            >
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color:
                      tab === "events"
                        ? theme.colors.primary
                        : theme.colors.outline,
                  },
                ]}
              >
                Events
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollRef}
            style={[
              styles.surfaceContent,
              {
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.outline,
              },
            ]}
            contentContainerStyle={{
              paddingVertical: wp("4%"),
              paddingHorizontal: wp("2%"),
            }}
            showsVerticalScrollIndicator={false}
          >
            {tab === "conversation" ? (
              <ConversationContent />
            ) : (
              <EventContent />
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("3%"),
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: wp("4.5%"),
    fontWeight: "500",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp("5%"),
    marginVertical: wp("2%"),
  },
  tab: {
    paddingBottom: wp("1%"),
  },
  tabLabel: {
    fontSize: wp("4%"),
    fontWeight: "500",
  },
  surfaceContent: {
    height: wp("80%"),
    width: "100%",
    borderRadius: wp("2%"),
    borderWidth: 1,
  },
});
