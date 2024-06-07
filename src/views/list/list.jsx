import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react'
import ListTable from '../../components/listTable';
import { useSelector } from 'react-redux';
import { Currency } from '../../Data/data';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { GET, PUT } from '../../utils/ApiProvider';

const List = () => {
  const selector = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);
  const [mainData, setMainData] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch data from the server
  const getData = async () => {
    try {
      const res = await GET('/voucher/get', {
        Authorization: `Bearer ${user?.token}`,
      });
      setData(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle item change and open the modal
  const handleItemChange = (item) => {
    setMainData(item);
    onOpen();
  };

  // Calculate and set the currency data
  const calData = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    setMainData({
      ...mainData,
      voucherCurrency: selectedOption.text,
      exchangeRate: e.target.value,
    });
  };

  // Add a new item to the `item` array in `mainData`
  const addData = () => {
    if (
      !mainData.voucherDate ||
      !mainData.voucherCurrency ||
      !mainData.exchangeRate
    ) {
      toast({
        position: 'bottom-left',
        isClosable: true,
        duration: 5000,
        status: 'error',
        description: 'Empty field is not allowed',
      });
      return;
    }
    if (mainData) {
      const newItem = { account: '', type: 'debit', amount: '' }; // Adjust default values as needed
      setMainData((prev) => ({
        ...prev,
        item: [...(prev.item || []), newItem], // Use 'item' instead of 'items'
      }));
    }
  };

  // Handle input changes within the modal
  const handleInputChange = (index, field, value) => {
    setMainData((prev) => {
      const updatedItems = [...(prev.item || [])];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };
      return {
        ...prev,
        item: updatedItems,
      };
    });
  };

  const editData = async () => {
    try {
      const totalDebit = mainData?.item?.reduce(
        (acc, item) =>
          item.type === 'debit' ? acc + parseFloat(item.amount) : acc,
        0
      );
      const totalCredit = mainData?.item?.reduce(
        (acc, item) =>
          item.type === 'credit' ? acc + parseFloat(item.amount) : acc,
        0
      );

      if (Number(totalCredit) !== Number(totalDebit)) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'error',
          description: 'Debit and Credit amount should be equal',
        });
        return;
      }
      setLoadin(true);
      const res = await PUT(`/voucher/update/${mainData._id}`, mainData, {
        Authorization: `Bearer ${user?.token}`,
      });
      if (res.data.success) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: 'Voucher updated successfully',
        });
        getData();  
        setLoadin(false);
        onClose();
      }
      onClose();
      setLoadin(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadin(false);
    }
  };

  // Set user data from the Redux selector
  useEffect(() => {
    if (selector) {
      setUser(selector?.userReducer?.value);
    }
  }, [selector]);

  // Fetch data when the user changes
  useEffect(() => {
    if (user) {
      if (user?.token) {
        getData();
      }
    } else {
      navigate('/login');
    }
  }, [user]);

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={9} pb={10}>
            <Stack direction={'column'} gap={4}>
              <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Text fontWeight={'500'}>Voucher Date</Text>
                <Input
                  type="date"
                  onChange={(e) => {
                    setMainData({ ...mainData, voucherDate: e.target.value });
                  }}
                  value={mainData.voucherDate || ''}
                  placeholder="Voucher date"
                />
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Text fontWeight={'500'}>Voucher Currency</Text>
                <Select
                  placeholder={mainData?.voucherCurrency}
                  onChange={(e) => {
                    calData(e);
                  }}
                >
                  {Currency.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.curr}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={1}>
                <Text fontWeight={'500'}>Exchange Rate</Text>
                <Input
                  type="text"
                  value={`${mainData.exchangeRate}$`}
                  placeholder="Exchange rate"
                  readOnly
                />
              </Box>
              <Button
                size={'sm'}
                onClick={addData}
                _hover={'none'}
                bg={'#E9813B'}
                color={'white'}
              >
                ADD
              </Button>
              {mainData?.item?.length >0 ?
                mainData.item.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Stack>
                        <Stack direction={'row'}>
                          <Box flex={'1'}>
                            <Text>Account</Text>
                            <Input
                              type="text"
                              value={item.account}
                              placeholder="account"
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  'account',
                                  e.target.value
                                )
                              }
                            />
                          </Box>
                          <Box flex={'1'}>
                            <Text>Type</Text>
                            <Select
                              value={item.type}
                              placeholder={item.type}
                              onChange={(e) =>
                                handleInputChange(index, 'type', e.target.value)
                              }
                            >
                              <option value="debit">Debit</option>
                              <option value="credit">Credit</option>
                            </Select>
                          </Box>
                        </Stack>
                        <Box>
                          <Text>Amount</Text>
                          <Input
                            type="number"
                            value={item.amount}
                            placeholder="Amount"
                            onChange={(e) =>
                              handleInputChange(index, 'amount', e.target.value)
                            }
                          />
                        </Box>
                      </Stack>
                      <Box
                        bg={'gray.200'}
                        my={3}
                        width={'100%'}
                        height={'2px'}
                      ></Box>
                    </Box>
                  );
                }):<Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Spinner />
                  </Box>}

              <Button
                bg={'#E9813B'}
                size={'sm'}
                color={'white'}
                _hover={'none'}
                isLoading={loading}
                onClick={() => editData()}
              >
                EDIT
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ListTable items={data} handleItemChange={handleItemChange} />
    </Box>
  );
};

export default List;
