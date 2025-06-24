import { useTabVisibility } from "@/contexts/bottomContext";
import { useEffect, useRef } from "react";
import { Animated, Easing, Platform, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function TabItem({ route, navigation, descriptors, isFocused }: any) {
  const theme = useTheme();
  const { options } = descriptors[route.key];
  const Icon = options.tabBarIcon;
  const label = options.title || route.name;
  const labelOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const labelTranslate = useRef(new Animated.Value(isFocused ? 0 : 10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(labelOpacity, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(labelTranslate, {
        toValue: isFocused ? 0 : 10,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, labelOpacity, labelTranslate]);

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View key={route.key} style={{ alignItems: "center" }} onTouchEnd={onPress}>
      {Icon &&
        Icon({
          color: isFocused ? theme.colors.primary : theme.colors.outline,
          size: wp("10%"),
        })}
      <Animated.Text
        style={{
          fontSize: wp("3%"),
          fontWeight: "500",
          color: theme.colors.primary,
          opacity: labelOpacity,
          transform: [{ translateY: labelTranslate }],
          marginTop: wp("1%"),
        }}
        numberOfLines={1}
      >
        {label}
      </Animated.Text>
    </View>
  );
}

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: any) {
  const theme = useTheme();
  const { hideTabBar } = useTabVisibility();

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: hideTabBar ? 0 : 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [hideTabBar, opacity]);

  return (
    <Animated.View
      style={{
        opacity,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.surface,
        height: wp("22%"),
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? wp("4%") : wp("2%"),
        paddingHorizontal: wp("4%"),
        paddingBottom: wp("8%"),
        zIndex: 100,
      }}
    >
      {state.routes.map((route: any, index: number) => (
        <TabItem
          key={route.key}
          route={route}
          index={index}
          navigation={navigation}
          descriptors={descriptors}
          isFocused={state.index === index}
        />
      ))}
    </Animated.View>
  );
}
