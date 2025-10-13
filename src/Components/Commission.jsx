import React, { useState } from "react"

export default function Commission() {
  const [entries, setEntries] = useState([])
  const [currentName, setCurrentName] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")

  // Add a new entry to the list
  const addEntry = () => {
    if (currentName.trim() && currentAmount.trim()) {
      const newEntry = {
        id: Date.now(), // Simple ID generation
        name: currentName.trim(),
        amount: parseFloat(currentAmount) || 0,
      }
      setEntries([...entries, newEntry])
      setCurrentName("")
      setCurrentAmount("")
    }
  }

  // Add half day ($100)
  const addHalfDay = () => {
    const newEntry = {
      id: Date.now(),
      name: "Half Day",
      amount: 100,
    }
    setEntries([...entries, newEntry])
  }

  // Add full day ($200)
  const addFullDay = () => {
    const newEntry = {
      id: Date.now(),
      name: "Full Day",
      amount: 200,
    }
    setEntries([...entries, newEntry])
  }

  // Remove an entry
  const removeEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  // Calculate total
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0)

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addEntry()
    }
  }

  return (
    <div className="commission-container max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Commission Calculator
      </h2>

      {/* Quick Add Buttons */}
      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <button
            onClick={addHalfDay}
            className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors font-medium"
          >
            Half Day - $100
          </button>
          <button
            onClick={addFullDay}
            className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors font-medium"
          >
            Full Day - $200
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name/Description
            </label>
            <input
              type="text"
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter name or description"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={(e) => e.target.select()}
              placeholder="Amount"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={addEntry}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-medium"
          disabled={!currentName.trim() || !currentAmount.trim()}
        >
          Add Entry
        </button>
      </div>

      {/* Entries List */}
      {entries.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Entries</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {entry.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">
                    ${entry.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                    title="Remove entry"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-800">Total:</span>
          <span className="text-green-600">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
