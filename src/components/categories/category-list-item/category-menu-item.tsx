import Link from "next/link";
import { ReactNode } from "react";
// MUI ICON COMPONENTS
import { SvgIconComponent } from "@mui/icons-material";
import ChevronRight from "@mui/icons-material/ChevronRight";
// STYLED COMPONENT
import { Wrapper } from "./styles";

// =============================================================
interface Props {
  href: string;
  title: string;
  caret?: boolean;
  render?: ReactNode;
  icon?: SvgIconComponent;
}
// =============================================================

export default function CategoryListItem(props: Props) {
  const { href, title, render, caret = true, icon: Icon } = props;

  return (
    <></>
  );
}
