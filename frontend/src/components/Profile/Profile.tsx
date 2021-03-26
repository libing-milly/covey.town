import React, {useCallback, useState} from 'react';
import {
    Button,
    Checkbox,
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
    useToast
  } from '@chakra-ui/react';
  import MenuItem from '@material-ui/core/MenuItem';
  import Typography from '@material-ui/core/Typography';
  import useCoveyAppState from '../../hooks/useCoveyAppState';
  import useMaybeVideo from '../../hooks/useMaybeVideo';

  const Profile: React.FunctionComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const video = useMaybeVideo();
    const [email, setEmail] = useState('');
    const {userName} = useCoveyAppState();
    const [newUserName, setNewUserName] = useState('');
    const [password, setPassword] = useState('');
    const [introduction, setIntroduction] = useState('');

    const openProfile = useCallback(()=>{
        onOpen();
        video?.pauseGame();
      }, [onOpen, video]);
    
      const closeProfile = useCallback(()=>{
        onClose();
        video?.unPauseGame();
      }, [onClose, video]);
    
      const toast = useToast()

    const handleUpdate = (action: string) => {

    }


    return <>
    <MenuItem data-testid='openMenuButton' onClick={openProfile}>
      <Typography variant="body1">Profile</Typography>
    </MenuItem>
    <Modal isOpen={isOpen} onClose={closeProfile}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Edit profile {userName} </ModalHeader>
        <ModalCloseButton/>
        <form onSubmit={(ev)=>{ev.preventDefault(); handleUpdate('edit')}}>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='userName'>User Name</FormLabel>
              <Input id='userName' placeholder="User Name" name="userName" value={newUserName} onChange={(ev)=>setNewUserName(ev.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='introduction'>Introduction</FormLabel>
              <Input id='introduction' placeholder="Introduction" name="introduction" value={introduction} onChange={(ev)=>setIntroduction(ev.target.value)} />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="updatePassword">Profile Update Password</FormLabel>
              <Input data-testid="updatePassword" id="updatePassword" placeholder="Password" name="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button data-testid='updatebutton' colorScheme="blue" mr={3} value="update" name='action2' onClick={()=>handleUpdate('edit')}>
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