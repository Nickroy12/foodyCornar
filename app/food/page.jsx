"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { AnimatePresence , motion} from "framer-motion";

const FoodsCC = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]); // ✅ original data
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/food.json");
        const data = await res.json();

        setFoods(data.data);
        setAllFoods(data.data); // ✅ save original
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔍 Search
  const handleSearch = () => {
    let current = allFoods;

    if (search) {
      current = current.filter((food) =>
        food.dish_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 👉 filter থাকলে সেটাও apply
    if (filter && filter !== "All Categories") {
      current = current.filter(
        (food) => food.category.toLowerCase() === filter.toLowerCase()
      );
    }

    setFoods(current);
  };

  // 🎯 Filter
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);

    let current = allFoods;

    if (value !== "All Categories") {
      current = current.filter(
        (food) => food.category.toLowerCase() === value.toLowerCase()
      );
    }

    // 👉 search থাকলে সেটাও apply
    if (search) {
      current = current.filter((food) =>
        food.dish_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFoods(current);
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Discover Delicious Foods 🍔
        </h1>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-4 z-10 p-4 rounded-2xl shadow-lg border border-zinc-200">
          
          <input
            type="text"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3 outline-none rounded-xl"
          />

          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-orange-500 rounded-xl text-white"
          >
            Search
          </button>

          <select
            className="px-5 py-3 rounded-xl"
            onChange={handleFilter}
          >
            <option>All Categories</option>
            <option>Platter</option>
            <option>Chicken</option>
            <option>Vegetable</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-xl text-zinc-500">
              Loading delicious foods...
            </p>
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center text-zinc-500 text-lg">
            No foods found 😢
          </div>
        ) : (
          <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {foods.map((d) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Card d={d} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodsCC;