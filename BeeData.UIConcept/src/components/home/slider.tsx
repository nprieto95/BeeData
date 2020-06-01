import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  input: {
    width: 42,
  },
});

const InputSlider = (props: { text: React.ReactNode; }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | string | Array<number | string>>(0.7);

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 1) {
      setValue(1);
    }
  };

  return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
            <Typography variant="h6" style={{paddingLeft: 15}}>{props.text}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={0.01}
              min={0}
              max={1}
              style={{paddingTop: 20}}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </Grid>
      </Grid>
  );
}

export default InputSlider;