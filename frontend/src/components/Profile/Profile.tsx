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

  const pictureOptions = [
    {value:'https://bit.ly/code-beast', name:'code beast'},
    {value:'https://bit.ly/sage-adebayo', name:'sage-adebayo'},
    {value:'https://bit.ly/dan-abramov', name:'dan-abramov'}

];

  const Profile: React.FunctionComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const video = useMaybeVideo();
    const [email, setEmail] = useState('1@email.com');
    const {userName} = useCoveyAppState();
    const [newUserName, setNewUserName] = useState('');
    const [password, setPassword] = useState('12345');
    const [introduction, setIntroduction] = useState('my intro');
    const [picture, setPicture] = useState(pictureOptions[0]);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({newUserName: '', newPassword: '', newIntroduction: '', newPicture: pictureOptions[0]});

    


    const openProfile = useCallback(()=>{
        onOpen();
        video?.pauseGame();
      }, [onOpen, video]);
    
      const closeProfile = useCallback(()=>{
        onClose();
        video?.unPauseGame();
      }, [onClose, video]);
    
      const toast = useToast()

    const handleUpdate = () => {
        if(newUserName.length === 0)
        toast({
            title: 'Profile undated',
            description: 'Your profile is successfully updated',
            status: 'success',
          });

    }

    function getProfiles() {
        setLoading(true);
        setProfile({newUserName: userName, newPassword: password, newIntroduction: introduction, newPicture: picture});
        
      }
    
      useEffect(() => {
        getProfiles();
      }, []);

      const changeProfilePic = () => {

      }

    return <>
    <MenuItem data-testid='openMenuButton' onClick={openProfile}>
      <Typography variant="body1">Profile</Typography>
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
                    <Text fontSize="20px">Email: {email}</Text>
                </Box>
                <Box>
                    <Avatar
                        borderRadius="full"
                        boxSize="150px"
                        src={picture.value}
                    />
                </Box>
                <Box>
                    <Select value={picture.value} onChange={(ev)=>setPicture( {value: ev.target.value, name: ev.target.name})}>
                        <option value={pictureOptions[0].value}>{pictureOptions[0].name}</option>
                        <option value={pictureOptions[1].value}>{pictureOptions[1].name}</option>
                        <option value={pictureOptions[2].value}>{pictureOptions[2].name}</option>
                    </Select>
                </Box>
                
            </VStack>    
                              
            <FormControl>
              <FormLabel htmlFor='userName'>User Name</FormLabel>
              <Input id='userName' placeholder={userName} name="userName" value={profile.newUserName} onChange={(ev)=>setNewUserName(ev.target.value)} />
            </FormControl>     
            <FormControl>
              <FormLabel htmlFor="updatePassword">Password</FormLabel>
              <Input data-testid="updatePassword" id="updatePassword" placeholder={password} name="password" value={profile.newPassword} onChange={(e)=>setPassword(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='introduction'>Introduction</FormLabel>
              <Textarea id='introduction' placeholder={introduction} name="introduction" value={profile.newIntroduction} onChange={(ev)=>setIntroduction(ev.target.value)} />
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

export default Profile;