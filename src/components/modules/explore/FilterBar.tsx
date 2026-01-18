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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get("maxPrice") ?? ""
  );
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get("minPrice") ?? ""
  );
  const [sort, setSort] = useState<string>(searchParams.get("sort") ?? "");

  const handleSearch = () => {
    const qs = new URLSearchParams();

    if (city) qs.set("city", city);
    if (category) qs.set("category", category);
    if (minPrice) qs.set("minPrice", minPrice);
    if (maxPrice) qs.set("maxPrice", maxPrice);
    if (sort) qs.set("sort", sort);

    router.push(`/explore?${qs.toString()}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-10">
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
      <Select onValueChange={(value) => setSort(value)} defaultValue="">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Low price to high</SelectItem>
          <SelectItem value="desc">High price to low</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Max Price"
        value={maxPrice || ""}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Min Price"
        value={minPrice || ""}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default FilterBar;
