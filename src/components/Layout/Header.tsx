import React, { useState, useRef, useEffect } from 'react';
import { Close, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Grid,
  Toolbar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CardMedia,
  IconButton,
  Slide,
  Dialog,
  Fab,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
  Divider,
  RadioGroup,
  Radio,
  Menu,
  MenuItem,
  ListItemButton,
  Collapse,
  Stack,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, createTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import checkedImage from '@public/static/img/checked.png';
import langCN from '@public/static/img/icon/langCN.png';
import langEN from '@public/static/img/icon/langEN.png';
import langTH from '@public/static/img/icon/langTH.png';
import logo from '@public/static/img/logo.png';
import logoW from '@public/static/img/logoW.png';

const theme = createTheme();

const PREFIX = 'Header';
const classes = {
  root: `${PREFIX}-root`,
  brand: `${PREFIX}-brand`,
};

const Root = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },
  [`& .${classes.brand}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
const useStyles = makeStyles(() => ({
  appBarSolid: {
    backgroundColor: 'white',
    color: 'black',
  },
  appBarTransparent: {
    backgroundColor: 'transparent',
  },
  lightText: {
    color: 'white',
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
}));
const RegisterBtn = styled(Button)({
  borderRadius: '20px',
});
const ListWrapper = styled(List)({
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: 0,
  '& li': {
    listStyle: 'none',
    '& a': {
      textDecoration: 'none',
      color: '#000',
    },
  },
});
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Header: React.FC = () => {
  const { asPath } = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const classStyle: any = useStyles();
  const [navBackground, setNavBackground] = useState('appBarTransparent');
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openRegis, setRegisOpen] = React.useState(false);
  const [openManualRegis, setRegisManualOpen] = React.useState(false);
  const [openSuccess, setSuccessOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [openLangCollapse, setOpenLangCollapse] = React.useState(false);
  const handleLangCollapseClick = () => {
    setOpenLangCollapse(!openLangCollapse);
  };

  // for profile menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openEl = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  // for language menu
  const [anchorLangEl, setAnchorLangEl] = React.useState<null | HTMLElement>(null);
  const openLangEl = Boolean(anchorLangEl);
  const handleOpenLangMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLangEl(event.currentTarget);
  };
  const handleCloseLangMenu = () => {
    setAnchorLangEl(null);
  };

  const handleRegisOpen = () => {
    setRegisOpen(true);
    setOpen(false);
  };
  const handleRegisClose = () => setRegisOpen(false);
  const handleRegisManualOpen = () => {
    setRegisManualOpen(true);
    setRegisOpen(false);
    setOpen(false);
  };
  const handleRegisManualClose = () => setRegisManualOpen(false);
  const handleSuccessOpen = () => {
    setSuccessOpen(true);
    setRegisManualOpen(false);
    setOpen(false);
  };
  const handleSuccessClose = () => setSuccessOpen(false);
  const navRef: React.MutableRefObject<string | undefined> = useRef();
  navRef.current = navBackground;
  const handleScroll = () => {
    const show = window.scrollY > 200;
    if (show) {
      setNavBackground('appBarSolid');
    } else {
      setNavBackground('appBarTransparent');
    }
  };
  const handleProfile = () => {
    setAnchorEl(null);
    router.push('/profile');
  };
  const handleLogout = () => {
    setAnchorEl(null);
    setLogin(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    setLogin(true);
    setRegisOpen(false);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <Root className={classes.root}>
      <AppBar
        position="fixed"
        className={classStyle[asPath === '/' ? navRef?.current : 'appBarSolid']}
        elevation={asPath === '/' ? 0 : 3}
      >
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <Grid item xs>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ display: { xs: 'block', lg: 'none' } }}
                  onClick={handleClickOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    padding: theme.spacing(1, 0),
                    width: '100px',
                    display: { xs: 'none', lg: 'flex' },
                    justifyContent: 'center',
                  }}
                >
                  <Link href="/">
                    <CardMedia
                      component="img"
                      src={logo.src}
                      alt="Mindstay Logo"
                      sx={{ maxWidth: '100px', cursor: 'pointer' }}
                    />
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    padding: theme.spacing(1, 0),
                    width: '100%',
                    display: { xs: 'flex', lg: 'none' },
                    justifyContent: 'center',
                  }}
                >
                  <CardMedia
                    component="img"
                    src={logo.src}
                    alt="Mindstay Logo"
                    sx={{ maxWidth: '100px', cursor: 'pointer' }}
                  />
                </Box>
                <ListWrapper sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  <Link href="/">
                    <ListItem button key="Home" alignItems="center" selected={asPath === '/'}>
                      <ListItemText
                        primary={
                          <Typography noWrap variant="body1" align="center">
                            หน้าแรก
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Link href="/list">
                    <ListItem button key="List" selected={asPath === '/list'}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" align="center">
                            ที่พัก
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Link href="/type">
                    <ListItem button key="type" selected={asPath === '/type'}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" align="center">
                            กิจกรรม
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Link href="/resort">
                    <ListItem button key="Resort" selected={asPath === '/resort'}>
                      <ListItemText
                        primary={
                          <Typography noWrap variant="body1" align="center">
                            ที่พักส่วนตัว
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Link href="/review">
                    <ListItem button key="Review" selected={asPath === '/review'}>
                      <ListItemText
                        primary={
                          <Typography noWrap variant="body1" align="center">
                            รีวิวที่พัก
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Link href="/resource">
                    <ListItem button key="Resource" selected={asPath === '/resource'}>
                      <ListItemText
                        primary={
                          <Typography variant="body1" align="center">
                            ข้อมูล
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Button
                    variant="text"
                    color="inherit"
                    id="lang-button"
                    onClick={handleOpenLangMenu}
                    aria-expanded={openLangEl ? 'true' : undefined}
                    aria-controls="lang-menu"
                    aria-haspopup="true"
                  >
                    <ListItemText primary={<LanguageIcon />} />
                  </Button>
                  <Menu
                    id="lang-button"
                    anchorEl={anchorLangEl}
                    open={openLangEl}
                    keepMounted
                    onClose={handleCloseLangMenu}
                    MenuListProps={{
                      'aria-labelledby': 'lang-button',
                    }}
                  >
                    <MenuItem>
                      <Stack direction="row">
                        <CardMedia component="img" image={langTH.src} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body1">ภาษาไทย</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem>
                      <Stack direction="row">
                        <CardMedia component="img" image={langEN.src} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body1">English</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem>
                      <Stack direction="row">
                        <CardMedia component="img" image={langCN.src} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body1">简体中文</Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                </ListWrapper>
              </Grid>
              <Grid item xs className={classes.brand}>
                {/* regis btn */}
                <Box>
                  <RegisterBtn
                    color="primary"
                    onClick={handleRegisOpen}
                    variant="contained"
                    sx={{ display: { xs: 'none', lg: login ? 'none' : 'block' } }}
                  >
                    <Typography noWrap>ลงทะเบียน</Typography>
                  </RegisterBtn>
                  <Fab
                    color="primary"
                    aria-label="profile"
                    size="small"
                    sx={{ display: { xs: login ? 'block' : 'none', lg: 'none' } }}
                    onClick={handleOpenMenu}
                  >
                    <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                  </Fab>
                </Box>
                {/* login btn */}
                <Box sx={{ display: { xs: 'none', lg: login ? 'block' : 'none' } }}>
                  <Fab
                    id="profile-button"
                    variant="extended"
                    aria-controls="profile-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleOpenMenu}
                  >
                    <AccountCircleIcon sx={{ mr: 1, fontSize: '2rem' }} />
                    Khun ACB
                  </Fab>
                  <Menu
                    id="profile-button"
                    anchorEl={anchorEl}
                    open={openEl}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                      'aria-labelledby': 'profile-button',
                    }}
                  >
                    <MenuItem onClick={handleProfile}>ข้อมูลส่วนตัว</MenuItem>
                    <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      {/* for mobile */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', background: 'black' }} elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <Close />
            </IconButton>
            <Box sx={{ ml: 2, flex: 1 }}>
              <CardMedia component="img" src={logoW.src} alt="Mindstay Logo" sx={{ maxWidth: '80px' }} />
            </Box>
            <Search />
          </Toolbar>
        </AppBar>
        <List sx={{ background: 'black', height: '100%' }}>
          <Link href="/">
            <ListItem button key="Home" alignItems="center" selected={asPath === '/'} sx={{ mt: theme.spacing(4) }}>
              <ListItemText
                primary={
                  <Typography noWrap variant="body1" className={classStyle.lightText}>
                    หน้าแรก
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link href="/list">
            <ListItem button key="List" selected={asPath === '/list'}>
              <ListItemText
                primary={
                  <Typography color="inherit" variant="body1" className={classStyle.lightText}>
                    ที่พัก
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link href="/type">
            <ListItem button key="type" selected={asPath === '/type'}>
              <ListItemText
                primary={
                  <Typography variant="body1" className={classStyle.lightText}>
                    กิจกรรม
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link href="/resort">
            <ListItem button key="Resort" selected={asPath === '/resort'}>
              <ListItemText
                primary={
                  <Typography noWrap variant="body1" className={classStyle.lightText}>
                    ที่พักส่วนตัว
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link href="/review">
            <ListItem button key="Review" selected={asPath === '/review'}>
              <ListItemText
                primary={
                  <Typography noWrap variant="body1" className={classStyle.lightText}>
                    รีวิวที่พัก
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <Link href="/resource">
            <ListItem button key="Resource" selected={asPath === '/resource'}>
              <ListItemText
                primary={
                  <Typography variant="body1" className={classStyle.lightText}>
                    ข้อมูล
                  </Typography>
                }
              />
            </ListItem>
          </Link>
          <ListItemButton onClick={handleLangCollapseClick}>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  className={classStyle.lightText}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <LanguageIcon sx={{ mr: 1 }} /> ภาษา
                </Typography>
              }
            />
            {openLangCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openLangCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className={classStyle.lightText}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <CardMedia component="img" image={langTH.src} sx={{ width: '16px', mr: 1 }} /> ภาษาไทย
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className={classStyle.lightText}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <CardMedia component="img" image={langEN.src} sx={{ width: '16px', mr: 1 }} /> English
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className={classStyle.lightText}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <CardMedia component="img" image={langCN.src} sx={{ width: '16px', mr: 1 }} /> 简体中文
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem button key="Register">
            <ListItemText
              primary={
                <RegisterBtn
                  color="primary"
                  variant="contained"
                  onClick={handleRegisOpen}
                  sx={{ marginLeft: theme.spacing(5) }}
                >
                  <Typography noWrap>ลงทะเบียน</Typography>
                </RegisterBtn>
              }
            />
          </ListItem>
        </List>
      </Dialog>
      {/* register */}
      <Dialog fullScreen={fullScreen} open={openRegis} onClose={handleRegisClose} aria-labelledby="responsive-dialog">
        <DialogTitle id="responsive-dialog-title">
          <IconButton edge="start" color="inherit" onClick={handleRegisClose} aria-label="close">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <CardMedia component="img" src={logo.src} alt="Mindstay Logo" sx={{ maxWidth: '150px' }} />
          </Box>
          <Box component="form" sx={{ justifyContent: 'center' }} noValidate autoComplete="off">
            <OutlinedInput placeholder="อีเมล" fullWidth sx={{ borderRadius: '20px 20px 0 0' }} />
            <OutlinedInput type="password" placeholder="รหัสผ่าน" fullWidth sx={{ borderRadius: '0 0 20px 20px' }} />
            <Box mb={2} />
            <Grid container spacing={4}>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={handleLogin}>
                  เข้าสู่ระบบ
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" color="primary" size="large" fullWidth onClick={handleRegisManualOpen}>
                  ลงทะเบียนด้วยตนเอง
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <FormControlLabel control={<Checkbox />} label="บันทึกการใช้งานของฉัน" />
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Typography component="ins">ลืมรหัสผ่าน?</Typography>
              </Grid>
              <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>หรือ</Typography>
              </Grid>
              <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ width: '100%' }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<FacebookIcon sx={{ color: '#44598d' }} />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ borderColor: '#666666', color: '#666666' }}
                >
                  ดำเนินการด้วย Facebook
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  startIcon={<GoogleIcon sx={{ color: '#F05D76' }} />}
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ borderColor: '#666666', color: '#666666' }}
                >
                  ดำเนินการด้วย Google
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      {/* register manual */}
      <Dialog
        fullScreen={fullScreen}
        open={openManualRegis}
        onClose={handleRegisManualClose}
        aria-labelledby="responsive-dialog"
      >
        <DialogTitle id="responsive-dialog-title">
          <IconButton edge="start" color="inherit" onClick={handleRegisManualClose} aria-label="close">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Typography variant="h3">ลงทะเบียน</Typography>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Divider />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <CardMedia component="img" src={logo.src} alt="Mindstay Logo" sx={{ maxWidth: '150px' }} />
          </Box>
          <Box component="form" sx={{ justifyContent: 'center' }} noValidate autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField label="ชื่อ - นามสกุล" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="เบอร์โทร" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="อีเมล์" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="รหัสผ่าน" type="password" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="ยืนยันรหัสผ่านอีกครั้ง" type="password" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <RadioGroup row aria-label="gender">
                  <FormControlLabel value="male" control={<Radio />} label="ชาย" />
                  <FormControlLabel value="female" control={<Radio />} label="หญิง" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" size="large" fullWidth onClick={handleSuccessOpen}>
                  ดำเนินการต่อ
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" size="large" fullWidth>
                  เข้าสู่ระบบ
                </Button>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <>
                      <Typography>
                        ฉันยอมรับ<Typography component="ins">ข้อกำหนด</Typography>และ
                        <Typography component="ins">เงื่อนไข</Typography>ของMindstay
                      </Typography>
                    </>
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
      {/* success dialog */}
      <Dialog open={openSuccess} onClose={handleSuccessClose}>
        <DialogContent>
          <Box p={theme.spacing(5)}>
            <Box display="flex" justifyContent="center">
              <CardMedia component="img" src={checkedImage.src} style={{ maxWidth: 100 }} />
            </Box>
            <Typography variant="h4" align="center">
              ข้อมูลอัพเดทแล้ว
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Root>
  );
};

export default Header;
