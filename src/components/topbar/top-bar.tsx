import Link from "next/link";
import { useState } from "react";
// MUI
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import TouchRipple from "@mui/material/ButtonBase";
// TRANSLATION
import { useTranslation } from "react-i18next";
// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import ExpandMore from "@mui/icons-material/ExpandMore";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import BazaarMenu from "components/BazaarMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
// STYLED COMPONENTS
import { StyledContainer, StyledRoot } from "./styles";

// ==============================================================
interface LanguageOption {
  [key: string]: { title: string; value: string };
}
// ==============================================================

// LANGUAGE OPTIONS
const languageOptions: LanguageOption = {
  en: { title: "EN", value: "en" },
  es: { title: "DE", value: "de" }
};

const socialLinks = [
  { id: 1, Icon: Facebook, url: "https://www.facebook.com/eBrandZenica/" },
  { id: 2, Icon: Instagram, url: "https://www.instagram.com/eurobrandcomputers/" },
];

// ===========================================
type Props = { bgColor?: string };
// ===========================================

export default function Topbar({ bgColor }: Props) {
  const { i18n, t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const selectedLanguage = languageOptions[i18n.language];

  return (
    <StyledRoot bgColor={bgColor} expand={expand ? 1 : 0}>
      <StyledContainer>
        <FlexBetween width="100%">
          <FlexBox alignItems="center" gap={1}>
            <Chip
              label={"UPOZORENJE"}
              size="small"
              sx={{
                color: "white",
                fontWeight: 700,
                backgroundColor: "primary.main",
                "& .MuiChip-label": { pl: ".8rem", pr: ".8rem" },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <Span className="title">Web aplikacija je trenutno u izradi, moguće je da trenutni artikli nisu stvarni!</Span>
          </FlexBox>

          <IconButton disableRipple className="expand" onClick={() => setExpand((state) => !state)}>
            {expand ? <Remove /> : <Add />}
          </IconButton>
        </FlexBetween>

        <FlexBox className="topbarRight" alignItems="center">
          {/* SOCIAL LINKS AREA */}
          <FlexBox alignItems="center" gap={1.5}>
            {socialLinks.map(({ id, Icon, url }) => (
              <Link href={url} key={id} target="_blank" rel="noopener noreferrer">
                <Icon sx={{ fontSize: 16 }} />
              </Link>
            ))}
          </FlexBox>
        </FlexBox>
      </StyledContainer>
    </StyledRoot>
  );
}
