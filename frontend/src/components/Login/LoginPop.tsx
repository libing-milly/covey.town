import React, {useCallback, useState, useEffect} from 'react';
import {
    Avatar,
    Button,
    Textarea,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
    Box,
  } from '@chakra-ui/react';
  import MenuItem from '@material-ui/core/MenuItem';
  import Typography from '@material-ui/core/Typography';
  import useCoveyAppState from '../../hooks/useCoveyAppState';
  import useMaybeVideo from '../../hooks/useMaybeVideo';
  import ProfileService from '../../classes/Services/ProfileServices';
  import Video from '../../classes/Video/Video';



  const LoginPop: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>('');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const toast = useToast();


    const openLogin = useCallback(()=>{
        onOpen();
      }, [onOpen]);
    
    const closeLogin = useCallback(()=>{
        onClose();
      }, [onClose]);
       
    const authHandler = async() => {
        if (userName.length === 0) {
          toast({
            title: 'Unable to login',
            description: 'Please enter an user name',
            status: 'error',
          });
          return;
        }
        if (userEmail.length === 0) {
          toast({
            title: 'Unable to login',
            description: 'Please enter an email',
            status: 'error',
          });
          return;
        }
          if (userPassword.length === 0){
            toast({
              title: 'Unable to login',
              description: 'Please enter a password',
              status: 'error',
            });
            return;
        }
        try {
          setLoading(true);
          await ProfileService.getInstance().login(userEmail, userPassword);
          ProfileService.getInstance().setUserName(userName);
          ProfileService.getInstance().serLoginStatus(true);
          toast({
            title: 'You have logged in',
            description: 'You have logged in',
            status: 'success',
          });  
          closeLogin();  
    
        } catch (err){
          setLoading(false);
          toast({
            title: 'Unable to login',
            description: 'Please enter a valid email address or password',
            status: 'error',
          });
          
        }
      }
    
    
    return<>
    <Button onClick={openLogin} mr = {4}>
      Log in
    </Button>
    <Modal isOpen={isOpen} onClose={closeLogin}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={(ev)=>{ev.preventDefault(); authHandler()}}>
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email address" 
              value = {userEmail}
              onChange= {e => setUserEmail(e.target.value)}/>
            </FormControl>                   
            <FormControl isRequired>
              <FormLabel htmlFor='userName'>User Name</FormLabel>
              <Input id='userName' name="userName" value={userName} onChange={(ev)=>setUserName(ev.target.value)} />
            </FormControl>     
          
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" 
              value = {userPassword}
              onChange = {e => setUserPassword(e.target.value)}
              />
            </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}
              onClick={authHandler}>
                Login
              </Button>
              <Button onClick={closeLogin}>Cancel</Button>
            </ModalFooter>
          </form>
      </ModalContent>
    </Modal>
  </>
      
}
export default LoginPop;