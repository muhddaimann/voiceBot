import { useCallback, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export function useScrollDirection() {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const prevOffset = useRef(0);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentOffset = event.nativeEvent.contentOffset.y;
      const diff = currentOffset - prevOffset.current;

      if (currentOffset < 20) return;

      if (Math.abs(diff) < 2) return;

      setDirection(diff > 0 ? "down" : "up");
      prevOffset.current = currentOffset;
    },
    []
  );

  return { direction, onScroll };
}
