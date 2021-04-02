import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ThemeProvider,
  theme,
  CSSReset,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import ProfileService from "../../classes/Services/ProfileService";

const VARIANT_COLOR = "teal";

export default function SignUpFuc(): JSX.Element {
  const [formState, setFormState] = useState("idle");
  // const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [question1, setQuestion1] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer3, setAnswer3] = useState("");
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (formState === "done") {
      setTimeout(() => {
        setFormState("idle");
        // setUserName("");
        setEmail("");
        setPassword("");
      }, 3000);
    } else if (formState === "error") {
      setTimeout(() => setFormState("idle"), 3000);
    }
  });

  const signUpHandler = async () => {
    try {
      setFormState("loading");

      
      // 需要讨论
      const response = await ProfileService.getInstance().signUp(
        email, password, question1, answer1, question2, answer2, question3, answer3); // 需要讨论 userName

      if (response.status >= 400) {
        setFormState("error");
        const errorMessage = response.data.message; // 需要测试看看
        toast({
          title: "Unable to SignUp",
          description: errorMessage.toString(),
          status: "error"
        });
        history.push("/");
      } else {
        toast({
          title: "Congratulations!",
          description: "Sign Up Successfully!",
          status: "success"
        });
        setFormState("done");
      }
    } catch (err) {
      toast({
        title: "Unable to SignUp Your Account",
        description: err.toString(),
        status: "error"
      });
    }
  };
  /*
  
  <FormControl mt={8} isRequired>
    <FormLabel htmlFor="name">User Name</FormLabel>
    <Input
      size="md"
      autoFocus
      name="name"
      placeholder="Enter user name"
      value={userName}
      onChange={(event) => setUserName(event.target.value)}
    />
  </FormControl>
  */

  const QuestionArea = () => (
    <>
      <FormControl mt={4} isRequired>
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
    </>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Flex
          minHeight="100vh"
          width="full"
          align="center"
          justifyContent="center"
        >
          <Box
            borderWidth={1}
            px={4}
            width="full"
            maxWidth="550px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg"
          >
            <Box p={6}>
              <Box textAlign="center">
                <Heading>Sign Up Your Account</Heading>
              </Box>
              <form>
                <FormControl mt={4} isRequired>
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
                  <Input
                    size="md"
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormControl>

                <Box mt={6} textAlign="center">
                  <Heading>Set Your Verification Question</Heading>
                </Box>

                <Box mt={6} textAlign="center">
                  <Heading size="sm">
                    To find your account back if you forget password
                  </Heading>
                </Box>

                <QuestionArea />

                <Button
                  colorScheme={VARIANT_COLOR}
                  size="md"
                  width="full"
                  mt={8}
                  onClick={signUpHandler}
                >
                  Sign Up
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
}
