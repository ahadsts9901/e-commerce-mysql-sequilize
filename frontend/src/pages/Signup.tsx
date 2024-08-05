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
import AlertMUI from "../MUI/components/AlertMUI";
import { firstNamePattern, lastNamePattern, emailPattern, passwordPattern, baseUrl } from '../core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Copyright } from './Login';
import { useDispatch } from 'react-redux';
import { login } from '../redux/user';

export default function SignUp() {

    const [password, setPassword] = React.useState<string>("")
    const [repeatPassword, setRepeatPassword] = React.useState<string>("")
    const [clientErrorMessage, setClientErrorMessage] = React.useState<null | string>(null)
    const [clientSuccessMessage, setClientSuccessMessage] = React.useState<null | string>(null)
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (event: any) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const firstName: any = data.get('firstName')
        const lastName: any = data.get('lastName')
        const email: any = data.get('email')

        if (!firstNamePattern.test(firstName)) {
            setClientErrorMessage("First Name must between 2 to 15 characters long")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        if (!lastNamePattern.test(lastName)) {
            setClientErrorMessage("Last Name must between 2 to 15 characters long")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        if (!emailPattern.test(email)) {
            setClientErrorMessage("Email pattern is invalid")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        if (!passwordPattern.test(password)) {
            setClientErrorMessage("Password must be alphanumeric and 8 to 24 characters long")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        if (password !== repeatPassword) {
            setClientErrorMessage("Passwords do not match")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        const dataToSend = {
            firstName: firstName?.trim(),
            lastName: lastName?.trim(),
            email: email?.trim(),
            password: password?.trim()
        }

        setIsLoading(true)

        try {

            const resp = await axios.post(`${baseUrl}/api/v1/signup`, dataToSend, {
                withCredentials: true,
            });

            setClientErrorMessage(null)
            setClientSuccessMessage("Signup Successfull")
            dispatch(login(resp.data.data))
            navigate("/")

            setTimeout(() => {
                setClientSuccessMessage(null)
            }, 2000)

        } catch (error) {
            setIsLoading(false)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordMUI
                                    name="password"
                                    label="Password * "
                                    onChange={(value: any) => setPassword(value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordMUI
                                    name="repeatPassword"
                                    label="Repeat Password * "
                                    onChange={(value: any) => setRepeatPassword(value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Remember me."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isLoading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {
                                isLoading ? <span className="buttonLoader"></span> : null
                            }
                            {
                                isLoading ? "Processing" : "Sign Up"
                            }
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </>
    );
}