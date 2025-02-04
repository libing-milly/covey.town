import React, {useCallback, useState} from 'react';
import {
    Button,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
    useToast,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
import ProfileService from '../../classes/Services/UserServiceClient';

const VARIANT_COLOR = "teal";

export default function SignupPop(): JSX.Element {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [question1, setQuestion1] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [answer3, setAnswer3] = useState("");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const [loading, setLoading] = useState(false);


    const openSignUp = useCallback(()=>{
        onOpen();
      }, [onOpen]);
    
    const closeSignUp = useCallback(()=>{
        onClose();
      }, [onClose]);


    const signUpHandler = async () => {
        try {
            setLoading(true);
            await ProfileService.getInstance().signUp(
            userName, email, password, question1, answer1, question2, answer2, question3, answer3);
            
            
            toast({
                title: "Congratulations!",
                description: "Sign Up Successfully! You have been logged in",
                status: "success"
            });
            
            setLoading(false);
            closeSignUp();

        
        } catch (err) {
            setLoading(false);

            toast({
            title: "Unable to SignUp Your Account",
            description: err.toString(),
            status: "error"
            });
        }
    };
    
    
    return<>
    <Button onClick={openSignUp} mr = {4} disabled={ProfileService.getInstance().getLoginStatus()}>
      Sign up
    </Button>
    <Modal isOpen={isOpen} onClose={closeSignUp}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton/>

        <form>
            <ModalBody pb={6}>
                <FormControl isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input
                    size="md"
                    placeholder="Your user name"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                    size="md"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                </FormControl>

                <FormControl mt={4} isRequired>
                    <FormLabel htmlFor="Password">Password</FormLabel>
                    <InputGroup>
                    <Input
                        size="md"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
            

                <Box mt={4} textAlign="center">
                    <ModalHeader>Set Verification Questions</ModalHeader>
                </Box>

                <Box textAlign="center">
                    <Heading size="sm">
                    To find your account back if you forget password
                    </Heading>
                </Box>

                <FormControl mt={6} isRequired>
                <FormLabel>Question 1</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your question 1 here"
                    value={question1}
                    onChange={(event) => setQuestion1(event.target.value)}
                />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Answer 1</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your answer 1 here"
                    value={answer1}
                    onChange={(event) => setAnswer1(event.target.value)}
                />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Question 2</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your question 2 here"
                    value={question2}
                    onChange={(event) => setQuestion2(event.target.value)}
                />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Answer 2</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your answer 2 here"
                    value={answer2}
                    onChange={(event) => setAnswer2(event.target.value)}
                />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Question 3</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your question 3 here"
                    value={question3}
                    onChange={(event) => setQuestion3(event.target.value)}
                />
                </FormControl>

                <FormControl mt={4} isRequired>
                <FormLabel>Answer 3</FormLabel>
                <Input
                    size="md"
                    placeholder="Enter your answer 3 here"
                    value={answer3}
                    onChange={(event) => setAnswer3(event.target.value)}
                />
                </FormControl>

            </ModalBody>

            <ModalFooter>
                <Button colorScheme={VARIANT_COLOR} mr={3} type = "submit" disabled = {loading}
                onClick={signUpHandler}>
                {loading ? "Loading ..." : "Sign Up"} 
                </Button>
                <Button
                    onClick={closeSignUp}>Cancel
                </Button>
            </ModalFooter>
          </form>
      </ModalContent>
    </Modal>
  </>
      
}