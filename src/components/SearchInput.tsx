import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  placeholder?: string;
  query: string;
  onChange: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  query,
  onChange
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <InputGroup>
      <Input
        id='search-input'
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <InputRightElement>
        <Box as='label' _hover={{ color: "blue" }} htmlFor='search-input'>
          <FaSearch size={16} />
        </Box>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
