import https from 'https';
import React, { useEffect, useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {
  Box,
  Paper,
  Typography,
  Container,
  Grid,
  Divider,
  Button,
  TextField,
  Snackbar,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';
import firebaseConfig from '@src/utils/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
    },
  })
);
type FormValues = {
  editProfile: string;
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
type AlertMessage = {
  color: Severity;
  message: string;
};
const Profile: React.FC = () => {
  const router = useRouter();
  const classStyle = useStyles();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [collapseEdit, setCollapseEdit] = useState<string>('');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [dobValue, setDobValue] = React.useState<Date | null>(null);
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: 'บันทึกข้อมูลสำเร็จ',
  });
  const handleAlertClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setAlertOpen(false);
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const objData = {
        [collapseEdit]: data.editProfile,
      };
      const response = await Api({
        method: 'put',
        url: `/user/${currentUser?.id}`,
        data: objData,
      });
      const jsonData = await response.data;
      if (jsonData) {
        setCollapseEdit('');
      }
    } catch (error) {
      setAlertOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกได้ กรุณาลองใหม่ภายหลัง',
      });
    }
  };

  useEffect(() => {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user?.emailVerified) {
          const response = await Api.get(`/user?email=${user.email}`, { httpsAgent: agent });
          setCurrentUser(response.data.items[0]);
        }
      } else {
        router.push('/');
      }
    });
    clearErrors('editProfile');
    if (collapseEdit === 'name') {
      register('editProfile', {
        validate: (value) => !!value || 'กรุณากรอกข้อมูลก่อนบันทึก',
        pattern: undefined,
        minLength: undefined,
        maxLength: { value: 100, message: 'ข้อความของท่านยาวเกินไปกรุณาลองใหม่อีกครั้ง' },
      });
      setValue('editProfile', currentUser?.name || '');
    } else if (collapseEdit === 'tel') {
      register('editProfile', {
        validate: (value) => !!value || 'กรุณากรอกเบอร์โทรศัพท์',
        pattern: {
          value: /^\d*$/,
          message: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
        },
        minLength: { value: 9, message: 'เบอร์โทรศัพท์ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง' },
        maxLength: { value: 10, message: 'เบอร์โทรศัพท์ไม่ถูกต้องกรุณาลองใหม่อีกครั้ง' },
      });
      setValue('editProfile', currentUser?.tel || '');
    } else if (collapseEdit === 'gender') {
      register('editProfile', {
        validate: (value) => !!value || 'กรุณาเลือกเพศ',
        pattern: undefined,
        minLength: undefined,
        maxLength: undefined,
      });
      setValue('editProfile', currentUser?.gender || '');
    } else if (collapseEdit === 'contactAddress') {
      register('editProfile', {
        validate: (value) => !!value || 'กรุณากรอกที่อยู่ของท่านก่อนบันทึก',
        pattern: undefined,
        minLength: undefined,
        maxLength: { value: 100, message: 'ข้อความของท่านยาวเกินไปกรุณาลองใหม่อีกครั้ง' },
      });
      setValue('editProfile', currentUser?.contactAddress || '');
    } else if (collapseEdit === 'dateOfBirth') {
      register('editProfile', {
        validate: (value) => !!value || 'กรุณาเลือกวันเกิด',
        pattern: undefined,
        minLength: undefined,
        maxLength: undefined,
      });
      setValue('editProfile', currentUser?.dateOfBirth || '');
      if (
        currentUser?.dateOfBirth !== '' &&
        currentUser?.dateOfBirth !== null &&
        currentUser?.dateOfBirth !== undefined
      ) {
        const splitDate = currentUser?.dateOfBirth.split('/');
        setDobValue(new Date(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`));
      }
    }
  }, [
    clearErrors,
    collapseEdit,
    currentUser?.contactAddress,
    currentUser?.dateOfBirth,
    currentUser?.gender,
    currentUser?.name,
    currentUser?.tel,
    register,
    router,
    setValue,
  ]);
  return (
    <Paper className={classStyle.paper} sx={{ pb: 4 }}>
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
      <Container fixed>
        <Box sx={{ mt: 14 }} />
        <Box sx={{ boxShadow: 5, mb: 3, p: 5, borderRadius: 5 }}>
          <Box sx={{ display: 'flex', mb: 4 }}>
            <Typography variant="h6" sx={{ fontFamily: 'Prompt' }}>
              ข้อมูลส่วนบุคคล
            </Typography>
          </Box>
          <Grid container>
            {/* name */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>ชื่อ-นามสกุล</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={collapseEdit !== '' ? !(collapseEdit === 'name') : false}
                variant="text"
                onClick={() => {
                  if (collapseEdit !== 'name') {
                    setCollapseEdit('name');
                  } else {
                    setCollapseEdit('');
                  }
                }}
              >
                {collapseEdit !== 'name' ? 'แก้ไข' : 'ยกเลิก'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {collapseEdit === 'name' ? (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <Controller
                      name="editProfile"
                      control={control}
                      defaultValue=""
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            placeholder="กรุณาใส่ชื่อ - นามสกุล"
                            variant="outlined"
                            error={Boolean(errors?.editProfile)}
                            helperText={errors?.editProfile?.message}
                          />
                        );
                      }}
                    />
                    <Box>
                      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mb: 2 }}>
                        บันทึก
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.name}</Typography>
              )}
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* gender */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>เพศ</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={collapseEdit !== '' ? !(collapseEdit === 'gender') : false}
                variant="text"
                onClick={() => {
                  if (collapseEdit !== 'gender') {
                    setCollapseEdit('gender');
                  } else {
                    setCollapseEdit('');
                  }
                }}
              >
                {collapseEdit !== 'gender' ? 'แก้ไข' : 'ยกเลิก'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {collapseEdit === 'gender' ? (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <Controller
                      name="editProfile"
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
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      {Boolean(errors?.editProfile) && (
                        <Typography color="error">*{errors?.editProfile?.message}</Typography>
                      )}
                    </Box>
                    <Box>
                      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mb: 2 }}>
                        บันทึก
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.gender}</Typography>
              )}
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* dob */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>วันเกิด</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={collapseEdit !== '' ? !(collapseEdit === 'dateOfBirth') : false}
                variant="text"
                onClick={() => {
                  if (collapseEdit !== 'dateOfBirth') {
                    setCollapseEdit('dateOfBirth');
                  } else {
                    setCollapseEdit('');
                  }
                }}
              >
                {collapseEdit !== 'dateOfBirth' ? 'แก้ไข' : 'ยกเลิก'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {collapseEdit === 'dateOfBirth' ? (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <Controller
                      name="editProfile"
                      control={control}
                      render={({ field }) => {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <MobileDatePicker
                              {...field}
                              value={dobValue}
                              inputFormat="dd/MM/yyyy"
                              maxDate={new Date()}
                              onChange={(newValue) => {
                                setDobValue(newValue);
                                setValue(
                                  'editProfile',
                                  newValue !== undefined && newValue !== null ? format(newValue, 'dd/MM/yyyy') : ''
                                );
                              }}
                              renderInput={(props) => (
                                <TextField
                                  fullWidth
                                  {...props}
                                  placeholder="กรุณาเลือกวันเกิด"
                                  error={Boolean(errors?.editProfile)}
                                  helperText={errors?.editProfile?.message}
                                />
                              )}
                            />
                          </LocalizationProvider>
                        );
                      }}
                    />
                    <Box>
                      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mb: 2 }}>
                        บันทึก
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.dateOfBirth}</Typography>
              )}
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* email */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>อีเมล</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }} />
            <Grid item xs={12}>
              <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.email}</Typography>
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* phone */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>เบอร์โทร</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={collapseEdit !== '' ? !(collapseEdit === 'tel') : false}
                variant="text"
                onClick={() => {
                  if (collapseEdit !== 'tel') {
                    setCollapseEdit('tel');
                  } else {
                    setCollapseEdit('');
                  }
                }}
              >
                {collapseEdit !== 'tel' ? 'แก้ไข' : 'ยกเลิก'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {collapseEdit === 'tel' ? (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <Controller
                      name="editProfile"
                      control={control}
                      defaultValue=""
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            placeholder="กรุณาใส่เบอร์มือถือ"
                            variant="outlined"
                            error={Boolean(errors?.editProfile)}
                            helperText={errors?.editProfile?.message}
                          />
                        );
                      }}
                    />
                    <Box>
                      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mb: 2 }}>
                        บันทึก
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.tel}</Typography>
              )}
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
            {/* address */}
            <Grid item xs={6}>
              <Typography sx={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>ที่อยู่</Typography>
            </Grid>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                disabled={collapseEdit !== '' ? !(collapseEdit === 'contactAddress') : false}
                variant="text"
                onClick={() => {
                  if (collapseEdit !== 'contactAddress') {
                    setCollapseEdit('contactAddress');
                  } else {
                    setCollapseEdit('');
                  }
                }}
              >
                {collapseEdit !== 'contactAddress' ? 'แก้ไข' : 'ยกเลิก'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {collapseEdit === 'contactAddress' ? (
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <Stack spacing={2}>
                    <Controller
                      name="editProfile"
                      control={control}
                      defaultValue=""
                      render={({ field }) => {
                        return (
                          <TextField
                            {...field}
                            fullWidth
                            placeholder="กรุณาใส่ที่อยู่"
                            variant="outlined"
                            error={Boolean(errors?.editProfile)}
                            helperText={errors?.editProfile?.message}
                          />
                        );
                      }}
                    />
                    <Box>
                      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mb: 2 }}>
                        บันทึก
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Typography sx={{ color: '#848484', mt: 1 }}>{currentUser?.contactAddress}</Typography>
              )}
            </Grid>
            <Box sx={{ my: 4 }}>
              <Divider sx={{ width: '100%' }} />
            </Box>
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
};

export default Profile;
