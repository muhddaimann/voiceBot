import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useHome } from "@/hooks/useHome";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function RecentChat() {
  const theme = useTheme();
  const { dummyChats } = useHome();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Recent Chat
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {dummyChats.map((chat, i) => (
          <View
            key={`chat-${i}`}
            style={[styles.item, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={[styles.itemTitle, { color: theme.colors.onSurface }]}>
              {chat.title}
            </Text>
            <Text style={[styles.itemMessage, { color: theme.colors.outline }]}>
              {chat.message}
            </Text>
            <Text
              style={[
                styles.itemDate,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {chat.date}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: wp("2%"),
  },
  title: {
    fontSize: wp("4.4%"),
    fontWeight: "600",
  },
  seeAll: {
    fontSize: wp("3.5%"),
    fontWeight: "500",
  },
  list: {
    gap: wp("2%"),
  },
  item: {
    borderRadius: wp("3%"),
    padding: wp("3.5%"),
    gap: wp("1.5%"),
  },
  itemTitle: {
    fontSize: wp("3.9%"),
    fontWeight: "600",
  },
  itemMessage: {
    fontSize: wp("3.5%"),
    fontWeight: "400",
  },
  itemDate: {
    fontSize: wp("3.3%"),
    fontWeight: "400",
  },
});
