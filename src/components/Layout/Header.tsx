/* eslint-disable no-console */
import https from 'https';
import React, { useState, useRef, useEffect } from 'react';
import { Close, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, createTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ResortTypeProps } from '@src/models/resort.model';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';
import checkedImage from '@src/static/img/checked.png';
import langCN from '@src/static/img/icon/langCN.png';
import langEN from '@src/static/img/icon/langEN.png';
import langTH from '@src/static/img/icon/langTH.png';
import logo from '@src/static/img/logo.png';
import logoW from '@src/static/img/logoW.png';
import firebaseConfig from '@src/utils/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const theme = createTheme();

const PREFIX = 'Header';
const classes = {
  root: `${PREFIX}-root`,
  brand: `${PREFIX}-brand`,
};

const Root = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    fontFamily: 'Prompt',
  },
  [`& .${classes.brand}`]: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  tel: string;
  gender: string;
  loginEmail: string;
  loginPassword: string;
  emailForgetPassword: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
type AlertMessage = {
  color: Severity;
  message: string;
};
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
    fontFamily: 'Prompt',
    fontWeight: 400,
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
  const [logoNav, setLogo] = useState(logoW.src);
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openRegis, setRegisOpen] = React.useState(false);
  const [openManualRegis, setRegisManualOpen] = React.useState(false);
  const [openSuccess, setSuccessOpen] = React.useState(false);
  const [openForgetPassword, setForgetPasswordOpen] = React.useState(false);
  const [login, setLogin] = React.useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: 'บันทึกข้อมูลสำเร็จ',
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  const [checkConfirm, setCheckConfirm] = React.useState(true);
  const [menus, setMenus] = useState<Array<ResortTypeProps>>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  // collapse mobile language menu
  const [openLangCollapse, setOpenLangCollapse] = React.useState(false);
  const handleLangCollapseClick = () => {
    setOpenLangCollapse(!openLangCollapse);
  };
  // collapse mobile resource menu
  const [openResourceCollapse, setOpenResourceCollapse] = React.useState(false);
  const handleResourceCollapseClick = () => {
    setOpenResourceCollapse(!openResourceCollapse);
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
  // const handleOpenLangMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorLangEl(event.currentTarget);
  // };
  const handleCloseLangMenu = () => {
    setAnchorLangEl(null);
  };

  // for resource menu
  const [anchorResourceEl, setAnchorResourceEl] = React.useState<null | HTMLElement>(null);
  const openResourceEl = Boolean(anchorResourceEl);
  const handleOpenResourceMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorResourceEl(event.currentTarget);
  };
  const handleCloseResourceMenu = () => {
    setAnchorResourceEl(null);
  };

  // for register and login dialog
  const handleRegisOpen = () => {
    setValue('loginEmail', '');
    setValue('loginPassword', '');
    setRegisManualOpen(false);
    setRegisOpen(true);
    setOpen(false);
  };
  const handleRegisClose = () => setRegisOpen(false);

  // for register customer dialog
  const handleRegisManualOpen = () => {
    setValue('email', '');
    setValue('name', '');
    setValue('tel', '');
    setValue('password', '');
    setValue('confirmPassword', '');
    setValue('gender', '');
    setCheckConfirm(true);
    setRegisManualOpen(true);
    setRegisOpen(false);
    setOpen(false);
  };
  const handleRegisManualClose = () => setRegisManualOpen(false);

  // for register success dialog
  const handleSuccessOpen = () => {
    setSuccessOpen(true);
    setRegisManualOpen(false);
    setOpen(false);
  };

  const handleSuccessClose = () => setSuccessOpen(false);

  // for Forget password dialog
  const handleOpenForgetPassword = () => {
    setForgetPasswordOpen(true);
    setRegisManualOpen(false);
    setRegisOpen(false);
    setOpen(false);
  };
  const handleCloseForgetPassword = () => setForgetPasswordOpen(false);

  // send email reset password
  const handleResetPassword = () => {
    if (getValues('emailForgetPassword')) {
      sendPasswordResetEmail(auth, getValues('emailForgetPassword'))
        .then(() => {
          setAlertOpen(true);
          setAlert({
            color: 'success',
            message: 'ระบบทำการส่งลิงค์ไปที่อีเมล์ของท่านแล้ว กรุณาตรวจสอบกล่องข้อความ',
          });
          setForgetPasswordOpen(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/user-not-found') {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'ไม่พบบัญชีผู้ใช้กรุณาลองใหม่อีกครั้ง',
            });
          }
          // ..
        });
    } else {
      setAlertOpen(true);
      setAlert({
        color: 'error',
        message: 'กรุณากรอกอีเมล์ก่อนกดยืนยัน',
      });
    }
  };

  const handleCheckConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckConfirm(!event.target.checked);
  };
  const navRef: React.MutableRefObject<string | undefined> = useRef();
  navRef.current = navBackground;
  const handleScroll = () => {
    const show = window.scrollY > 200;
    if (show) {
      setNavBackground('appBarSolid');
      setLogo(logo.src);
    } else {
      setNavBackground('appBarTransparent');
      setLogo(logoW.src);
    }
  };

  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setAlertOpen(false);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    router.push('/profile');
  };
  const handleHost = () => {
    setAnchorEl(null);
    router.push(`/hostManagement/${currentUser?.id}`);
  };
  const handleBooking = () => {
    setAnchorEl(null);
    router.push(`/bookingManagement/${currentUser?.id}`);
  };
  const handleResource = () => {
    setAnchorResourceEl(null);
    router.push('/help');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    signOut(auth).then(() => {
      setAnchorEl(null);
      setLogin(false);
    });
  };
  const handleLoginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };
  const handleLoginFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const { user } = result;
        console.log(token);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const { email } = error;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      });
  };
  const handleLogin = () => {
    if (getValues('loginEmail') && getValues('loginPassword')) {
      clearErrors('loginEmail');
      clearErrors('loginPassword');
      signInWithEmailAndPassword(auth, getValues('loginEmail'), getValues('loginPassword'))
        .then((userCredential) => {
          const { user } = userCredential;
          if (user.emailVerified) {
            setLogin(true);
            setRegisOpen(false);
          } else {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'กรุณายืนยันอีเมล์ของท่านก่อนเริ่มใช้งาน',
            });
            signOut(auth).then(() => {
              setAnchorEl(null);
              setLogin(false);
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/user-not-found') {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'ไม่พบบัญชีผู้ใช้กรุณาลองใหม่อีกครั้ง',
            });
          } else if (errorCode === 'auth/wrong-password') {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'รหัสผ่านไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
            });
          }
        });
    } else {
      clearErrors('loginEmail');
      clearErrors('loginPassword');
      if (!getValues('loginEmail')) {
        setError('loginEmail', {
          type: 'manual',
        });
      }
      if (!getValues('loginPassword')) {
        setError('loginPassword', {
          type: 'manual',
        });
      }
      setAlertOpen(true);
      setAlert({
        color: 'error',
        message: 'กรุณาระบอีเมล์และรหัสผ่านของท่านให้ครบถ้วน',
      });
    }
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          // Signed in
          try {
            const { user } = userCredential;
            const objData = {
              ...data,
              uid: user.uid,
              role: 'customer',
            };
            const response = await Api({
              method: 'post',
              url: `/user`,
              data: objData,
            });
            const jsonData = await response.data;
            if (jsonData) {
              if (auth.currentUser) {
                sendEmailVerification(auth.currentUser).then(() => {
                  setAlertOpen(true);
                  setAlert({
                    color: 'success',
                    message: 'บันทึกข้อมูลสำเร็จ กรุณาตรวจสอบลิงค์ยืนยันในอีเมล์ของท่าน',
                  });
                });
              }

              handleSuccessOpen();
            }
          } catch (error) {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'อีเมล์ที่ท่านใช้ซ้ำกับในระบบ ไม่สามารถสมัครได้กรุณาลองใหม่อีกครั้ง',
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/email-already-in-use') {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'อีเมล์ที่ท่านใช้ซ้ำกับในระบบ ไม่สามารถสมัครได้กรุณาลองใหม่อีกครั้ง',
            });
          } else if (errorCode === 'auth/user-not-found') {
            setAlertOpen(true);
            setAlert({
              color: 'error',
              message: 'ไม่พบบัญชีผู้ใช้กรุณาลองใหม่อีกครั้ง',
            });
          }
        });
    } catch (error) {
      setAlertOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };
  useEffect(() => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const getMenus = async () => {
      try {
        const response = await Api.get('/resort-type?isActive=true', { httpsAgent: agent });
        setMenus(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getMenus();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user?.emailVerified) {
          setLogin(true);
          setRegisOpen(false);
          const response = await Api.get(`/user?uid=${user.uid}`, { httpsAgent: agent });
          setCurrentUser(response.data.items[0]);
        } else {
          setAnchorEl(null);
          setLogin(false);
        }
      } else {
        signOut(auth).then(() => {
          setAnchorEl(null);
          setLogin(false);
        });
      }
    });
    register('email', {
      validate: (value) => !!value || 'กรุณากรอกอีเมล์',
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'อีเมล์ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง',
      },
    });
    register('name', {
      validate: (value) => !!value || 'กรุณากรอกชื่อ - นามสกุล',
    });
    register('tel', {
      validate: (value) => !!value || 'กรุณากรอกเบอร์โทรศัพท์',
      pattern: {
        value: /^\d*$/,
        message: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      },
      minLength: { value: 9, message: 'เบอร์โทรศัพท์ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง' },
      maxLength: { value: 10, message: 'เบอร์โทรศัพท์ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง' },
    });
    register('gender', {
      validate: (value) => !!value || 'กรุณาเลือกเพศ',
    });
    register('password', {
      pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, message: 'รหัสผ่านของท่านไม่ปลอดภัย' },
      validate: (value) => value.length > 5 || 'กรุณากรอกรหัสผ่านอย่างน้อย 6 หลัก',
    });
    register('confirmPassword', {
      validate: (value) => value === getValues('password') || 'กรุณากรอกรหัสยืนยันให้ตรงกับรหัสผ่าน',
    });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [errors, getValues, register]);
  return (
    <Root className={classes.root}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alert.color}>
          {alert.message}
        </Alert>
      </Snackbar>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: 'white' }}
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
                  <MenuIcon sx={{ color: asPath === '/' ? 'white' : 'black' }} />
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
                      src={asPath === '/' ? logoNav : logo.src}
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
                    src={asPath === '/' ? logoNav : logo.src}
                    alt="Mindstay Logo"
                    sx={{ maxWidth: '100px', cursor: 'pointer' }}
                  />
                </Box>
                <ListWrapper sx={{ display: { xs: 'none', lg: 'flex' } }}>
                  <Link href="/">
                    <ListItem button key="Home" alignItems="center">
                      <ListItemText
                        primary={
                          <Typography
                            noWrap
                            variant="body1"
                            align="center"
                            fontSize="1.1rem"
                            sx={{
                              fontFamily: 'Prompt',
                              fontWeight: 400,
                              borderBottom: asPath === '/' ? '3px solid #F05D76' : '',
                            }}
                          >
                            หน้าแรก
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  {menus.map((menu) => {
                    const { resortType } = router.query;
                    const selectedMenu = resortType;
                    return (
                      <Link href={`/list?resortType=${menu.id}`} key={menu.id}>
                        <ListItem button key="List">
                          <ListItemText
                            primary={
                              <Typography
                                variant="body1"
                                fontSize="1.1rem"
                                align="center"
                                sx={{
                                  fontFamily: 'Prompt',
                                  fontWeight: 400,
                                  borderBottom: String(selectedMenu) === String(menu.id) ? '3px solid #F05D76' : '',
                                }}
                              >
                                {menu.name}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Link>
                    );
                  })}

                  <Link href="/review">
                    <ListItem button key="Review" selected={asPath === '/review'}>
                      <ListItemText
                        primary={
                          <Typography
                            noWrap
                            variant="body1"
                            fontSize="1.1rem"
                            align="center"
                            sx={{
                              fontFamily: 'Prompt',
                              fontWeight: 400,
                              borderBottom: asPath === '/review' ? '3px solid #F05D76' : '',
                            }}
                          >
                            รีวิวที่พัก
                          </Typography>
                        }
                      />
                    </ListItem>
                  </Link>
                  <Button
                    variant="text"
                    color="inherit"
                    id="resource-button"
                    onClick={handleOpenResourceMenu}
                    aria-expanded={anchorResourceEl ? 'true' : undefined}
                    aria-controls="resource-menu"
                    aria-haspopup="true"
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          align="center"
                          fontSize="1.1rem"
                          sx={{
                            fontFamily: 'Prompt',
                            fontWeight: 400,
                          }}
                        >
                          ข้อมูล
                        </Typography>
                      }
                    />
                  </Button>
                  <Menu
                    id="resource-button"
                    anchorEl={anchorResourceEl}
                    open={openResourceEl}
                    onClose={handleCloseResourceMenu}
                    MenuListProps={{
                      'aria-labelledby': 'resource-button',
                    }}
                  >
                    <MenuItem>เกี่ยวกับ</MenuItem>
                    <MenuItem>วิธีจอง</MenuItem>
                    <MenuItem>คำถามที่พบบ่อย</MenuItem>
                    <MenuItem onClick={handleResource}>ความช่วยเหลือ</MenuItem>
                  </Menu>
                </ListWrapper>
              </Grid>
              <Grid item xs className={classes.brand}>
                {/* regis btn */}
                <Stack direction="row" spacing={1}>
                  {/* เปลี่นยภาษาซ่อนชั่วคราว */}
                  {/* <Button
                    variant="text"
                    color="inherit"
                    id="lang-button"
                    onClick={handleOpenLangMenu}
                    aria-expanded={openLangEl ? 'true' : undefined}
                    aria-controls="lang-menu"
                    aria-haspopup="true"
                    sx={{ display: { xs: 'none', lg: 'block' } }}
                  >
                    <ListItemText primary={<LanguageIcon />} />
                  </Button> */}
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
                        <Typography variant="body1" sx={{ fontFamily: 'Prompt' }}>
                          ภาษาไทย
                        </Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem>
                      <Stack direction="row">
                        <CardMedia component="img" image={langEN.src} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body1" sx={{ fontFamily: 'Prompt' }}>
                          English
                        </Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem>
                      <Stack direction="row">
                        <CardMedia component="img" image={langCN.src} sx={{ width: '100%', mr: 1 }} />
                        <Typography variant="body1" sx={{ fontFamily: 'Prompt' }}>
                          简体中文
                        </Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                  <Fab
                    variant="extended"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleRegisOpen}
                    sx={{ backgroundColor: 'white', display: { xs: 'none', lg: login ? 'none' : 'block' } }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MenuIcon sx={{ mr: 1, fontSize: '1.4rem', color: '#717171' }} />
                      <AccountCircleIcon sx={{ fontSize: '2.3rem', color: '#717171' }} />
                    </Box>
                  </Fab>
                  {/* login btn */}
                  <Box sx={{ display: login ? 'block' : 'none' }}>
                    <Fab
                      id="profile-button"
                      variant="extended"
                      aria-controls="profile-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleOpenMenu}
                      sx={{ backgroundColor: 'white' }}
                    >
                      <MenuIcon sx={{ mr: 1, fontSize: '1.4rem', color: '#717171' }} />
                      <AccountCircleIcon sx={{ fontSize: '2.3rem', color: '#717171' }} />
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
                      <MenuItem>ผู้ใช้ : {currentUser?.name}</MenuItem>
                      {currentUser?.role === 'host' && <MenuItem onClick={handleHost}>จัดการรีสอร์ท</MenuItem>}
                      <MenuItem onClick={handleBooking}>ดูข้อมูลการจอง</MenuItem>
                      <MenuItem onClick={handleProfile}>ข้อมูลส่วนตัว</MenuItem>
                      <MenuItem onClick={handleLogout}>ออกจากระบบ</MenuItem>
                    </Menu>
                  </Box>
                </Stack>
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
            <ListItem button key="Home" alignItems="center" selected={asPath === '/'} sx={{ mt: theme.spacing(1) }}>
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
          <ListItemButton onClick={handleResourceCollapseClick}>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  className={classStyle.lightText}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  ข้อมูล
                </Typography>
              }
            />
            {openResourceCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openResourceCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className={classStyle.lightText}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      เกี่ยวกับ
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
                      วิธีจอง
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
                      คำถามที่พบบ่อย
                    </Typography>
                  }
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={handleResource}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      className={classStyle.lightText}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      ความช่วยเหลือ
                    </Typography>
                  }
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton onClick={handleLangCollapseClick} sx={{ display: 'none' }}>
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
          {login ? (
            ''
          ) : (
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
          )}
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
            <Controller
              name="loginEmail"
              control={control}
              defaultValue=""
              render={({ field }) => {
                return (
                  <OutlinedInput
                    {...field}
                    placeholder="อีเมล"
                    fullWidth
                    error={Boolean(errors?.loginEmail)}
                    sx={{ borderRadius: '20px 20px 0 0' }}
                  />
                );
              }}
            />
            <Controller
              name="loginPassword"
              control={control}
              defaultValue=""
              render={({ field }) => {
                return (
                  <OutlinedInput
                    {...field}
                    type="password"
                    placeholder="รหัสผ่าน"
                    fullWidth
                    error={Boolean(errors?.loginPassword)}
                    sx={{ borderRadius: '0 0 20px 20px' }}
                  />
                );
              }}
            />
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
              <Grid item xs={6} sx={{ display: 'flex' }} />
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button variant="text" onClick={handleOpenForgetPassword}>
                  <Typography component="ins">ลืมรหัสผ่าน?</Typography>
                </Button>
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
                  onClick={handleLoginFacebook}
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
                  onClick={handleLoginGoogle}
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
            <CardMedia component="img" src={logo.src} alt="Mindstay Logo" sx={{ maxWidth: '150px' }} />
          </Box>
          <Box
            component="form"
            id="hook-form"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ justifyContent: 'center' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="ชื่อ - นามสกุล"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors?.name)}
                        helperText={errors?.name?.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="tel"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        type="tel"
                        label="เบอร์โทร"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors?.tel)}
                        helperText={errors?.tel?.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="อีเมล์"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                      />
                    );
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="รหัสผ่าน"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors?.password)}
                        helperText={errors?.password?.message}
                      />
                    );
                  }}
                />
                {errors?.password?.type === 'pattern' && (
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    sx={{ backgroundColor: '#fff2f4', p: 2, borderRadius: 5, mt: 2 }}
                  >
                    <Grid item xs={12}>
                      <Typography color="primary" fontWeight="bold">
                        คำแนะนำ
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                      <ArrowRightIcon />
                      <Typography>ต้องมีความยาวอย่างน้อย 6 ตัวอักษร</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                      <ArrowRightIcon />
                      <Typography>ต้องมีตัวอักษรภาษาอังกฤษพิมพ์เล็กและพิมพ์ใหญ่</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex' }}>
                      <ArrowRightIcon />
                      <Typography>ต้องประกอบด้วยตัวเลข</Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        label="ยืนยันรหัสผ่านอีกครั้ง"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors?.confirmPassword)}
                        helperText={errors?.confirmPassword?.message}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <RadioGroup {...field} row aria-label="gender">
                          <FormControlLabel value="ชาย" control={<Radio />} label="ชาย" />
                          <FormControlLabel value="หญิง" control={<Radio />} label="หญิง" />
                        </RadioGroup>
                      );
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {Boolean(errors?.gender) && <Typography color="error">*{errors?.gender?.message}</Typography>}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={checkConfirm}
                  type="submit"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  <Typography variant="h5">ดำเนินการต่อ</Typography>
                </Button>
                <Button color="primary" size="large" fullWidth onClick={handleRegisOpen}>
                  <Typography variant="h6">เข้าสู่ระบบ</Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Checkbox onChange={handleCheckConfirm} />
                  <Typography>
                    ฉันยอมรับ<Typography component="ins">ข้อกำหนด</Typography>และ
                    <Typography component="ins">เงื่อนไข</Typography>ของMindstay
                  </Typography>
                </Stack>
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
            <Typography variant="h4" align="center" sx={{ fontFamily: 'Prompt' }}>
              ข้อมูลอัพเดทแล้ว
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      {/* Forget password dialog */}
      <Dialog open={openForgetPassword} onClose={handleCloseForgetPassword}>
        <DialogContent>
          <Box p={theme.spacing(5)}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5">Reset Password</Typography>
            </Box>
            <Typography>กรุณากรอกอีเมล์ของท่านเพื่อขอรหัสผ่านใหม่</Typography>
            <Controller
              name="emailForgetPassword"
              control={control}
              defaultValue=""
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="อีเมล์"
                    variant="outlined"
                    fullWidth
                    sx={{ my: 3 }}
                    error={Boolean(errors?.emailForgetPassword)}
                    helperText={errors?.emailForgetPassword?.message}
                  />
                );
              }}
            />
            <Button variant="contained" onClick={handleResetPassword} color="primary" size="large" fullWidth>
              ยืนยันขอรหัสผ่านใหม่
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Root>
  );
};

export default Header;
