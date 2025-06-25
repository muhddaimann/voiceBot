import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useHome } from "@/hooks/useHome";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function UpcomingTask() {
  const theme = useTheme();
  const { tasks } = useHome();

  return (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          Upcoming Task
        </Text>
        <TouchableOpacity>
          <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.grid}>
        {tasks.map((task, i) => (
          <View
            key={`task-${i}`}
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <MaterialCommunityIcons
              name={task.icon as any}
              size={wp("6.5%")}
              color={theme.colors.primary}
              style={{ marginBottom: wp("2%") }}
            />
            <Text style={[styles.cardText, { color: theme.colors.onSurface }]}>
              {task.label}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: wp("1.5%"),
    columnGap: wp("2%"),
  },
  card: {
    width: "48%",
    borderRadius: wp("3%"),
    padding: wp("3.5%"),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardText: {
    fontSize: wp("3.8%"),
    fontWeight: "500",
  },
});
