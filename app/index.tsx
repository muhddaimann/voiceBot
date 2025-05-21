import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/hooks/useToast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      showToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }
    try {
      await login(username, password);
    } catch {
      showToast({ message: "Invalid username or password.", type: "error" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.surface }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="login"
              size={wp("18%")}
              color={theme.colors.primary}
              style={styles.icon}
            />

            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Welcome
            </Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >
              Login
            </Button>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("6%"),
    backgroundColor: "transparent",
  },
  content: {
    alignItems: "center",
  },
  icon: {
    marginBottom: wp("4%"),
  },
  title: {
    fontSize: wp("5.2%"),
    fontWeight: "500",
    marginBottom: wp("5%"),
  },
  input: {
    width: "100%",
    marginBottom: wp("3.5%"),
  },
  button: {
    borderRadius: wp("10%"),
    marginTop: wp("2%"),
    width: "100%",
  },
  buttonContent: {
    paddingVertical: wp("2%"),
  },
  buttonLabel: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
