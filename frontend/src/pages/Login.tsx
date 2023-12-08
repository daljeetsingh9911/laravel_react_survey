import { Grid, Paper, styled } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Login = ()=>{
    return (
    <Grid container rowSpacing={1}>
        <Grid xs={6} m={'auto'}>
          <Item>1</Item>    
        </Grid>
    </Grid>
    );
}

export default Login;