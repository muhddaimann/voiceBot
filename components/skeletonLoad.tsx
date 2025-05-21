import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function PulsingCard({ style }: { style?: any }) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          opacity,
          shadowColor: theme.colors.onSurface,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 2,
        },
        style,
      ]}
    />
  );
}

export default function SkeletonLoad() {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.row}>
        <PulsingCard style={{ flex: 1 }} />
      </View>

      <View style={styles.row}>
        <PulsingCard style={{ flex: 1 }} />
        <PulsingCard style={{ flex: 1 }} />
      </View>

      <View style={styles.row}>
        <PulsingCard style={{ flex: 1 }} />
        <PulsingCard style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("4%"),
  },
  row: {
    flexDirection: "row",
    gap: wp("2%"),
  },
  card: {
    height: wp("40%"),
    borderRadius: wp("4%"),
  },
});
