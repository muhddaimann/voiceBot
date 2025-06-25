import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UserCard() {
  const theme = useTheme();
  const { voice } = useLocalSearchParams();
  const activeVoice = voice === "VAD" || voice === "PTT" ? voice : undefined;

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
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Chat with AI
        </Text>
        <View
          style={[styles.modePill, { backgroundColor: theme.colors.onSurface }]}
        >
          <Text style={[styles.pillText, { color: theme.colors.surface }]}>
            Voice Mode
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.subtitle, { color: theme.colors.primary }]}>
          Talk freely. I am listening.
        </Text>
        <View style={styles.voicePills}>
          {["VAD", "PTT"].map((mode) => {
            const isActive = activeVoice === mode;
            return (
              <View
                key={mode}
                style={[
                  styles.voicePill,
                  isActive
                    ? { backgroundColor: theme.colors.primary }
                    : {
                        borderWidth: 1,
                        borderColor: theme.colors.primary,
                        backgroundColor: "transparent",
                      },
                ]}
              >
                <Text
                  style={[
                    styles.voiceText,
                    {
                      color: isActive
                        ? theme.colors.onPrimary
                        : theme.colors.primary,
                    },
                  ]}
                >
                  {mode}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: wp("5%"),
    borderBottomLeftRadius: wp("5%"),
    borderBottomRightRadius: wp("5%"),
    marginBottom: wp("3%"),
    gap: wp("1.5%"),
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
  title: {
    fontSize: wp("5%"),
    fontWeight: "600",
  },
  subtitle: {
    fontSize: wp("3.8%"),
    fontWeight: "400",
  },
  modePill: {
    paddingHorizontal: wp("5%"),
    paddingVertical: wp("1%"),
    borderRadius: wp("6%"),
  },
  pillText: {
    fontSize: wp("3.2%"),
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  voicePills: {
    flexDirection: "row",
    gap: wp("1.5%"),
  },
  voicePill: {
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("1%"),
    borderRadius: wp("6%"),
  },
  voiceText: {
    fontSize: wp("3%"),
    fontWeight: "500",
  },
});
