/* eslint-disable @typescript-eslint/no-explicit-any */
import https from 'https';
import React, { useEffect, useState } from 'react';
import { Save, Panorama, Delete } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Button,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Switch,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  FormControlLabel,
  Autocomplete,
  Container,
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  ButtonGroup,
  Breadcrumbs,
  Link,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone-uploader';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import {
  ResortProps,
  ResortCategoryProps,
  ResortTagProps,
  ResortZoneProps,
  ResortTypeProps,
} from '@src/models/resort.model';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';
import 'react-dropzone-uploader/dist/styles.css';
import firebaseConfig from '@src/utils/firebaseConfig.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export interface Props {
  resortTagData: ResortTagProps[];
  resortZoneData: ResortZoneProps[];
  resortTypeData: ResortTypeProps[];
  resortCategoryData: ResortCategoryProps[];
  resortData: ResortProps;
}
type FormValues = {
  name: string;
  images: FileList;
  category: number[];
  isPetAllowed: boolean;
  resortType: number | null;
  resortCategories: ResortCategoryProps[];
  resortTags: ResortTagProps[];
  resortZones: ResortZoneProps[];
};

type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
type AlertMessage = {
  color: Severity;
  message: string;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(10),
      backgroundColor: '#f7f8f9 !important',
    },

    button: {
      margin: theme.spacing(1),
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%',
    },
    icon: {
      maxWidth: '70px',
    },
    iconFull: {
      maxWidth: '150px',
    },
    thumbsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
    },
    thumb: {
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box',
    },
    thumbInner: {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden',
    },

    img: { display: 'block', width: 'auto', height: '100%' },
  })
);
const options = {
  buttons: { showAutoplayButton: false, showDownloadButton: false },
  thumbnails: {
    showThumbnails: false,
  },
  caption: {
    showCaption: false,
  },
};
const EditResortHostDetail: React.FC<Props> = ({
  resortData,
  resortTypeData,
  resortCategoryData,
  resortTagData,
  resortZoneData,
}: Props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertMessage>({
    color: 'success',
    message: 'บันทึกข้อมูลสำเร็จ',
  });
  // resort type select
  const [resortTypeValue, setResortTypeValue] = React.useState('');
  // resort category select
  const [resortCategoriesValue, setResortCategoriesValue] = React.useState<ResortCategoryProps[]>([]);
  // resort tags select
  const [resortTagsValue, setResortTagsValue] = React.useState<ResortTagProps[]>([]);
  // resort tags select
  const [resortZoneValue, setResortZoneValue] = React.useState<ResortZoneProps[]>([]);
  const [image1, setImage] = React.useState('');
  const handleResortTypeChange = (event: SelectChangeEvent) => {
    setValue('resortType', parseInt(event.target.value, 10) || null);
    setResortTypeValue(event.target.value as string);
  };
  const [openDelete, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setImage('');
    setDeleteOpen(false);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway' && event) {
      return;
    }

    setOpen(false);
  };
  const handleDeleteImage = async () => {
    try {
      const tmpResortImage: string[] = resortData.images;
      if (Array.isArray(tmpResortImage)) {
        const indexImg = tmpResortImage.indexOf(image1);
        if (indexImg > -1) {
          tmpResortImage.splice(indexImg, 1);
          const formData = new FormData();
          formData.append('images', JSON.stringify(tmpResortImage));
          const response = await Api({
            method: 'patch',
            url: `/resort/${resortData?.id}`,
            data: formData,
          });
          const jsonData = await response.data;
          if (jsonData) {
            setAlert({
              color: 'success',
              message: 'ลบรูปภาพเรียบร้อยแล้ว',
            });
            setOpen(true);
            setDeleteOpen(false);
            router.reload();
          }
        }
      }
    } catch (error) {
      setOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('isPetAllowed', JSON.stringify(data.isPetAllowed));
      if (Array.isArray(data.images)) {
        if (data.images.length > 0) {
          for (let i = 0; i < data.images.length; i += 1) {
            formData.append('resorts', data.images[i].file);
          }
        }
      }
      formData.append('resortType', JSON.stringify(data.resortType));
      formData.append(
        'resortCategories',
        data.resortCategories ? JSON.stringify(data.resortCategories) : data.resortCategories
      );
      formData.append('images', JSON.stringify(resortData.images));
      formData.append('resortTags', data.resortTags ? JSON.stringify(data.resortTags) : data.resortTags);
      formData.append('resortZones', data.resortZones ? JSON.stringify(data.resortZones) : data.resortZones);

      const response = await Api({
        method: 'patch',
        url: `/resort/${resortData?.id}`,
        data: formData,
      });

      const jsonData = await response.data;
      if (jsonData) {
        setAlert({
          color: 'success',
          message: 'บันทึกข้อมูลสำเร็จ',
        });
        setOpen(true);
        router.reload();
      }
    } catch (error) {
      setOpen(true);
      setAlert({
        color: 'error',
        message: 'เกิดข้อผิดพลาดไม่สามารถบันทึกข้อมูลได้',
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeStatus = (_file: any, _status: any, allFiles: any) => {
    const arrFile: FileList = allFiles;
    setValue('images', arrFile);
  };
  const imageIconUpload = (
    <Box key={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Panorama sx={{ mr: 1, fontSize: '2rem' }} />
      <Typography variant="h6">อัพโหลดรูปภาพรีสอร์ท</Typography>
    </Box>
  );
  const breadcrumbs = [
    <Link
      href={`/hostManagement/resort/${currentUser?.id}`}
      key="1"
      underline="hover"
      color="inherit"
      sx={{ cursor: 'pointer', fontFamily: 'Prompt' }}
    >
      Resort
    </Link>,
    <Typography key="2" color="primary" fontFamily="Prompt">
      Edit Resort
    </Typography>,
  ];
  useEffect(() => {
    register('name', {
      validate: (value) => !!value || 'กรุณากรอกข้อมูล.',
    });
    register('resortType', {
      validate: (value) => !!value || 'กรุณาเลือก Resort Type.',
    });
    onAuthStateChanged(auth, async (user) => {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      if (user) {
        const response = await Api.get(`/user?uid=${user.uid}`, { httpsAgent: agent });
        setCurrentUser(response.data.items[0]);
        if (response.data.items[0].role !== 'host' && response.data.items[0] !== undefined) {
          router.push('/');
        }
      } else {
        router.push('/');
      }
    });
    setValue('name', resortData.name);
    setValue('isPetAllowed', resortData.isPetAllowed);
    setValue('resortType', resortData.resortType.id);
    setResortTypeValue(String(resortData.resortType.id));
    // set Categories
    if (Array.isArray(resortData.resortCategories)) {
      setValue('resortCategories', resortData.resortCategories);
      setResortCategoriesValue(resortData.resortCategories);
    }
    // set Tags
    if (Array.isArray(resortData.resortTags)) {
      setValue('resortTags', resortData.resortTags);
      setResortTagsValue(resortData.resortTags);
    }
    // set Zones
    if (Array.isArray(resortData.resortZones)) {
      setValue('resortZones', resortData.resortZones);
      setResortZoneValue(resortData.resortZones);
    }
  }, [
    register,
    resortData.isPetAllowed,
    resortData.name,
    resortData.resortCategories,
    resortData.resortTags,
    resortData.resortType.id,
    resortData.resortZones,
    router,
    setValue,
  ]);
  return (
    <>
      <SimpleReactLightbox>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.color}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>
          <Container fixed>
            <Typography variant="h5" sx={{ fontFamily: 'Prompt' }}>
              Host Management
            </Typography>
            <Box sx={{ my: 2, backgroundColor: '#272727', borderRadius: 2, boxShadow: 2 }}>
              <ButtonGroup fullWidth disableElevation variant="text" color="inherit">
                <Button href={`/hostManagement/${currentUser?.id}`} size="large">
                  <Typography
                    noWrap
                    variant="body1"
                    align="center"
                    sx={{ color: 'white', fontFamily: 'Prompt', fontWeight: 400, py: 2 }}
                  >
                    Dashboard
                  </Typography>
                </Button>
                <Button href={`/hostManagement/resort/${currentUser?.id}`} size="large">
                  <Typography
                    noWrap
                    variant="body1"
                    align="center"
                    sx={{ color: 'white', fontFamily: 'Prompt', fontWeight: 400, py: 2 }}
                  >
                    Resort
                  </Typography>
                </Button>
              </ButtonGroup>
            </Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            <Card sx={{ width: '100%', my: 2 }}>
              <CardContent>
                <Typography color="primary" variant="h5" sx={{ fontFamily: 'Prompt', mb: 3 }}>
                  Edit Resort Management
                </Typography>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <SRLWrapper options={options}>
                        <Grid container spacing={2} columns={15}>
                          {resortData.images.map((img) => (
                            <Grid item lg={3} key={img}>
                              <CardMedia
                                component="img"
                                image={img}
                                sx={{ maxHeight: '150px', width: '100%', cursor: 'pointer' }}
                              />
                              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                  variant="text"
                                  color="error"
                                  onClick={() => {
                                    setImage(img);
                                    handleDeleteOpen();
                                  }}
                                  value={img}
                                >
                                  <Delete /> ลบรูปนี้
                                </Button>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </SRLWrapper>
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="images"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Dropzone
                              {...field}
                              autoUpload={false}
                              maxFiles={10 - resortData.images.length}
                              multiple
                              disabled={resortData.images.length === 10}
                              styles={{ previewImage: { width: '100%', maxHeight: '100%' } }}
                              onChangeStatus={handleChangeStatus}
                              accept="image/*"
                              inputContent={imageIconUpload}
                            />
                          );
                        }}
                      />
                      {Boolean(errors?.images) && <Typography color="error">*{errors?.images?.message}</Typography>}
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                          <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({ field }) => {
                              return (
                                <TextField
                                  {...field}
                                  label="Name*"
                                  placeholder="ชื่อของ Resort"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  variant="outlined"
                                  error={Boolean(errors?.name)}
                                />
                              );
                            }}
                          />
                          {Boolean(errors?.name) && <Typography color="error">*{errors?.name?.message}</Typography>}
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <Controller
                            name="resortType"
                            control={control}
                            render={({ field }) => {
                              return (
                                <FormControl
                                  variant="outlined"
                                  error={Boolean(errors?.resortType)}
                                  className={classes.formControl}
                                >
                                  <InputLabel id="resortTypeText">Resort Type*</InputLabel>
                                  <Select
                                    {...field}
                                    labelId="resortTypeText"
                                    label="Resort Type"
                                    value={resortTypeValue}
                                    onChange={handleResortTypeChange}
                                  >
                                    {resortTypeData?.map(
                                      (rt) =>
                                        rt.isActive && (
                                          <MenuItem key={rt.id} value={rt.id}>
                                            {rt.name}
                                          </MenuItem>
                                        )
                                    )}
                                  </Select>
                                  {Boolean(errors?.resortType) && (
                                    <Typography color="error" fontSize="0.75rem">
                                      {errors?.resortType?.message}
                                    </Typography>
                                  )}
                                </FormControl>
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Controller
                            control={control}
                            name="resortCategories"
                            render={() => {
                              return (
                                <Autocomplete
                                  multiple
                                  filterSelectedOptions
                                  options={resortCategoryData}
                                  getOptionLabel={(option) => option.name}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  onChange={(e, values) => {
                                    if (e) {
                                      setValue('resortCategories', values);
                                      setResortCategoriesValue(values);
                                    }
                                  }}
                                  value={resortCategoriesValue}
                                  renderInput={(params) => {
                                    return (
                                      <TextField
                                        {...params}
                                        label="Resort Category"
                                        name="resortCategories"
                                        placeholder="Resort Category"
                                        variant="outlined"
                                        fullWidth
                                      />
                                    );
                                  }}
                                />
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Controller
                            control={control}
                            name="resortTags"
                            render={() => {
                              return (
                                <Autocomplete
                                  multiple
                                  filterSelectedOptions
                                  options={resortTagData}
                                  getOptionLabel={(option) => option.name}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  onChange={(e, values) => {
                                    if (e) {
                                      setValue('resortTags', values);
                                      setResortTagsValue(values);
                                    }
                                  }}
                                  value={resortTagsValue}
                                  renderInput={(params) => {
                                    return (
                                      <TextField
                                        {...params}
                                        label="Resort Tag"
                                        name="resortTags"
                                        placeholder="Resort Tag"
                                        variant="outlined"
                                        fullWidth
                                      />
                                    );
                                  }}
                                />
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Controller
                            control={control}
                            name="resortZones"
                            render={() => {
                              return (
                                <Autocomplete
                                  multiple
                                  filterSelectedOptions
                                  options={resortZoneData}
                                  getOptionLabel={(option) => option.name}
                                  isOptionEqualToValue={(option, value) => option.id === value.id}
                                  onChange={(e, values) => {
                                    if (e) {
                                      setValue('resortZones', values);
                                      setResortZoneValue(values);
                                    }
                                  }}
                                  value={resortZoneValue}
                                  renderInput={(params) => {
                                    return (
                                      <TextField
                                        {...params}
                                        label="Resort Zone"
                                        name="resortZones"
                                        placeholder="Resort Zone"
                                        variant="outlined"
                                        fullWidth
                                      />
                                    );
                                  }}
                                />
                              );
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                          <Controller
                            name="isPetAllowed"
                            control={control}
                            defaultValue={false}
                            render={({ field }) => {
                              return (
                                <FormControlLabel
                                  {...field}
                                  checked={field.value}
                                  control={<Switch color="primary" />}
                                  label="อนุญาตให้นำสัตว์เลี้ยงเข้าพัก"
                                  labelPlacement="end"
                                />
                              );
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ my: 2 }}
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Container>
          <Dialog open={openDelete} onClose={handleDeleteClose}>
            <DialogTitle>ต้องการลบรูปนี้หรือไม่</DialogTitle>
            <DialogContent>
              <DialogContentText>เมื่อลบรูปภาพแล้ว รูปภาพจะไม่สามารถกู้คืนได้อีก</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose}>ยกเลิก</Button>
              <Button onClick={handleDeleteImage} color="error" autoFocus>
                ยืนยันลบรูป
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </SimpleReactLightbox>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const resortRes = await Api.get(`/resort/${query?.id}`);
    const resortData = resortRes.data;
    const resortTypeRes = await Api.get('/resort-type');
    const resortTypeData = resortTypeRes.data;
    const resortZoneRes = await Api.get('/resort-zone?limit=999');
    const resortZoneData = resortZoneRes.data.items;
    const resortCategoryRes = await Api.get('/resort-category?limit=999');
    const resortCategoryData = resortCategoryRes.data.items;
    const resortTagRes = await Api.get('/resort-tag?limit=999');
    const resortTagData = resortTagRes.data.items;
    return {
      props: {
        resortData,
        resortZoneData,
        resortTypeData,
        resortCategoryData,
        resortTagData,
      },
    };
  } catch (error) {
    return {
      props: {
        resortData: [],
        resortZoneData: [],
        resortTypeData: [],
        resortCategoryData: [],
        resortTagData: [],
      },
    };
  }
};

export default EditResortHostDetail;
