import PropTypes from 'prop-types';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
  Drawer,
  DrawerContent,
  HStack,
  VStack,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiChevronDown } from 'react-icons/fi';
import { IoCreateOutline } from 'react-icons/io5';
import { CiViewList } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/' },
  { name: 'Create Voucher', icon: IoCreateOutline, link: '/create' },
  { name: 'List', icon: CiViewList,link:"/list"},
];


function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={"white"}>
      <SidebarContent
        onClose={onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

SidebarWithHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

function SidebarContent({ onClose, ...rest }) {
  const [data, setData] = useState('Home');

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Box
          key={link.name}
          onClick={() => {
            setData(link.name);
          }}
        >
          <NavItem key={link.name} link={link.link} data={data} icon={link.icon}>
            {link.name}
          </NavItem>
        </Box>
      ))}
    </Box>
  );
}

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

function NavItem({ icon, children, data, link,...rest }) {
  NavItem.propTypes = {
    icon: PropTypes.elementType,
    children: PropTypes.node.isRequired,
    data: PropTypes.string.isRequired,
    link:PropTypes.string.isRequired
  };

  return (
    <Link
      to={link}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={children ===data ? '#E9813B' : ''}
        color={children === data ? 'white' : ''}
        _hover={{
          bg: '#E9813B',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            color={children === data ? 'white' : ''}
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
}

NavItem.propTypes = {
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};

function MobileNav({ onOpen, ...rest }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector(state=>state);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
              <Avatar name={selector?.userReducer?.value?.user?.name} src='https://bit.ly/broken-link' />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{selector?.userReducer?.value?.user?.name}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={()=>{dispatch(logout());navigate("/login")}}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export { SidebarWithHeader, SidebarContent, NavItem, MobileNav };
