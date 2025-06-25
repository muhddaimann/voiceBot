import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.avatar}
        />
        <View style={styles.actions}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="chat-outline"
              size={wp("5.8%")}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={wp("5.8%")}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textBlock}>
        <Text style={[styles.greeting, { color: theme.colors.onSurface }]}>
          Welcome back, Alfred
        </Text>
        <Text style={[styles.subtext, { color: theme.colors.primary }]}>
          Let’s make today productive.
        </Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          placeholderTextColor={theme.colors.outline}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.background,
              color: theme.colors.onBackground,
            },
          ]}
          outlineStyle={{ borderRadius: wp("6%") }}
          activeOutlineColor={theme.colors.primary}
          left={<TextInput.Icon icon="magnify" color={theme.colors.outline} />}
        />
        <TouchableOpacity
          style={[styles.aiBtn, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push("/(tabs)/a/chatPage")}
        >
          <Text style={[styles.aiBtnText, { color: theme.colors.onPrimary }]}>
            Chat with AI
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderBottomLeftRadius: wp("6%"),
    borderBottomRightRadius: wp("6%"),
    padding: wp("5%"),
    paddingBottom: wp("7%"),
    marginBottom: wp("4%"),
    gap: wp("6%"),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("4.5%"),
  },
  actions: {
    flexDirection: "row",
    gap: wp("3%"),
  },
  textBlock: {
    gap: wp("1%"),
  },
  greeting: {
    fontSize: wp("4.6%"),
    fontWeight: "600",
  },
  subtext: {
    fontSize: wp("3.6%"),
    fontWeight: "400",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  input: {
    flex: 1,
    height: wp("12%"),
    fontSize: wp("3.6%"),
    paddingHorizontal: wp("4%"),
    justifyContent: "center",
  },
  aiBtn: {
    paddingVertical: wp("4%"),
    paddingHorizontal: wp("4.5%"),
    borderRadius: wp("6%"),
    justifyContent: "center",
    alignItems: "center",
  },
  aiBtnText: {
    fontSize: wp("4%"),
    fontWeight: "500",
  },
});
