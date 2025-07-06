import { ReactNode } from "react";

export interface ModalType {
  modal: ReactNode;
  container?: React.ElementType;
  isDimClick?: boolean;
  containerType?: "default" | "bottom" | "center";
  maxWidth?: string;
}
