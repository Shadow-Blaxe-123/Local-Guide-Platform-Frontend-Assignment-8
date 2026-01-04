"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function FilterBar() {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  // Filter Bar

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
      <Input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <Select onValueChange={(value) => setCategory(value)} defaultValue="">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CULTURAL">Cultural</SelectItem>
          <SelectItem value="FOOD">Food</SelectItem>
          <SelectItem value="ADVENTURE">Adventure</SelectItem>
          <SelectItem value="RELIGIOUS">Religious</SelectItem>
          <SelectItem value="NATURE">Nature</SelectItem>
          <SelectItem value="HISTORICAL">Historical</SelectItem>
          <SelectItem value="OTHER">Other</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice || ""}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice || ""}
        onChange={(e) => setMinPrice(Number(e.target.value))}
      />

      <Button
        onClick={() =>
          console.log("Search clicked", { city, category, maxPrice })
        }
      >
        Search
      </Button>
    </div>
  );
}

export default FilterBar;
