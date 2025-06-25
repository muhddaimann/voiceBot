import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function LayoutA() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.onSurface,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="chatPage"
        options={{
          title: "",
        }}
      />
    </Stack>
  );
}
