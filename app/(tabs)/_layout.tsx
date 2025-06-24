import AnimatedTabBar from "@/components/bottomNav";
import { TabVisibilityProvider } from "@/contexts/bottomContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

function TabLayoutInner() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.surface }}
      edges={["top", "left", "right"]}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: { fontSize: wp("3.2%") },
        }}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tabs.Screen
          name="a"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="microphone-outline"
                color={color}
                size={wp("6.5%")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="b"
          options={{
            title: "History",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="history"
                color={color}
                size={wp("6.5%")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="c"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="clipboard-check-outline"
                color={color}
                size={wp("6.5%")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="d"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="cog-outline"
                color={color}
                size={wp("6.5%")}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

export default function TabLayout() {
  return (
    <TabVisibilityProvider>
      <TabLayoutInner />
    </TabVisibilityProvider>
  );
}
