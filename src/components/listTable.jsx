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
    Text,
  } from '@chakra-ui/react';
  import { FaEdit } from "react-icons/fa";

  const ListTable = ({ items = [],handleItemChange, }) => {

    return (
      <> 
      <TableContainer>
        <Table variant="simple">
          <Thead bg={'#E9813B'} color={'white'}>
            <Tr>
              <Th color={'white'}>Voucher Date</Th>
              <Th color={'white'}>Voucher Currency</Th>
              <Th color={'white'}>Exchange Rate</Th>
              <Th color={'white'}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items?.length > 0 ? (
              items?.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      type="text"
                      placeholder="Voucher Date"
                      value={item?.voucherDate}
                    />
                  </Td>
                  <Td>
                  <Input
                      type="text"
                      placeholder="voucher Currency"
                      value={item?.voucherCurrency}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="string"
                      width={'fit-content'}
                      placeholder="0"
                      value={`${item.exchangeRate}$`}
                    />
                  </Td>
                  <Td>
                    <FaEdit cursor={"pointer"} onClick={()=>{handleItemChange(item)}} />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="4">
                  <Text>No data found</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      </>
    );
  };
  
  export default ListTable;
  