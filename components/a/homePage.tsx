import { ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import RecentChat from "./recentChat";
import UpcomingTask from "./upcomingTask";

export default function HomePage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UpcomingTask />
      <RecentChat />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: wp("5%"),
  },
});
