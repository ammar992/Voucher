import { Box, Input, Select, Stack, Text } from '@chakra-ui/react';
import Vouchertable from '../../components/table';
import MainButton from '../../components/Button';
import { useToast } from '@chakra-ui/react';
import { Currency } from '../../Data/data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { POST } from '../../utils/ApiProvider';
const CreateVoucer = () => {
  const toast = useToast();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    voucherDate: '',
    voucherCurrency: '',
    exchangeRate: '0',
  });

  const [items, setItems] = useState([]);
  const selector = useSelector((state) => state);

  const addItem = () => {
    if (!data.voucherDate || !data.voucherCurrency || !data.exchangeRate) {
      toast({
        position: 'bottom-left',
        isClosable: true,
        duration: 5000,
        status: 'error',
        description: 'Empty field is not allowed',
      });
      return;
    }

    if (items.length <= 0) {
      setItems([
        ...items,
        { account: '', type: 'debit', amount: '' },
        { account: '', type: 'credit', amount: '' },
      ]);
    } else {
      setItems([...items, { account: '', type: 'debit', amount: '' }]);
    }
  };

  const calData = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    // const selectedCurrency = {
    //   value: e.target.value,
    //   name: selectedOption.text,
    // };

    setData({
      ...data,
      voucherCurrency: selectedOption.text,
      exchangeRate: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const sendData = async () => {
    try {
      setLoading(true);
      const totalDebit = items.reduce(
        (acc, item) =>
          item.type === 'debit' ? acc + parseFloat(item.amount) : acc,
        0
      );
      const totalCredit = items.reduce(
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

      const newData = {
        ...data,
        user: user?.user?._id,
        item: items,
      };
      const res = await POST('/voucher/create', newData, {
        Authorization: `Bearer ${user?.token}`,
      });
      console.log(res);
      if (res?.data?.success) {
        toast({
          position: 'bottom-left',
          isClosable: true,
          duration: 5000,
          status: 'success',
          description: 'Voucher created successfully',
        });
        setData({
          voucherDate: '',
          voucherCurrency: '',
          exchangeRate: '0',
        });
        setItems([]);
      }
      return;
    } catch (error) {
      console.log('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selector) {
      setUser(selector?.userReducer?.value);
    }
  }, [selector]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  return (
    <Box display={'flex'} flexDirection={'column'} gap={5}>
      <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex={'1'}>
          <Text
            fontFamily={'poppins'}
            mb={1}
            fontSize={'15px'}
            fontWeight={'500'}
          >
            Voucher date{' '}
          </Text>
          <Input
            type="date"
            value={data.voucherDate}
            onChange={(e) => {
              setData({ ...data, voucherDate: e.target.value });
            }}
            placeholder="23343434 4343434 4"
          />
        </Box>
        <Box flex={'1'}>
          <Text
            fontFamily={'poppins'}
            mb={1}
            fontSize={'15px'}
            fontWeight={'500'}
          >
            Voucher currency
          </Text>
          <Select
            placeholder="select a currency"
            onChange={(e) => {
              calData(e);
            }}
          >
            {Currency.length > 0
              ? Currency.map((item) => {
                  return (
                    <option key={item.curr} value={item.value}>
                      {item.curr}
                    </option>
                  );
                })
              : 'No data found'}
          </Select>
        </Box>
      </Stack>
      <Stack gap={4} direction={{ base: 'column', md: 'row' }}>
        <Box flex={'1'}>
          <Text
            fontFamily={'poppins'}
            mb={1}
            fontSize={'15px'}
            fontWeight={'500'}
          >
            Exchange Rate
          </Text>
          <Input type="text" value={`${data?.exchangeRate}$`} placeholder="1" />
        </Box>
        <Box flex={'1'}></Box>
      </Stack>
      <Box display={'flex'} justifyContent={'flex-end'}>
        {' '}
        <MainButton func={addItem} name={'ADD'} />
      </Box>
      <Vouchertable
        sendData={sendData}
        handleItemChange={handleItemChange}
        items={items}
      />
      <MainButton loading={loading} func={sendData} name="SAVE" />
    </Box>
  );
};

export default CreateVoucer;
