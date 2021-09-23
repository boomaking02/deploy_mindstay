import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material/';
import { styled, createTheme } from '@mui/material/styles';
import 'react-multi-carousel/lib/styles.css';
import team1 from '@src/static/img/team1.png';
import team2 from '@src/static/img/team2.png';
import team3 from '@src/static/img/team3.png';
import teamDefault from '@src/static/img/teamDefault.png';

const theme = createTheme();

const AvatarLarge = styled(Avatar)({
  width: theme.spacing(15),
  height: theme.spacing(15),
});
const TeamManagement: React.FC = () => {
  return (
    <>
      {/* mobile */}
      <Box sx={{ mt: 5, mb: 10, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
        <Grid container spacing={3}>
          {/* 1 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={team1.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Kabin Autchariyasuwan
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Founder , Director of operations
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 2 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={teamDefault.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  ?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Co-founder , Travel influencer
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 3 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={teamDefault.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  ?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Head developer
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 4 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={team2.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Atiwat Onsuwan
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Data scientist
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 5 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={team3.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Tarun Kumar
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Chief Accountant
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* 6 */}
          <Grid item xs={6}>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <AvatarLarge alt="team" src={teamDefault.src} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  ?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  Blockchain Consultant
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* desktop */}
      <Box sx={{ mb: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        {/* 1 */}
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={team1.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Kabin Autchariyasuwan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Founder , Director of operations
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* 2 */}
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={teamDefault.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                ?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Co-founder , Travel influencer
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* 3 */}
      <Box sx={{ mb: 10, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={teamDefault.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                ?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Head developer
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* 4 */}
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={team2.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Atiwat Onsuwan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Data scientist
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* 5 */}
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={team3.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Tarun Kumar
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Chief Accountant
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* 6 */}
        <Box mx={6}>
          <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
            <Grid item xs={12}>
              <AvatarLarge alt="team" src={teamDefault.src} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                ?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Blockchain Consultant
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default TeamManagement;
