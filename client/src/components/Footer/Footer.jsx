import React from 'react';
import Typography from '@material-ui/core/Typography';

function Footer({ classes }) {
  return (
    <footer className={classes.footer}>
      <hr />
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Кофейня на пр. Путина 6 8 (965) 951-06-66
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Coffee Soul © "}
        <p>Кофе твоей мечты</p>
      </Typography>
    </footer>
  );
}

export default Footer;