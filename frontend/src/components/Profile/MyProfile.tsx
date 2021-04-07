import React, {useCallback, useState, useEffect} from 'react';
import {
    Avatar,
    Button,
    Textarea,
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
  import useMaybeVideo from '../../hooks/useMaybeVideo';
  import ProfileService from '../../classes/Services/ProfileServices';

  const pictureOptions = [
    'https://bit.ly/code-beast', 
    'https://bit.ly/sage-adebayo', 
    'https://bit.ly/dan-abramov',

];

  const MyProfile: React.FunctionComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const video = useMaybeVideo();
    const [newUserName, setNewUserName] = useState('');
    const [newIntroduction, setNewIntroduction] = useState('');
    const [newPicture, setNewPicture] = useState('');
    const isLoggedIn = ProfileService.getInstance().getLoginStatus();

    


    const openProfile = useCallback(()=>{
        onOpen();
        video?.pauseGame();
      }, [onOpen, video]);
    
      const closeProfile = useCallback(()=>{
        onClose();
        video?.unPauseGame();
      }, [onClose, video]);
    
      const toast = useToast()

    const handleUpdate = async() => {
        if(newUserName.length === 0) {
          toast({
            title: 'Unable to update profile',
            description: 'Please enter a username',
            status: 'error',
          });
          return;
        }if(newPicture.length === 0) {
          toast({
            title: 'Unable to update profile',
            description: 'Please choose a profile picture',
            status: 'error',
          });
          return;
        }
        try{
          await ProfileService.getInstance().updateProfile(
            newUserName, newPicture, newIntroduction
          );
          toast({
            title: 'Profile undated',
            description: 'You have updated your profile',
            status: 'success',
          });
          closeProfile();

        }catch (err) {
          toast({
            title: 'Unable to connect to Profile Service',
            description: err.toString(),
            status: 'error'
          });

        }
        

    }

    const getProfile  = useCallback( async() => {
        try {
         const res = await ProfileService.getInstance().getCurrentUserProfile();
          setNewUserName(res.username);
          setNewPicture(res.imageUrl);
          setNewIntroduction(res.selfIntro);

        } catch(err) {
          toast({
            title: 'Unable to connect to Profile Service',
            description: err.toString(),
            status: 'error'
          });
        }
        
      },[toast])
    
      useEffect(() => {
        getProfile();
      }, [getProfile]);


    return <>
    <MenuItem data-testid='openMenuButton' onClick={openProfile} disabled={!isLoggedIn}>
      <Typography variant="body1">Edit Profile</Typography>
    </MenuItem>
    <Modal isOpen={isOpen} onClose={closeProfile}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit profile</ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={(ev)=>{ev.preventDefault(); handleUpdate()}}>
          <ModalBody pb={6}>
            <VStack
                spacing={4}
                align="center"
                >
                <Box>
                    <Avatar
                        borderRadius="full"
                        boxSize="150px"
                        src={newPicture}
                    />
                </Box>
                <Box>
                    <Select value={newPicture} onChange={(ev)=> setNewPicture( ev.target.value)}>
                        <option value={pictureOptions[0]}>option 1</option>
                        <option value={pictureOptions[1]}>option 2</option>
                        <option value={pictureOptions[2]}>option 3</option>
                    </Select>
                </Box>
                
            </VStack>    
                              
            <FormControl>
              <FormLabel htmlFor='userName'>User Name</FormLabel>
              <Input id='userName' placeholder={newUserName} name="userName" value={newUserName} onChange={(ev)=>setNewUserName(ev.target.value)} />
            </FormControl>     
            <FormControl>
              <FormLabel htmlFor='introduction'>Introduction</FormLabel>
              <Textarea id='introduction' placeholder={newIntroduction} name="introduction" value={newIntroduction} onChange={(ev)=>setNewIntroduction(ev.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button data-testid='updatebutton' colorScheme="blue" mr={3} value="update" name='action2' onClick={()=>handleUpdate()}>
              Update
            </Button>
            <Button onClick={closeProfile}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  </>
}

export default MyProfile;