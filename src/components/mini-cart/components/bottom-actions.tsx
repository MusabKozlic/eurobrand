import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// ==============================================================
interface Props {
  total: string;
  handleNavigate: (path: string) => () => void;
}
// ==============================================================

export default function BottomActions({ total, handleNavigate }: Props) {
  return (
    <Box p={2.5}>
      <div style={{ height: 40, paddingTop: "5%", paddingLeft: "1%", fontWeight: 600, cursor: "default"}} >Ukupno: {total}KM</div>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        sx={{ height: 40 }}
        onClick={handleNavigate("/cart")}>
        Pogledaj korpu
      </Button>
    </Box>
  );
}
