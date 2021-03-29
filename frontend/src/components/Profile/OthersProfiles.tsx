import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    VStack,
    Text,
    Avatar,
    Box,
    useDisclosure,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    useToast
  } from '@chakra-ui/react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import useCoveyAppState from '../../hooks/useCoveyAppState';
import useMaybeVideo from '../../hooks/useMaybeVideo';




interface Profile {
        id: string, 
        username: string,  
        selfIntro: string, 
        imageUrl: string, 
        roomId: string

}

const OthersProfile: React.FunctionComponent = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    // need to update roomId at video setup when join room and get roomId from state
    const currentRoomId = '2324';
    
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(false);
    const video = useMaybeVideo();
    const toast = useToast();

   
    const getProfiles = async() => {
        setLoading(true);
        try{
            const res = await axios.get(`https://frozen-peak-16230.herokuapp.com/api/users/`);
            setProfiles(res.data.filter((p : any) => p._id !== currentRoomId));
            console.log(profiles);
            
        }
        catch(err) {
            toast({
                title: 'Unable to get players list',
                description: err.toString(),
                status: 'error'
              });
        }
        
    }
    
    useEffect(() => {
        getProfiles();
    }, []);

    const openPlayersList = useCallback(async()=>{
        await getProfiles();
        onOpen();
        video?.pauseGame();
      }, [onOpen, video]);
    
      const closePlayersList = useCallback(()=>{
        onClose();
        video?.unPauseGame();
      }, [onClose, video]);

    return <>        
          
          <MenuItem data-testid='openMenuButton' onClick={openPlayersList}>
            <Typography variant="body1">Players Profile</Typography>
            </MenuItem>
            
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={closePlayersList}
              size = 'xs'
            >
              <DrawerOverlay>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Players List</DrawerHeader>
      
                  <DrawerBody>
                  <VStack
                    spacing={4}
                    align="stretch"
                    >
                    {profiles?.map((p) => (
                        <Popover key = {p.id}>
                            <PopoverTrigger>
                            <Button >
                          {p.username}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Profile</PopoverHeader>
                            <PopoverBody>
                            <VStack
                                spacing={4}
                                align="center"
                                >
                                
                                <Box>
                                    <Avatar
                                        borderRadius="full"
                                        boxSize="150px"
                                        src={p.imageUrl}
                                    />
                                </Box>
                                <Box>
                                    <Text fontSize="20px">user name: {p.username}</Text>
                                </Box>
                                <Box>
                                    <Text> intro: {p.selfIntro} </Text> 
                                </Box>
                                
                            </VStack>
                                
                            </PopoverBody>
                            </PopoverContent>
                        </Popover>                   
                  ))}
                    </VStack>
                  
                  </DrawerBody>
      
                </DrawerContent>
              </DrawerOverlay>
            </Drawer>    
      </>
    

}

export default OthersProfile;