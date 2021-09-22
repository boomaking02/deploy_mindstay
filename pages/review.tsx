import React from 'react';
import { Box, Container, Grid } from '@mui/material/';
import PaginationComp from '@src/components/PaginationComp';
import Review from '@src/components/Review';

const reviews = [
  {
    id: 1,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 2,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 3,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 4,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 5,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 6,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
  {
    id: 7,
    title: 'Hachi brand ที่พักเขาใหญ่แห่งความเรียบหรู',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu",
  },
];

const ResortReview: React.FC = () => {
  return (
    <Container>
      <Box textAlign="center" fontSize="1.75rem" my={5} mt={13}>
        ฝนตกพรำ ๆ เปิดเพลงเบา ๆ เอ้อ นี่แหละ ความสงบ...
      </Box>
      <Box mb={3}>
        <Grid container spacing={3}>
          {reviews.map((review) => {
            return <Review review={review} key={review.id} />;
          })}
        </Grid>
      </Box>
      <PaginationComp count={5} />
    </Container>
  );
};

export default ResortReview;
