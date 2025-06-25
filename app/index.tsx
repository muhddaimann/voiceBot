import { useAuth } from "@/contexts/authContext";
import { useToast } from "@/hooks/useToast";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
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
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                shadowColor: theme.colors.shadow,
                opacity: fadeAnim,
                transform: [{ translateY }],
              },
            ]}
          >
            <Image
              source={
                theme.dark
                  ? require("@/assets/images/splashDark.png")
                  : require("@/assets/images/splash.png")
              }
              style={styles.image}
            />

            <Text style={[styles.title, { color: theme.colors.onSurface }]}>
              Welcome to VoiceBot
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.outline }]}>
              Sign in with your credentials
            </Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              left={
                <TextInput.Icon
                  icon="account-outline"
                  color={theme.colors.onSurfaceVariant}
                />
              }
              style={styles.textInput}
              contentStyle={styles.textInputContent}
              outlineColor="#ccc"
              activeOutlineColor={theme.colors.primary}
              autoCapitalize="none"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              left={
                <TextInput.Icon
                  icon="lock-outline"
                  color={theme.colors.onSurfaceVariant}
                />
              }
              style={styles.textInput}
              contentStyle={styles.textInputContent}
              outlineColor="#ccc"
              activeOutlineColor={theme.colors.primary}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >
              Sign In
            </Button>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: wp("6%"),
  },
  card: {
    borderRadius: wp("4%"),
    padding: wp("6%"),
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: wp("42%"),
    height: wp("42%"),
    resizeMode: "contain",
    marginBottom: wp("4%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "700",
    marginBottom: wp("1.5%"),
  },
  subtitle: {
    fontSize: wp("3.7%"),
    marginBottom: wp("6%"),
  },
  textInput: {
    width: "100%",
    marginBottom: wp("4%"),
  },
  textInputContent: {
    fontSize: wp("4%"),
    paddingVertical: wp("2%"),
  },
  button: {
    borderRadius: wp("10%"),
    width: "100%",
  },
  buttonContent: {
    paddingVertical: wp("1%"),
  },
  buttonLabel: {
    fontSize: wp("4%"),
    fontWeight: "600",
  },
});
