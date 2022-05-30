import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Grid, CircularProgress }  from '@mui/material';
import './index.css';
import './i18next.js';

const loadingMarkup = (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
    style={{ height: "100vh",background: "linear-gradient(225deg, #A5F3BC 10%, #0A481C 95%)", backgroundSize: "cover", backgroundAttachment: "fixed"}}>
    <CircularProgress style={{color: "#062144"}} fullwidth="true" />
  </Grid>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);