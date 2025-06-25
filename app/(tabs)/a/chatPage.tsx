import ChatHandler from "@/components/a/chatHandler";
import ActionBar from "@/components/a/actionBar";
import UserCard from "@/components/a/userCardd";
import TopFAB from "@/components/topFAB";
import { useTabVisibility } from "@/contexts/bottomContext";
import { useScrollDirection } from "@/hooks/useBottomNav";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ChatPage() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const { setHideTabBar } = useTabVisibility();
  const { onScroll } = useScrollDirection();
  const [showFab, setShowFab] = useState(false);
  const [activeMode, setActiveMode] = useState<"default" | "pulse" | "mic">(
    "default"
  );

  useEffect(() => {
    setHideTabBar(true);
    return () => setHideTabBar(false);
  }, [setHideTabBar]);

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowFab(y > wp("25%"));
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          onScroll(e);
          handleScroll(e);
        }}
        scrollEventThrottle={16}
      >
        <UserCard />
        <View style={styles.body}>
          <ChatHandler activeMode={activeMode} />
        </View>
      </ScrollView>

      <ActionBar active={activeMode} onSelect={setActiveMode} />

      <TopFAB visible={showFab} scrollRef={scrollRef} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: wp("35%"),
  },
  body: {
    width: "100%",
    paddingHorizontal: wp("6%"),
    alignItems: "center",
    gap: wp("4%"),
  },
});
