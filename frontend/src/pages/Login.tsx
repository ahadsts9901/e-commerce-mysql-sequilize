"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PasswordMUI from '../MUI/components/PasswordMUI';
import AlertMUI from '../MUI/components/AlertMUI';
import { emailPattern, passwordPattern } from '../core';
import axios from "axios"
import { useDispatch } from "react-redux"
import { login } from "../redux/user"
import { useNavigate } from 'react-router-dom';

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ahadsts9901/" style={{
                textDecoration: "none"
            }}>
                Abdul Ahad
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Login() {

    const [password, setPassword] = React.useState("")
    const [clientErrorMessage, setClientErrorMessage] = React.useState<null | string>(null)
    const [clientSuccessMessage, setClientSuccessMessage] = React.useState<null | string>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email: any = data.get('email')

        if (!emailPattern.test(email) || !passwordPattern.test(password)) {
            setClientErrorMessage("Email or Password incorrect")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        try {

            setIsLoading(true)

            const response = await axios.post("/api/v1/login", {
                email: email,
                password: password,
            }, { withCredentials: true })

            setIsLoading(false)
            setClientSuccessMessage(response.data.message)
            dispatch(login(response.data.data))
            setTimeout(() => {
                setClientSuccessMessage(null)
                navigate("/")
            }, 2000);

        } catch (error: any) {
            console.log(error);
            setIsLoading(false)
            setClientErrorMessage(error.response.data.message)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
        }

    };

    return (
        <>
            {
                clientErrorMessage && <AlertMUI status="error" text={clientErrorMessage} />
            }
            {
                clientSuccessMessage && <AlertMUI status="success" text={clientSuccessMessage} />
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            style={{
                                marginBottom: "16px",
                            }}
                        />
                        <PasswordMUI
                            label="Password * "
                            onChange={(value: any) => setPassword(value)}
                            name="password"
                        />
                        <FormControlLabel style={{
                            marginTop: "16px"
                        }}
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {
                                isLoading ?
                                    <>
                                        <span className="buttonLoader"></span>
                                        Processing
                                    </>
                                    : "Sign In"
                            }
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}