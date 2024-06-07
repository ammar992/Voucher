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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { LuLock } from 'react-icons/lu';
import { loadUser } from '../../../reducers/userReducer';
import { LuEyeOff, LuEye } from 'react-icons/lu';
import { useToast } from '@chakra-ui/react';
import { POST } from '../../../utils/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const toast = useToast();
  const login = async () => {
    if (!data.email || !data.password) {
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
      const res = await POST('/user/login', data);
      if (res?.data?.success) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: 'User logged in successfully',
        });
        dispatch(loadUser(res?.data?.data));
        navigate('/');
      }
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
            justifyContent={'space-between'}
            h={'80vh'}
            margin={'auto'}
            w="100%"
          >
            <Box
              fontSize={{ base: '30px', md: '36px', lg: '40px', xl: '44px' }}
              textAlign={'center'}
              fontWeight={'900'}
              fontFamily={'poppins'}
            >
              Hey! Login Now{' '}
            </Box>
            <Stack>
              <Stack
                display={'flex'}
                flexDirection={'column'}
                gap={'20px'}
                w={{ base: '90%', md: '55%', lg: '45%', xl: '35%' }}
                margin={'auto'}
                h={'auto'}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CiUser fontSize={'20px'} color="#E9813B" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    border="none"
                    shadow={'lg'}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                    fontSize={'14px'}
                    placeholder="Email"
                  />
                </InputGroup>

                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LuLock color="#E9813B" fontSize={'20px'} />
                  </InputLeftElement>
                  <Input
                    type={toggle ? 'password' : 'text'}
                    fontSize={'14px'}
                    border="none"
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                    shadow={'lg'}
                    placeholder="Type password"
                  />
                  <InputRightElement>
                    {toggle ? (
                      <LuEyeOff
                        cursor={'pointer'}
                        onClick={() => setToggle(!toggle)}
                      />
                    ) : (
                      <LuEye
                        cursor={'pointer'}
                        onClick={() => setToggle(!toggle)}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>

                <Button
                  bgColor={'#E77334'}
                  rounded={'full'}
                  _hover={'none'}
                  isLoading={loading}
                  onClick={login}
                  color={'white'}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
            <Box
              textAlign={'center'}
              fontSize={{ base: '12px', md: '14px', lg: '16px' }}
              fontFamily={'poppins'}
              fontWeight={'400'}
              cursor={'pointer'}
            >
              Dont have an account /{' '}
              <Text as={'span'} color={'#E9813B'} fontWeight={'bold'}>
                <Link to={'/signup'}>signup Now</Link>
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Login;
