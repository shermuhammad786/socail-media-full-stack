import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ setUserTextInput }) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" onChange={e => setUserTextInput(e.target.value)} label="What's on your mind" variant="standard" />
        </Box>
    );
}