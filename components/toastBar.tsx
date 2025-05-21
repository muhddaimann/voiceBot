import { useToast } from "@/hooks/useToast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ToastBar() {
  const { toast, hideToast } = useToast();
  const theme = useTheme();
  const isDark = theme.dark;

  const translate = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.timing(translate, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translate, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(hideToast);
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, hideToast]);

  if (!toast) return null;

  const toastPalette = {
    success: {
      light: { bg: "rgba(109, 152, 134, 0.7)", fg: "#FFFFFF" },
      dark: { bg: "rgba(109, 152, 134, 0.7)", fg: "#FFFFFF" },
    },
    error: {
      light: { bg: "rgba(209, 67, 67, 0.7)", fg: "#FFFFFF" },
      dark: { bg: "rgba(179, 92, 92, 0.7)", fg: "#FFFFFF" },
    },
    info: {
      light: { bg: "rgba(91, 95, 151, 0.7)", fg: "#FFFFFF" },
      dark: { bg: "rgba(174, 176, 229, 0.7)", fg: "#23264C" },
    },
    custom: {
      light: { bg: "rgba(226, 228, 236, 0.7)", fg: "#333333" },
      dark: { bg: "rgba(56, 58, 70, 0.7)", fg: "#D4D6E2" },
    },
  };

  const toastType = toast?.type ?? "custom";
  const current =
    toastPalette[toastType as keyof typeof toastPalette][
      isDark ? "dark" : "light"
    ];

  const getIconName = () => {
    switch (toast.type) {
      case "success":
        return "check-circle";
      case "error":
        return "alert-circle";
      case "info":
        return "information";
      default:
        return "bell";
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: current.bg,
          transform: [{ translateY: translate }],
          opacity,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={getIconName()}
          size={hp("2.2%")}
          color={current.fg}
        />
      </View>
      <Text style={[styles.text, { color: current.fg }]}>{toast.message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: hp("6.4%"),
    paddingBottom: hp("1.5%"),
    paddingHorizontal: hp("2%"),
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: wp("1%"),
    borderBottomRightRadius: wp("1%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 6,
  },
  icon: {
    marginRight: wp("2.5%"),
  },
  text: {
    fontSize: hp("1.5%"),
    fontWeight: "500",
    flex: 1,
  },
});
