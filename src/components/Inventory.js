"use client";

import { useState } from "react";
import Image from "next/image";

const inventory = [
  { id: 1, name: "Gildan T-Shirt - Red / M", quantity: 13, color: "red" },
  { id: 2, name: "Gildan T-Shirt - Red / L", quantity: 46, color: "red" },
  { id: 3, name: "Gildan T-Shirt - Black / S", quantity: 21, color: "black" },
  { id: 4, name: "Gildan T-Shirt - Black / M", quantity: 34, color: "black" },
  { id: 5, name: "Gildan T-Shirt - Black / L", quantity: 27, color: "black" },
  { id: 6, name: "Gildan T-Shirt - White / S", quantity: 34, color: "white" },
  { id: 7, name: "Gildan T-Shirt - White / M", quantity: 51, color: "white" },
  { id: 8, name: "Gildan T-Shirt - White / L", quantity: 29, color: "white" },
];

export default function Inventory() {
  const LOW_STOCK_THRESHOLD = 24;
  const [inventoryState, setInventoryState] = useState(inventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', or null
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    colors: [],
    sizes: [],
    stock: null, // 'low' or 'normal'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    color: "black",
    size: "M",
    quantity: 0,
  });

  // Filter inventory based on search query and active filters
  const filteredInventory = inventoryState.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(item.color);
    const matchesSize =
      activeFilters.sizes.length === 0 ||
      activeFilters.sizes.includes(item.name.split("/")[1].trim());
    const matchesStock =
      !activeFilters.stock ||
      (activeFilters.stock === "low"
        ? item.quantity <= LOW_STOCK_THRESHOLD
        : item.quantity > LOW_STOCK_THRESHOLD);

    return matchesSearch && matchesColor && matchesSize && matchesStock;
  });

  // Sort filtered inventory if sort order is set
  const sortedInventory = sortOrder
    ? [...filteredInventory].sort((a, b) => {
        return sortOrder === "asc"
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      })
    : filteredInventory;

  const isLowStock = (quantity) => quantity <= LOW_STOCK_THRESHOLD; //checks if below 24

  const updateQuantity = (id, increment) => {
    setInventoryState((prevState) =>
      prevState.map(
        (item) =>
          item.id === id //if item id matches
            ? { ...item, quantity: item.quantity + increment } //copy item, update quantity
            : item //otherwise keep item the same
      )
    );
  };

  const handleAddItem = () => {
    // Create new item with unique ID
    const newId = Math.max(...inventoryState.map((item) => item.id)) + 1;
    const formattedItem = {
      id: newId,
      name: `Gildan T-Shirt - ${
        newItem.color.charAt(0).toUpperCase() + newItem.color.slice(1)
      } / ${newItem.size}`,
      quantity: parseInt(newItem.quantity),
      color: newItem.color,
    };

    // Validate quantity is a positive number
    if (formattedItem.quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    setInventoryState((prev) => [...prev, formattedItem]);
    setShowAddModal(false);
    setNewItem({ name: "", color: "black", size: "M", quantity: 0 }); // Reset form
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Materials <span className="text-gray-400">/ Blanks</span>
        </h2>
        <div>
          <button className="px-3 py-1 border rounded-l-md bg-white">
            Inventory
          </button>
          <button className="px-3 py-1 border-t border-b border-r rounded-r-md text-gray-500">
            Order Queue
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <div className="border rounded-lg bg-white shadow p-4">
        {/* Search Controls */}
        <div className="flex justify-between mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search Materials"
              className="w-80 px-3 py-1 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* Filter Button */}
            <div className="relative">
              <button
                className="px-2 py-1 border rounded-md"
                onClick={() => setShowFilters(!showFilters)}
              >
                ≡
              </button>
              {showFilters && (
                <div className="absolute top-full mt-1 left-0 bg-white border rounded-md shadow-lg p-4 min-w-[200px] z-10">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Colors</h3>
                      {["red", "black", "white"].map((color) => (
                        <label key={color} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={activeFilters.colors.includes(color)}
                            onChange={(e) => {
                              setActiveFilters((prev) => ({
                                ...prev,
                                colors: e.target.checked
                                  ? [...prev.colors, color]
                                  : prev.colors.filter((c) => c !== color),
                              }));
                            }}
                          />
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </label>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Sizes</h3>
                      {["S", "M", "L"].map((size) => (
                        <label key={size} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={activeFilters.sizes.includes(size)}
                            onChange={(e) => {
                              setActiveFilters((prev) => ({
                                ...prev,
                                sizes: e.target.checked
                                  ? [...prev.sizes, size]
                                  : prev.sizes.filter((s) => s !== size),
                              }));
                            }}
                          />
                          {size}
                        </label>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Stock Status</h3>
                      <select
                        className="w-full border rounded-md px-2 py-1"
                        value={activeFilters.stock || ""}
                        onChange={(e) => {
                          setActiveFilters((prev) => ({
                            ...prev,
                            stock: e.target.value || null,
                          }));
                        }}
                      >
                        <option value="">All</option>
                        <option value="low">Low Stock</option>
                        <option value="normal">Normal Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Button */}
            <button
              className="px-2 py-1 border rounded-md"
              onClick={() => {
                setSortOrder((current) => {
                  if (!current) return "asc";
                  if (current === "asc") return "desc";
                  return null;
                });
              }}
            >
              ⇅
            </button>
          </div>
          <button
            className="px-3 py-1 bg-indigo-600 text-white rounded-md"
            onClick={() => setShowAddModal(true)}
          >
            + Add New
          </button>
        </div>

        {/* Inventory Items */}
        <div className="space-y-4">
          {sortedInventory.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              {/* Left Section: Icon and Item Name */}
              <div className="flex items-center gap-3 flex-1">
                {item.color === "white" ? (
                  <div className="w-8 h-8 relative rounded-md border bg-black">
                    <div className="w-full h-full flex items-center justify-center p-0.5">
                      <Image
                        src="/images/white_gildan.jpg"
                        alt="White T-shirt"
                        width={28}
                        height={28}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 relative rounded-md border bg-white">
                    {item.color === "red" ? (
                      <div className="w-full h-full flex items-center justify-center p-1">
                        <Image
                          src="/images/gildan_redwebp.webp"
                          alt="Red T-shirt"
                          width={32}
                          height={32}
                          className="rounded-md"
                        />
                      </div>
                    ) : item.color === "black" ? (
                      <div className="w-full h-full flex items-center justify-center p-1">
                        <Image
                          src="/images/gildan_black.jpg"
                          alt="Black T-shirt"
                          width={20}
                          height={20}
                          className="rounded-md"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
                <span className="text-base font-medium">{item.name}</span>
              </div>

              {/* Right Section: Quantity Controls */}
              <div className="flex items-center">
                <div className="flex border rounded">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <div
                    className={`flex flex-col items-center ${
                      isLowStock(item.quantity)
                        ? "border-x border-t border-[#C6A963]"
                        : "border-x border-t"
                    }`}
                  >
                    <div
                      className={`w-full px-4 py-1 flex justify-center ${
                        isLowStock(item.quantity) ? "bg-[#FDF7E7]" : ""
                      }`}
                    >
                      <span className="text-lg">{item.quantity}</span>
                    </div>
                    <div
                      className={`w-full py-1 flex justify-center ${
                        isLowStock(item.quantity)
                          ? "bg-[#C6A963]"
                          : "bg-gray-100"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          isLowStock(item.quantity)
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {LOW_STOCK_THRESHOLD} PCS
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Item</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select
                  value={newItem.color}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-full border rounded-md px-3 py-1.5"
                >
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="red">Red</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  value={newItem.size}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, size: e.target.value }))
                  }
                  className="w-full border rounded-md px-3 py-1.5"
                >
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      quantity: Math.max(1, parseInt(e.target.value) || 0),
                    }))
                  }
                  className="w-full border rounded-md px-3 py-1.5"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-3 py-2 border rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newItem.quantity || newItem.quantity < 1}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
