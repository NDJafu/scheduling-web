import { useState } from "react";

export default function useToggle(defaultValue?: boolean) {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue(!value);

  return { value, toggle };
}
