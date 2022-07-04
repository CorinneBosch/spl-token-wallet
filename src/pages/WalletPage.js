import Container from '@material-ui/core/Container';
import BalancesList from '../components/BalancesList';
// import GetPreferredColorScheme from '../components/ThemeSwitch';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down(theme.ext)]: {
      padding: 0,
    },
    [theme.breakpoints.up(theme.ext)]: {
      maxWidth: 'lg',
    },
  },
  balancesContainer: {
    [theme.breakpoints.down(theme.ext)]: {
      marginBottom: 24,
    },
  },
}));

export default function WalletPage() {
  const classes = useStyles();

  return (
    <>
      <Container fixed maxWidth="lg" className={classes.container}>
        <Hidden mdUp>
          <Grid container spacing={0}>
            <Grid item xs={12} className={classes.balancesContainer}>
              <BalancesList />
            </Grid>
          </Grid>
        </Hidden>
        <Hidden smDown>
          <Grid container spacing={5}>
            <Grid item xs={8} className={classes.balancesContainer}>
              <BalancesList />
            </Grid>
            <Grid item xs={4} className={classes.balancesContainer}>
              <hr />
              <h2>New Payment</h2>
              <h3>From</h3>
              <input type="text"></input>
              <h3>To</h3>
              <input type="text"></input>
              <h3>Amount</h3>
              <input type="text"></input>
              <h3>Reference</h3>
              <input type="text"></input>
              <br />
              <br />
              <button>SWIPTE TO SEND PAYMENT</button>
              {/* <GetPreferredColorScheme /> */}
              <hr />
            </Grid>
          </Grid>
        </Hidden>
        {/* {isExtensionWidth ? <h1>Account</h1> : <h1>Payment</h1>} */}
        {/* <Grid container spacing={isExtensionWidth ? 0 : 3}>
        <Grid item xs={12} className={classes.balancesContainer}>
          <BalancesList />
        </Grid>
      </Grid> */}
      </Container>
    </>
  );
}
