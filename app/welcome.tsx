import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Welcome() {
  const theme = useTheme();
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.exp),
        useNativeDriver: true,
      }).start(() => {
        router.replace("/(tabs)/a");
      });
    }, 1600);

    return () => clearTimeout(timeout);
  }, [opacity, router]);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View style={{ opacity, alignItems: "center" }}>
        <MaterialCommunityIcons
          name="hand-wave"
          size={wp("20%")}
          color={theme.colors.primary}
          style={styles.icon}
        />
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome back!
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          We’re happy to see you again.
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("6%"),
  },
  icon: {
    marginBottom: wp("4%"),
  },
  title: {
    fontSize: wp("7%"),
    fontWeight: "700",
    marginBottom: wp("2%"),
  },
  subtitle: {
    fontSize: wp("4%"),
    fontWeight: "500",
    textAlign: "center",
  },
});
