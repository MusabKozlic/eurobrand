import { SyntheticEvent, useEffect, useState } from "react";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import Fade from "@mui/material/Fade";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";
import { SvgIconProps } from "@mui/material/SvgIcon";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Notifications from "@mui/icons-material/Notifications";
import { formatDistance } from "date-fns";
// CUSTOM ICON COMPONENTS
import CartX from "icons/CartX";
import CartCheck from "icons/CartCheck";
import TruckFast from "icons/TruckFast";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { H6, Paragraph } from "components/Typography";
import OrderDetails from "models/OrderDetails.model";
import axios from "axios";
import { Icon, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

// styled components
const StyledTabList = styled(TabList)(({ theme }) => ({
  "& .MuiTab-root": { textTransform: "capitalize" },
  "& .MuiTab-root.Mui-selected": { color: theme.palette.info.main },
  "& .MuiTabs-indicator": { backgroundColor: theme.palette.info.main }
}));

const StyledTab = styled(Tab)({
  width: "50%",
  marginLeft: 0,
  marginRight: 0
});

const ListItemWrapper = styled(FlexBox)(({ theme }) => ({
  cursor: "pointer",
  borderBottom: `1px solid ${theme.palette.info[100]}`,
  ":hover": { backgroundColor: theme.palette.info[100] },
  ":last-of-type": { borderBottom: 0 }
}));

export default function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [anchorEl, setAnchorEl] = useState(null);
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const router = useRouter();

  const url =
  process.env.NODE_ENV === "production"
    ? "https://www.eurobrand.ba/api"
    : "http://localhost:8080";


  const handleFetch = async () => {
    const orders: OrderDetails[] = (await axios.get(`${url}/orders/newOrders`)).data;

    setOrders(orders);
  }

  const handleRedirectToOrder = async (orderId: number) => {
    setOpen(false);
    await axios.put(`${url}/orders/markSeen/${orderId}`);
    router.push(`/admin/orders/${orderId}`);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  const handleClick = (event) => {
    setOpen((state) => !state);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleTabChange = (_: SyntheticEvent, value: string) => {
    setTabValue(value);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton onClick={handleClick}>
          <Badge color="secondary" variant="standard" badgeContent={orders.length}>
            <Notifications sx={{ color: "grey.500" }} />
          </Badge>
        </IconButton>

        <Popper
          transition
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          sx={{
            zIndex: 11111,
            maxWidth: 300,
            minWidth: 300,
            width: "100%",
            top: "10px !important",
            boxShadow: 2,
            "&:before": {
              top: 0,
              right: 14,
              zIndex: 0,
              width: 10,
              height: 10,
              content: '""',
              display: "block",
              position: "absolute",
              borderTop: "1px solid",
              borderLeft: "1px solid",
              borderColor: "grey.200",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)"
            }
          }}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={150}>
              <Paper>
                <TabContext value={tabValue}>
                  <StyledTabList onChange={handleTabChange}>
                    <StyledTab disableRipple value="1" label={`Notifications`} />
                  </StyledTabList>

                  {orders.length === 0 ? (
                    <Paragraph fontWeight="500" textAlign="center" p={2}>
                      There are no notifications
                    </Paragraph>
                  ) : (
                    <TabPanel value="1" sx={{ p: 0 }}>
                      {orders.map((order) => (
                        <ListItem
                          key={order.id}
                          id={order.id}
                          firstName={order.firstName}
                          lastName={order.lastName}
                          timestamp={order.timestamp}
                          price={order.totalPrice}
                          handleClick={handleRedirectToOrder}
                        />
                      ))}
                    </TabPanel>
                  )}
                </TabContext>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
}

// ListItem component props
type ListItemProps = {
  id: number;
  firstName: string;
  lastName: string;
  timestamp: Date;
  price: number;
  handleClick: (orderId: number) => Promise<void>;
};

function ListItem(props: ListItemProps) {
  const { id, firstName, lastName, timestamp, price, handleClick } = props;
  const date = new Date(timestamp);


  return (
    <ListItemWrapper p={2} gap={2} alignItems="center" onClick={() => {handleClick(id)}}>
      <Icon color="info" />

      <div>
        <H6 fontSize={13}>#{id} - {firstName} - {lastName} </H6>
        <H6>{price} KM</H6>
        <Paragraph fontSize={11}>
          <Typography>{timestamp && date.toLocaleDateString()}</Typography>
        </Paragraph>
      </div>
    </ListItemWrapper>
  );
}
