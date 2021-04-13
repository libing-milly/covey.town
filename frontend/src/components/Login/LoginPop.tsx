import React, {useCallback, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
  } from '@chakra-ui/react';
  import ProfileService from '../../classes/Services/UserServiceClient';


  const LoginPop: React.FunctionComponent = () => {
    const [userName, setUserName] = useState<string>('');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
          const statusCode = await ProfileService.getInstance().login(userName, userEmail, userPassword);
          
          if (statusCode >= 400) {
            toast({
                title: "Unable to Log in",
                description: `error code:  ${statusCode}`,
                status: "error"
            });
          }else {
          
          toast({
            title: 'You have logged in',
            description: 'You have logged in',
            status: 'success',
          });
          setLoading(false);  
          closeLogin();  
          }
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
    <Button onClick={openLogin} mr = {4} disabled={ProfileService.getInstance().getLoginStatus()}>
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
              <Button colorScheme="blue" mr={3} type = "submit" disabled = {loading}
              onClick={authHandler}>
                {loading ? "Loading ..." : "Login"} 
              </Button>
              
              <Button onClick={closeLogin}>Cancel</Button>
            </ModalFooter>
          </form>
      </ModalContent>
    </Modal>
  </>
      
}
export default LoginPop;