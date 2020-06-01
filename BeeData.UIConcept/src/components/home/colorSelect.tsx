import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MenuItem, Button, Menu } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import EntityState from 'models/entityState';
import { Color } from 'models';

import { RootState } from 'store/reducers';
import AppActions from 'store/actions/app.actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    buttonSelector: {
        backgroundColor: theme.palette.secondary.light
    },
    colorSquare: {
        width: 25,
        height: 25,
        marginRight: 10,
        border: '1px solid #ddd',
        boxSizing: 'content-box'
    }
}));

interface ColorSelectProps {
    regionCode: number
}

const ColorSelect = (props: ColorSelectProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const colors: EntityState<Color> = useSelector((r: RootState) => r.appReducer.colors);
    const regions = useSelector((r: RootState) => r.appReducer.design?.current.regionColors);
    const selectedColor: Color | null = regions![props.regionCode];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onMenuClick = (color: Color | null) => {
        setAnchorEl(null);

        if (color) {
            dispatch(AppActions.changeColor(props.regionCode, color));
        }
    }

    return (<>
        <Button style={selectedColor ? { backgroundColor: selectedColor.rgbHex, color: theme.palette.getContrastText(selectedColor.rgbHex) } : {}}
            onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)} className={classes.buttonSelector} variant="contained" >
            {selectedColor ? selectedColor.name : "Seleccioná un color"}
        </Button>
        <Menu
            anchorEl={anchorEl} keepMounted
            open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
            elevation={8} getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}>
            <MenuItem selected={selectedColor === null} onClick={() => onMenuClick(null)} value="">
                <em>Ninguno</em>
            </MenuItem>
            {colors.data.map((color: Color) =>
                <MenuItem selected={selectedColor === color} onClick={() => onMenuClick(color)} key={color.name} value={color.name}>
                    <div className={classes.colorSquare} style={{ backgroundColor: color.rgbHex }} />
                    {color.name}
                </MenuItem>
            )}
        </Menu>
    </>
    );
}

export default ColorSelect;