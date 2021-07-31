import React, { useEffect } from "react";
import icon from '../../assets/coffee.png'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../redux/features/categories";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  coffee: {
    color: "black",
    textDecoration: "none",
  },
  link: {
    color: "black",
    textDecoration: "none",

  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
}));
function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories.items);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="green">
        <Container fixed>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <img src={icon} alt=""/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <NavLink className={classes.coffee} exact to="/">
                Coffee Soul
              </NavLink>
            </Typography>
            <Box mr={3}>
              <div>
                <Button aria-describedby={id} onClick={handleClick}>
                  Категории
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Typography className={classes.typography}>
                    {category.map((item) => {
                      return (
                      <p>
                        <Button>
                          <NavLink
                            style={{lineHeight: 1 }}
                            className={classes.link}
                            to={`/product/${item._id}/category`}
                          >
                            <p>{item.name}</p>
                          </NavLink>
                        </Button>
                      </p>
                      );
                    })}
                  </Typography>
                </Popover>
              </div>
            </Box>
            <NavLink className={classes.coffee} exact to="/products">
              <Button>Полное меню</Button>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
