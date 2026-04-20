"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/Card";

const FoodsCC = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/food.json"); // use / not ./
        const data = await res.json();
        setFoods(data.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-4xl font-bold mb-8 text-center">
          Discover Delicious Foods 🍔
        </h1>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 sticky top-4 z-10 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800">
          
          <input
            type="text"
            placeholder="Search foods..."
            className="flex-1 px-5 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
          />

          <button className="px-6 py-3 bg-orange-500 text-white rounded-xl">
            Search
          </button>

          <select className="px-5 py-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
            <option>All Categories</option>
            <option>Burger</option>
            <option>Pizza</option>
            <option>Dessert</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-xl text-zinc-500">
              Loading delicious foods...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((d) => (
              <Card key={d.id} d={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodsCC;