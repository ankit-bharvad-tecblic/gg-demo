import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Switch,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Checkbox,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { GrAddCircle } from "react-icons/gr";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  //   ColumnDef,
  //   SortingState,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsArrowDownUp } from "react-icons/bs";
import { BsArrowDown, BsArrowUp, BsPlusCircle, BsSearch } from "react-icons/bs";

// const columnHelper = createColumnHelper();

// const columns = [
//   columnHelper.accessor("no", {
//     cell: (info) => info.getValue(),
//     header: "SR. NO",
//   }),
//   columnHelper.accessor("name", {
//     cell: (info) => info.getValue(),
//     header: "COMMODITY NAME",
//   }),
//   columnHelper.accessor("type", {
//     cell: (info) => info.getValue(),
//     header: "COMMODITY TYPE",
//   }),
//   columnHelper.accessor("tax", {
//     cell: (info) => info.getValue(),
//     header: "TAX",
//     meta: {
//       isNumeric: true,
//     },
//   }),
//   columnHelper.accessor("igst", {
//     cell: (info) => info.getValue(),
//     header: "IGST",
//     meta: {
//       isNumeric: true,
//     },
//   }),
//   columnHelper.accessor("sgst", {
//     cell: (info) => info.getValue(),
//     header: "SGST",
//     meta: {
//       isNumeric: true,
//     },
//   }),
//   columnHelper.accessor("cgst", {
//     cell: (info) => info.getValue(),
//     header: "CGST",
//     meta: {
//       isNumeric: true,
//     },
//   }),
//   columnHelper.accessor("max_size", {
//     cell: (info) => info.getValue(),
//     header: "MAXIMUM BAG SIZE",
//   }),
//   columnHelper.accessor("min_size", {
//     cell: (info) => info.getValue(),
//     header: "MINIMUM BAG SIZE",
//   }),
//   columnHelper.accessor("active", {
//     header: "ACTIVE/DEACTIVE",
//   }),
//   columnHelper.accessor("", {
//     header: "UPDATE",
//   }),
// ];

// const data = [
//   {
//     no: "1",
//     name: "xyz",
//     type: "new",
//     tax: "20%",
//     igst: "20%",
//     sgst: "20%",
//     cgst: "30%",
//     max_size: "10 Kg",
//     min_size: "3 kg",
//     active: true,
//   },
// ];

function FunctionalTable({ setFilter, filterFields, columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  const handleFilterChange = (e, index) => {
    let isChecked = e.target.checked;
    const updatedFilterFields = [...filterFields];
    updatedFilterFields[index].isActiveFilter = isChecked;
    console.log(updatedFilterFields);

    const activeFilterValues = updatedFilterFields
      .filter((field) => field.isActiveFilter) // Filter the objects where isActiveFilter is true
      .map((field) => Object.values(field)[0]); // Get the values of the filtered objects

    console.log(activeFilterValues);

    setFilter((prev) => ({
      ...prev,
      filter: activeFilterValues,
    }));
  };

  const onSearch = (e) => {
    setFilter((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  console.log("table.loading --> ", table);

  return (
    <Box
      mt="70px"
      border="0px"
      p="30px"
      borderRadius="15px"
      background="#ffffff"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap="5px" alignItems="center">
          <Select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            size="xs"
            borderRadius="8px"
            bg="#5E63661433"
            border="0px"
            color="#8B8D97"
            fontWeight="semibold"
          >
            {[10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
          <Text color="#ADB8CC" fontSize="sm" flex="none">
            ITEM PER PAGE
          </Text>
        </Flex>

        <Flex gap="20px" flex="none">
          <Button
            leftIcon={<BsPlusCircle bg="#ADB8CC" />}
            colorScheme="gray.300"
            variant="outline"
            p="0px 40px"
            height="43px"
            borderRadius="15px"
            color="#ADB8CC"
          >
            Add Details
          </Button>
          <Popover autoFocus={false}>
            <PopoverTrigger>
              <Flex
                border="1px solid #ADB8CC"
                gap="5px"
                width="200px"
                alignItems="center"
                justifyContent="space-between"
                borderRadius="15px"
                padding="10px 10px"
                cursor="pointer"
              >
                <Text fontSize="14px" color="#ADB8CC">
                  Employee id, Username{" "}
                </Text>
                <AiOutlineCloseCircle color="#ADB8CC" />
              </Flex>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader fontSize="sm" pl="35px">
                Filter
              </PopoverHeader>
              <PopoverBody bg="#FAFFEE">
                {filterFields.map((field, index) => {
                  const keyName = Object.keys(field)[0];
                  console.log(keyName);
                  return (
                    <Flex
                      key={index}
                      justifyContent="space-between"
                      p="12px 0px"
                      alignItems="center"
                      bg="#FAFFEE"
                    >
                      <Text fontSize="sm"> {keyName} </Text>
                      <Checkbox
                        size="md"
                        onChange={(e) => handleFilterChange(e, index)}
                        name={keyName}
                        outline={"red"}
                        isFocusable={false}
                        colorScheme="green"
                      />
                    </Flex>
                  );
                })}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <InputGroup
            width="200px"
            borderRadius="15px"
            variant="custom"
            border="1px solid #E2E8F0"
          >
            <InputLeftElement pointerEvents="none">
              <BsSearch color="#A0AEC0" />
            </InputLeftElement>
            <Input
              type="search"
              onChange={(e) => onSearch(e)}
              placeholder="type here...."
              color="#A0AEC0"
              fontWeight="600"
              borderRadius="15px"
            />
          </InputGroup>
        </Flex>
      </Flex>

      <Table mt="15px">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                    p="12px 0px"
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="bold"
                    color="black"
                    cursor="pointer"
                  >
                    <Flex
                      gap="7px"
                      justifyContent="center"
                      alignContent="center"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <Flex>
                            <BsArrowDown color="#000000" fontSize="14px" />
                            <Box ml="-7px">
                              <BsArrowUp color="#B6B7BC" fontSize="14px" />
                            </Box>
                          </Flex>
                        ) : (
                          // <TriangleDownIcon aria-label="sorted descending" />
                          <Flex>
                            <BsArrowDown color="#B6B7BC" fontSize="14px" />
                            <Box ml="-7px">
                              <BsArrowUp color="#000000" fontSize="14px" />
                            </Box>
                          </Flex>
                        )
                      ) : (
                        <Flex>
                          <BsArrowDown color="#B6B7BC" fontSize="14px" />
                          <Box ml="-7px">
                            <BsArrowUp color="#B6B7BC" fontSize="14px" />
                          </Box>
                        </Flex>
                      )}
                    </Flex>

                    {/* <chakra.span pl="4">
                      <BsArrowDownUp />
                     {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span> */}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table?.getRowModel().rows?.length === 0 && (
            <Tr>
              <Td colSpan={6}>
                <Box width="full">
                  <Text textAlign="center" color="#A6CE39">
                    Not Found
                  </Text>
                </Box>
              </Td>
            </Tr>
          )}
          {table?.getRowModel().rows?.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = cell.column.columnDef.meta;
                return (
                  <Td
                    key={cell.id}
                    isNumeric={meta?.isNumeric}
                    p="20px 0px"
                    textAlign="center"
                    fontSize="14px"
                    color="#718096"
                  >
                    {cell.column.id === "UPDATE" ? (
                      <Flex justifyContent="center">
                        <BiEditAlt
                          color="#A6CE39"
                          fontSize="26px"
                          cursor="pointer"
                        />
                      </Flex>
                    ) : cell.column.id === "active" ? (
                      <Switch
                        size="md"
                        colorScheme="whatsapp"
                        // isReadOnly
                        // isChecked={flexRender(
                        //   cell.column.columnDef.cell,
                        //   cell.getContext()
                        // )}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="end" mt="45px" gap="3px">
        <Button
          variant="ghost"
          p="5px"
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button p="5px" color="#F08F1A" bg="#FEF4E8" borderRadius="4px">
          1
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          2
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          3
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          4
        </Button>
        <Button isDisabled="true" p="5px" variant="ghost">
          5
        </Button>
        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          isDisabled={
            !table.getCanNextPage() ||
            table.getState().pagination.pageIndex + 1 === table.getPageCount()
          }
        >
          {">"}
        </Button>
      </Flex>
    </Box>
  );
}

export default FunctionalTable;
