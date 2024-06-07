/* eslint-disable react/prop-types */

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';

const Vouchertable = ({ items = [], handleItemChange }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead bg={'#E9813B'} color={'white'}>
          <Tr>
            <Th color={'white'}>Account</Th>
            <Th color={'white'}>Type</Th>
            <Th color={'white'}>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    placeholder="Account"
                    value={item.account}
                    onChange={(e) => handleItemChange(index, 'account', e.target.value)}
                  />
                </Td>
                <Td>
                  <Select
                    value={item.type}
                    onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                  >
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                  </Select>
                </Td>
                <Td>
                  <Input
                    type="number"
                    width={'fit-content'}
                    placeholder="0"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="3">
                <Text>No data found</Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Vouchertable;
