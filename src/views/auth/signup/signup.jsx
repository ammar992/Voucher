import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { CiUser } from 'react-icons/ci';
import { LuLock } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { POST } from '../../../utils/ApiProvider';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [typePassword, setTypePassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!data.name || !data.email || !data.password) {
      toast({
        position: 'bottom-left',
        isClosable: true,
        duration: 5000,
        status: 'error',
        description: 'Empty fields is not allowed',
      });
      return;
    }
    try {
      setLoading(true);
      const res = await POST('/user/register', data);
      if (res?.data?.success) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: 'User registered successfully',
        });
        navigate('/login');
        setLoading(false);
      }
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack>
      <Container maxW={'6xl'} height={'100vh'}>
        <Stack
          display={'flex'}
          flexDirection={'column'}
          h={'100vh'}
          justify={'space-between'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Stack
            display={'flex'}
            flexDirection={'column'}
            w={{ base: '100%', md: '40%' }}
            justifyContent={'space-between'}
            h={'80vh'}
          >
            <Box
              fontSize={{ base: '23px', md: '27px', lg: '36px' }}
              fontWeight={'900'}
              fontFamily={'poppins'}
              textAlign={'center'}
            >
              Welcome! Signup Now
            </Box>
            <Stack>
              <Stack
                w={{ base: '100%', md: '100%' }}
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
                h={'auto'}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CiUser fontSize={'20px'} color="#E9813B" />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    type="text"
                    border="none"
                    shadow={'lg'}
                    fontSize={'14px'}
                    placeholder="Name"
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail fontSize={'20px'} color="#E9813B" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    border="none"
                    shadow={'lg'}
                    fontSize={'14px'}
                    placeholder="Email"
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LuLock color="#E9813B" fontSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    type={typePassword ? 'text' : 'password'}
                    fontSize={'14px'}
                    border="none"
                    shadow={'lg'}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    placeholder="Type password"
                  />
                  <InputRightElement>
                    {typePassword ? (
                      <LuEye
                        onClick={() => {
                          setTypePassword(!typePassword);
                        }}
                      />
                    ) : (
                      <LuEyeOff
                        onClick={() => {
                          setTypePassword(!typePassword);
                        }}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <Button
                  bgColor={'#E77334'}
                  rounded={'full'}
                  _hover={'none'}
                  color={'white'}
                  isLoading={loading}
                  onClick={signup}
                >
                  Signup
                </Button>
              </Stack>
            </Stack>
            <Box
              fontFamily={'poppins'}
              fontWeight={'400'}
              fontSize={{ base: '12px', md: '14px', lg: '16px' }}
              textAlign={'center'}
            >
              If already have an account /{' '}
              <Text as={'span'} color={'#E9813B'} fontWeight={'bold'}>
                <Link to="/login">Login Now</Link>
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Signup;
