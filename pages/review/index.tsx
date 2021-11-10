import https from 'https';
import React from 'react';
import { Box, Container, Grid } from '@mui/material/';
import { GetServerSideProps } from 'next';
// import PaginationComp from '@src/components/PaginationComp';
import Review from '@src/components/Review';
import { ReviewProps } from '@src/models/review.models';
import Api from '@src/services/api';

type ReviewListProps = {
  reviews: { items: ReviewProps[]; meta: { [key: string]: number } };
};

const ReviewPage: React.FC<ReviewListProps> = ({ reviews }: ReviewListProps) => {
  return (
    <Container>
      <Box textAlign="center" fontSize="1.75rem" my={5} mt={13} sx={{ fontFamily: 'Prompt' }}>
        ฝนตกพรำ ๆ เปิดเพลงเบา ๆ เอ้อ นี่แหละ ความสงบ...
      </Box>
      <Box mb={3}>
        <Grid container spacing={3}>
          {Array.isArray(reviews.items) &&
            reviews.items.map((review) => {
              return <Review {...review} key={review.id} />;
            })}
        </Grid>
      </Box>
      {/* <PaginationComp count={5} /> */}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const response = await Api.get('/review?isActive=1', { httpsAgent: agent });
    return {
      props: {
        reviews: response.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
};

export default ReviewPage;
