import { useMemo } from "react";

export function useChat() {
  const messages = useMemo(
    () => [
      { from: "user", text: "Hello" },
      { from: "ai", text: "Hi there, how can I help you today?" },
      { from: "user", text: "Can you explain how to reset my password?" },
      {
        from: "ai",
        text: "Sure. Go to the Settings page, tap on “Account”, then choose “Change Password”.",
      },
      {
        from: "user",
        text: "Got it. Is there a way to receive alerts if someone tries to log in?",
      },
      {
        from: "ai",
        text: "Yes. Enable “Login Notifications” under Security Settings. You’ll be notified instantly.",
      },
      { from: "user", text: "Hello" },
      { from: "ai", text: "Hi there, how can I help you today?" },
      { from: "user", text: "Can you explain how to reset my password?" },
      {
        from: "ai",
        text: "Sure. Go to the Settings page, tap on “Account”, then choose “Change Password”.",
      },
      {
        from: "user",
        text: "Got it. Is there a way to receive alerts if someone tries to log in?",
      },
      {
        from: "ai",
        text: "Yes. Enable “Login Notifications” under Security Settings. You’ll be notified instantly.",
      },
      { from: "user", text: "Hello" },
      { from: "ai", text: "Hi there, how can I help you today?" },
      { from: "user", text: "Can you explain how to reset my password?" },
      {
        from: "ai",
        text: "Sure. Go to the Settings page, tap on “Account”, then choose “Change Password”.",
      },
      {
        from: "user",
        text: "Got it. Is there a way to receive alerts if someone tries to log in?",
      },
      {
        from: "ai",
        text: "Yes. Enable “Login Notifications” under Security Settings. You’ll be notified instantly.",
      },
    ],
    []
  );

  const logs = useMemo(
    () => [
      { text: "[client] voice stream started", time: "00.00.03s" },
      { text: "[server] response received", time: "00.00.04s" },
      { text: "[server] processing...", time: "00.00.05s" },
    ],
    []
  );

  return {
    messages,
    logs,
  };
}
