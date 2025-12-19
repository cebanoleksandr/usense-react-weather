import { useState, type FC, type HTMLAttributes, type KeyboardEvent } from "react";
import cn from "classnames";
import Input from "./Input";
import Button from "./Button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  onSearch: (search: string) => void;
}

const Search: FC<IProps> = ({ onSearch, className, ...rest }) => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search);
    }
  }

  return (
    <div { ...rest } className={cn('relative w-full lg:w-80', className)}>
      <Input
        className="w-full pr-15"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        className="absolute top-0 right-0 bottom-0 size-10 rounded-r-full"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="size-5 -mx-1.5 -my-1" />
      </Button>
    </div>
  )
}

export default Search;
