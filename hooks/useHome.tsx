import { useMemo } from "react";

export type TaskItem = {
  label: string;
  icon: string;
};

export type ChatItem = {
  title: string;
  message: string;
  date: string;
};

export function useHome() {
  const tasks = useMemo<TaskItem[]>(
    () => [
      { label: "Search by Image", icon: "image-search-outline" },
      { label: "Schedule Meeting", icon: "calendar-clock" },
      { label: "Voice Command", icon: "microphone-outline" },
      { label: "New Feature Review", icon: "star-outline" },
      { label: "Bug Fix Review", icon: "bug-outline" },
      { label: "System Update", icon: "update" },
    ],
    []
  );

  const dummyChats = useMemo<ChatItem[]>(
    () => [
      {
        title: "Debugging API Timeout",
        message:
          "You asked how to solve fetch request timeout in React Native.",
        date: "22 Jun 2025, 9:45 PM",
      },
      {
        title: "Modal Animation Tips",
        message: "We discussed best practices for modal transitions.",
        date: "22 Jun 2025, 4:12 PM",
      },
      {
        title: "SQL Join Optimization",
        message: "Explained how LEFT JOIN differs from INNER JOIN.",
        date: "21 Jun 2025, 8:05 AM",
      },
      {
        title: "Leave Form Duration Logic",
        message: "You wanted to validate if end date is after start date.",
        date: "20 Jun 2025, 10:27 PM",
      },
      {
        title: "DatePicker Redesign",
        message: "Suggested a 2-phase UI with calendar and time selector.",
        date: "19 Jun 2025, 2:38 PM",
      },
    ],
    []
  );

  return { tasks, dummyChats };
}
