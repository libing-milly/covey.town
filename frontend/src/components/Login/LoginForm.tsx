import React, {useState}from 'react'
import {withRouter} from 'react-router'
import { useHistory } from "react-router-dom";
import {
  ThemeProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  Heading,

  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios';

const VARIANT_COLOR = "teal";

const LoginHeader = () => (
    <Box textAlign="center">
      <Heading>Sign In to Your Account</Heading>
    </Box>
  );


function LoginForm(): JSX.Element {  
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const history = useHistory();

 


  const authHandler = async() => {
    if (userEmail.length === 0) {
      toast({
        title: 'Unable to login',
        description: 'Please enter an email',
        status: 'error',
      });
      if (userPassword.length === 0){
        toast({
          title: 'Unable to login',
          description: 'Please enter a password',
          status: 'error',
        });
        return;
      }
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`https://secure-anchorage-87188.herokuapp.com/api/users/login`,
      {email: userEmail, password: userPassword });
      setLoggedInUserId(res.data.users._id);

      
      toast({
        title: 'You logged in',
        description: 'You have logged in',
        status: 'success',
      });

      history.push("/");


    } catch (err){
      setLoading(false);
      toast({
        title: 'Unable to Login',
        description: 'Please enter a valid email address or  password',
        status: 'error',
      });
      
    }
  }

  return (
    <>
    <Box my={8} textAlign="left">
      <form onSubmit= {
        (e) => {
          e.preventDefault();
          authHandler()}
      }>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email address" 
          value = {userEmail}
          onChange= {e => setUserEmail(e.target.value)}/>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" 
          value = {userPassword}
          onChange = {e => setUserPassword(e.target.value)}
          />
        </FormControl>

        <Button colorScheme={VARIANT_COLOR} width="full" mt={4} type = "submit" disabled = {loading}>
        {loading ? "Loading ..." : "Sign In"}
        </Button>
      </form>
    </Box>
    
    </>
  );
}

const LoginArea = () => 
  (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );

function LoginFuc():JSX.Element {
  return <>
    <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginArea />
    </ThemeProvider>
</>
}
LoginFuc.defaultProps = {
}
export default withRouter(LoginFuc);


