import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  active: "default" | "pulse" | "mic";
  onSelect: (mode: "default" | "pulse" | "mic") => void;
};

export default function FloatingSelector({ active, onSelect }: Props) {
  const theme = useTheme();
  const router = useRouter();

  const handleExitConfirm = () => {
    Alert.alert("Exit", "Are you sure you want to exit?", [
      { text: "Cancel", style: "cancel" },
      { text: "Exit", style: "destructive", onPress: () => router.back() },
    ]);
  };

  const handleBack = () => {
    if (active === "default") {
      router.back();
    } else {
      handleExitConfirm();
    }
  };

  const handleSelect = (mode: "pulse" | "mic") => {
    onSelect(mode);
    const voice = mode === "pulse" ? "VAD" : "PTT";
    router.setParams({ voice });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <MaterialCommunityIcons
          name={active === "default" ? "chevron-left" : "close"}
          size={wp("7%")}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.pillContainer}>
        <TouchableOpacity
          disabled={active === "mic"}
          onPress={() => handleSelect("pulse")}
          style={[
            styles.pill,
            active === "pulse" && styles.outlinePill,
            active === "pulse"
              ? { borderColor: theme.colors.primary }
              : { backgroundColor: theme.colors.background },
          ]}
        >
          <MaterialCommunityIcons
            name="pulse"
            size={wp("6%")}
            color={
              active === "pulse"
                ? theme.colors.primary
                : active === "mic"
                  ? theme.colors.onSurfaceDisabled
                  : theme.colors.primary
            }
          />
          {active === "default" && (
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              Start
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          disabled={active === "pulse"}
          onPress={() => handleSelect("mic")}
          style={[
            styles.pill,
            active === "mic" && styles.outlinePill,
            active === "mic"
              ? { borderColor: theme.colors.primary }
              : { backgroundColor: theme.colors.background },
          ]}
        >
          <MaterialCommunityIcons
            name="microphone"
            size={wp("6%")}
            color={
              active === "mic"
                ? theme.colors.primary
                : active === "pulse"
                  ? theme.colors.onSurfaceDisabled
                  : theme.colors.primary
            }
          />
          {active === "default" && (
            <Text style={[styles.label, { color: theme.colors.primary }]}>
              PTT
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: wp("15%"),
    left: wp("10%"),
    right: wp("10%"),
    flexDirection: "row",
    alignItems: "center",
    padding: wp("2%"),
    borderRadius: wp("8%"),
  },
  backButton: {
    paddingHorizontal: wp("8%"),
    marginRight: wp("3%"),
  },
  pillContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pill: {
    flex: 1,
    marginHorizontal: wp("1.5%"),
    height: wp("14%"),
    borderRadius: wp("8%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  outlinePill: {
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  label: {
    marginTop: wp("1%"),
    fontSize: wp("3.2%"),
    fontWeight: "500",
  },
});
