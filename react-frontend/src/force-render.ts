import { useReducer } from "react";

export default function useForceRender() {
  const [_, forceRender] = useReducer((x) => x + 1, 0);
  return forceRender;
}
