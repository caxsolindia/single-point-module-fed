import { ReactNode } from "react";

export interface IconProps {
  id: string;
  icon: ReactNode;
  onClick: () => void;
}
