import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { CSSProperties, Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/LoginContext";

export default function AccountMenu(headerProps: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { loggedInUser, signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const openModal = () => headerProps.setModalState(true);

  const handleLogOut = () => {
    console.log("hejko");
    if (loggedInUser) {
      signOut();
      navigate("/");
    } else if (!loggedInUser) {
      console.log("error");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            style={headerCartLink}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Link style={linkStyle} to="/profile">
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            My orders
          </Link>
        </MenuItem>
        {loggedInUser && loggedInUser.isAdmin ? (
          <MenuItem>
          <Link style={linkStyle} to="/adminorder">
            <ListItemIcon>
              <AssignmentIcon fontSize="small" />
            </ListItemIcon>
            Manage orders
          </Link>
          </MenuItem>
        ) : null}{" "}
        {loggedInUser && loggedInUser.isAdmin ? (
          <MenuItem>
            <Link style={linkStyle} to="/admin">
              <ListItemIcon>
                <InventoryIcon fontSize="small" />
              </ListItemIcon>
              Manage products
            </Link>
          </MenuItem>
        ) : null}{" "}
        {loggedInUser && loggedInUser.isAdmin ? (
          <MenuItem>
            <ListItemIcon>
              <ManageAccountsIcon fontSize="small" />
            </ListItemIcon>
            Manage accounts
          </MenuItem>
        ) : null}
        <Divider />
        <MenuItem
          onClick={() => {
            handleLogOut();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

const headerCartLink: CSSProperties = {
  color: "white",
  position: "relative",
  fontSize: "clamp(5vmin, 7vmin, 2.7rem)",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
};
