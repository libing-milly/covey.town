import React, { useCallback, useEffect, useState } from 'react';
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
    Textarea,
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

import Player from '../../classes/Player';

const pictureOptions = [
    {value:'https://bit.ly/code-beast', name:'code beast'},
    {value:'https://bit.ly/sage-adebayo', name:'sage-adebayo'},
    {value:'https://bit.ly/dan-abramov', name:'dan-abramov'}

];
const player1 = new Player('123', 'player1', {
    x: 0,
    y: 0,
    rotation: "front",
    moving: false
  });
  const player2 = new Player('234', 'player2', {
    x: 0,
    y: 0,
    rotation: "front",
    moving: false
  });
const testPlayers = [player1, player2];

const OthersProfile: React.FunctionComponent = () => {
    // const {players} = useCoveyAppState();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const players = testPlayers;
    const profile = {userName: 'test user name',  introduction: 'test intro', picture: pictureOptions[0]};
    // const [profile, setProfile] = useState({userName: '',  introduction: '', picture: pictureOptions[0]});
    const [loading, setLoading] = useState(false);


    function getProfiles() {
        setLoading(true);
        
      }
    
      useEffect(() => {
        getProfiles();
      }, []);

    return <>        
          
          <MenuItem data-testid='openMenuButton' onClick={onOpen}>
            <Typography variant="body1">Players Profile</Typography>
            </MenuItem>
            
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
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
                    {players?.map((player) => (
                        <Popover key = {player.id}>
                            <PopoverTrigger>
                            <Button >
                          {player.userName}
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
                                        src={profile.picture.value}
                                    />
                                </Box>
                                <Box>
                                    <Text fontSize="20px">user name: {profile.userName}</Text>
                                </Box>
                                <Box>
                                    <Text> intro: {profile.introduction} </Text> 
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