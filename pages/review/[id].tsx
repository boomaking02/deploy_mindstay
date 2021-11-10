import https from 'https';
import React, { useEffect } from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Container, Box, Paper, Breadcrumbs, Stack, Typography, Divider } from '@mui/material';
import MuiLink from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import parse from 'html-react-parser';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { UserProps } from '@src/models/user.model';
import Api from '@src/services/api';

type ReviewDetailProps = {
  id: number;
  title: string;
  subTitle?: string;
  shortDescription?: string;
  image: string;
  content: string;
  updateDate: Date;
  reviewer: UserProps;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(12),
    },
    imgCover: {
      height: '100%',
      objectFit: 'cover',
    },
    imgRound: {
      borderRadius: 40,
      height: '100%',
      cursor: 'pointer',
    },
    cardBorder: {
      border: '2px solid #c7c4c4',
      borderRadius: 40,
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);
const ReviewDetailPage: React.FC<ReviewDetailProps> = ({ ...props }: ReviewDetailProps) => {
  const classStyle = useStyles();
  const [html, setHTML] = React.useState('');
  const breadcrumbs = [
    <Link href="/review" key="1">
      <MuiLink underline="hover" color="inherit" sx={{ cursor: 'pointer', fontFamily: 'Prompt' }}>
        รีวิวที่พัก
      </MuiLink>
    </Link>,
    <Typography key="2" color="primary" fontFamily="Prompt">
      {props.title}
    </Typography>,
  ];
  useEffect(() => {
    if (props.content !== '' && props.content) {
      const deltatest = JSON.parse(props.content).ops;
      const cfg = {};
      const converter = new QuillDeltaToHtmlConverter(deltatest, cfg);
      const stringhtml = converter.convert();
      setHTML(stringhtml);
    }
  }, [props.content]);

  return (
    <Paper className={classStyle.paper} sx={{ pb: 4 }}>
      <Container fixed>
        <Box sx={{ mt: 14 }} />
        <Box sx={{ boxShadow: 5, mb: 3, p: 2, borderRadius: 5 }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Box mt={2} />
          <Stack direction="row" spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Stack>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {props?.reviewer?.name}
                </Typography>
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ fontFamily: 'Bai Jamjuree' }}>{parse(html)}</Box>
        </Box>
      </Container>
    </Paper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get(`/review/${query?.id}`, { httpsAgent: agent });
    return {
      props: {
        ...response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default ReviewDetailPage;
