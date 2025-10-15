import { useState } from "react"
import colors from "../Components/Colors"
import Commission from "../Components/Commission"

export default function ClosetEstimator() {
  const items = [
    { id: 1, name: "Unit", price: 200 },
    { id: 2, name: "Unit Large", price: 300 },
    { id: 3, name: "Drawer (Small)", price: 100 },
    { id: 4, name: "Drawer (Large)", price: 150 },
    { id: 5, name: "Hanging", price: 175 },
    { id: 6, name: "Doors (Full)", price: 100 },
    { id: 7, name: "Doors (Half)", price: 75 },
    { id: 8, name: "TS", price: 100 },
    { id: 9, name: "Extra TS", price: 150 },
    { id: 10, name: "WTS", price: 200 },
    { id: 11, name: "Extra WTS", price: 300 },
    { id: 12, name: "Valet", price: 50 },
    { id: 13, name: "Tie Rack", price: 50 },
    { id: 14, name: "Belt Rack", price: 50 },
    { id: 15, name: "Hamper", price: 225 },
    { id: 16, name: "Legs", price: 10 },
    { id: 17, name: "Touch Latch", price: 10 },
    { id: 18, name: "Gold Rod", price: 25 },
    { id: 19, name: "Black Rod", price: 25 },
    { id: 20, name: "Pull-Down Hanging", price: 300 },
    { id: 21, name: "A/S with Hanging", price: 225 },
    { id: 22, name: "Corner Unit", price: 400 },
    { id: 23, name: "Black Handles", price: 10 },
  ]

  const accessories = [
    { id: 1, name: "Valet", price: 150 },
    { id: 2, name: "Tie Rack", price: 75 },
    { id: 3, name: "Belt Rack", price: 75 },
  ]

  const [commissionRate, setCommissionRate] = useState(0.15)
  const [rooms, setRooms] = useState([
    {
      id: 1,
      items: [],
      name: "",
      isEditingName: true,
      hasColor: false,
      selectedColor: "",
      isMinimized: false,
    },
  ])
  const [currentView, setCurrentView] = useState("home") // "home" or "commission"
  const [paymentType, setPaymentType] = useState("credit") // "cash" or "credit"
  const [showAdminFee, setShowAdminFee] = useState(true) // Administrative fee toggle
  const [showCOI, setShowCOI] = useState(false) // COI Required toggle
  const [showCommission, setShowCommission] = useState(false) // Commission section toggle
  const [designChanges, setDesignChanges] = useState(1) // Design changes counter

  // Add a new room
  const addRoom = () => {
    setRooms([
      ...rooms,
      {
        id: rooms.length + 1,
        items: [],
        name: "",
        isEditingName: true,
        hasColor: false,
        selectedColor: "",
        isMinimized: false,
      },
    ])
  }

  // Remove a room
  const removeRoom = (roomId) => {
    if (rooms.length > 1) {
      // Prevent removing the last room
      setRooms((prev) => prev.filter((room) => room.id !== roomId))
    }
  }

  // Add an item to a room
  const addItemToRoom = (roomId, itemId, quantity) => {
    setRooms((prev) =>
      prev.map((room) => {
        if (room.id !== roomId) return room

        const existingItemIndex = room.items.findIndex(
          (item) => item.itemId === itemId
        )

        if (existingItemIndex !== -1) {
          const updatedItems = [...room.items]
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity:
              updatedItems[existingItemIndex].quantity +
              (parseInt(quantity) || 1),
          }
          return { ...room, items: updatedItems }
        } else {
          return {
            ...room,
            items: [
              ...room.items,
              { itemId, quantity: parseInt(quantity) || 1 },
            ],
          }
        }
      })
    )
  }

  const updateRoomName = (roomId, name) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === roomId ? { ...room, name } : room))
    )
  }

  const toggleRoomNameEdit = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, isEditingName: !room.isEditingName }
          : room
      )
    )
  }

  const saveRoomName = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, isEditingName: false } : room
      )
    )
  }

  const toggleRoomMinimize = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, isMinimized: !room.isMinimized } : room
      )
    )
  }

  const toggleRoomColor = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, hasColor: !room.hasColor } : room
      )
    )
  }

  const updateRoomColor = (roomId, color) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, selectedColor: color } : room
      )
    )
  }

  const removeItemFromRoom = (roomId, index) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId
          ? { ...room, items: room.items.filter((_, i) => i !== index) }
          : room
      )
    )
  }

  const calculateRoomTotal = (room) => {
    return room.items.reduce((sum, entry) => {
      const item = items.find((i) => i.id === entry.itemId)
      if (!item) return sum
      const base = item.price * entry.quantity

      if (room.hasColor) {
        // When color is enabled: 20% for color + 20% commission
        const colorCost = base * 0.2
        const commission = base * 0.2
        return sum + base + colorCost + commission
      } else {
        // When no color: use normal commission rate
        const commission = base * commissionRate
        return sum + base + commission
      }
    }, 0)
  }

  const subtotal = rooms.reduce(
    (sum, room) => sum + calculateRoomTotal(room),
    0
  )

  // Administrative fee
  const adminFee = showAdminFee ? 250 : 0

  // COI Required fee
  const coiFee = showCOI ? 250 : 0

  // Design changes fee (each change above 1 costs $20)
  const designChangesFee = designChanges > 1 ? (designChanges - 1) * 20 : 0

  // Commission calculation (commission + 1/2 admin fee + all design changes)
  const commissionFromRooms = rooms.reduce((sum, room) => {
    return (
      sum +
      room.items.reduce((roomSum, entry) => {
        const item = items.find((i) => i.id === entry.itemId)
        if (!item) return roomSum
        const base = item.price * entry.quantity

        if (room.hasColor) {
          // When color is enabled: 20% commission (not 20% + 20%)
          return roomSum + base * 0.2
        } else {
          // Normal commission rate
          return roomSum + base * commissionRate
        }
      }, 0)
    )
  }, 0)

  const myCommission = commissionFromRooms + adminFee * 0.5 + designChangesFee

  const subtotalWithFees = subtotal + adminFee + coiFee + designChangesFee

  const tax = paymentType === "credit" ? subtotalWithFees * 0.07 : 0
  const taxSavings = paymentType === "cash" ? subtotalWithFees * 0.07 : 0
  const total =
    paymentType === "credit" ? subtotalWithFees + tax : subtotalWithFees

  // Render Commission view
  if (currentView === "commission") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-4xl">
          {/* Back to Home Button */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setCurrentView("home")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              ← Back to Estimate
            </button>
          </div>

          {/* Commission Component */}
          <Commission />
        </div>
      </div>
    )
  }

  // Default: Render Home view
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8">
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-gray-900 tracking-wide cursor-pointer select-none hover:text-indigo-700 transition-colors duration-200"
          onClick={() => setShowCommission(!showCommission)}
          title="Click to toggle commission details"
        >
          Organizers Unlimited {showCommission && "💰"}
        </h1>

        {/* Commission Selector */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Client Source
          </label>
          <select
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={commissionRate}
            onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
          >
            <option value={0.15}>Joel's Client</option>
            <option value={0.2}>My Client</option>
          </select>
        </div>

        {/* Design Changes Counter */}
        <div className="mb-6 sm:mb-8 text-center">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Design Changes
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setDesignChanges(Math.max(1, designChanges - 1))}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-lg sm:text-base"
            >
              -
            </button>
            <span className="text-xl sm:text-lg font-medium text-gray-900 min-w-[2.5rem] sm:min-w-[2rem] text-center">
              {designChanges}
            </span>
            <button
              onClick={() => setDesignChanges(designChanges + 1)}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-lg sm:text-base"
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className="mb-4 sm:mb-6 p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Room Name */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Room:</h2>
              {room.isEditingName ? (
                <input
                  type="text"
                  placeholder="e.g., Master, Guest, Linen"
                  className="border border-gray-300 rounded-lg p-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={room.name}
                  onChange={(e) => updateRoomName(room.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") saveRoomName(room.id)
                  }}
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg font-medium text-gray-900">
                    {room.name || "Unnamed Room"}
                  </span>
                  <button
                    onClick={() => toggleRoomNameEdit(room.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    ✏️ Edit
                  </button>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-1"
                      title="Remove this room"
                    >
                      🗑️ Delete
                    </button>
                  )}
                  <button
                    onClick={() => toggleRoomMinimize(room.id)}
                    className="text-gray-600 hover:text-gray-800 text-sm ml-1"
                    title={
                      room.isMinimized ? "Expand room details" : "Minimize room"
                    }
                  >
                    {room.isMinimized ? "📖 Expand" : "📱 Minimize"}
                  </button>
                </div>
              )}
            </div>

            {/* Room Details - Hidden when minimized */}
            {!room.isMinimized && (
              <>
                {/* Color Section */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="flex items-center gap-1 text-gray-700">
                      <input
                        type="checkbox"
                        checked={room.hasColor}
                        onChange={() => toggleRoomColor(room.id)}
                      />
                      <span className="text-sm font-medium">Color Finish</span>
                    </label>
                    {room.hasColor && room.selectedColor && (
                      <a
                        href={
                          colors.find((c) => c.name === room.selectedColor)
                            ?.imageUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-4 h-4 rounded-full border bg-cover bg-center cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all duration-200"
                        style={{
                          backgroundImage: `url(${
                            colors.find((c) => c.name === room.selectedColor)
                              ?.imageUrl
                          })`,
                        }}
                        title="Click to view color details"
                      ></a>
                    )}
                  </div>
                  {room.hasColor && (
                    <select
                      className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={room.selectedColor}
                      onChange={(e) => updateRoomColor(room.id, e.target.value)}
                    >
                      <option value="">Select a color</option>
                      {colors.map((color) => (
                        <option key={color.id} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Item Selector */}
                <ItemSelector
                  items={items}
                  onAdd={(itemId, qty) => addItemToRoom(room.id, itemId, qty)}
                />

                {/* Room Items List */}
                <ul className="mt-4 space-y-2">
                  {room.items.map((entry, idx) => {
                    const item = items.find((i) => i.id === entry.itemId)
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center text-gray-700 border-b pb-1"
                      >
                        <span>
                          {entry.quantity} × {item?.name}
                        </span>
                        <button
                          className="text-red-600 font-semibold hover:text-red-800"
                          onClick={() => removeItemFromRoom(room.id, idx)}
                        >
                          X
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {/* Room Total */}
            <div className="mt-4 font-bold text-gray-900 text-lg">
              Room Total: $
              {Math.floor(
                calculateRoomTotal(room) +
                  (room.id === 1 ? designChangesFee : 0)
              ).toLocaleString()}
              {room.id === 1 && designChangesFee > 0 && (
                <div className="text-sm font-normal text-gray-600 mt-1"></div>
              )}
            </div>
          </div>
        ))}

        {/* Add Room Button */}
        <button
          className="w-full sm:w-auto px-6 py-4 sm:px-5 sm:py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-500 transition-all duration-200 font-medium mb-6 sm:mb-8"
          onClick={addRoom}
        >
          Add Another Room
        </button>

        {/* Commission Section */}
        {showCommission && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 border border-green-200 bg-green-50 rounded-xl sm:rounded-2xl shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-800">
              💰 My Commission
            </h2>
            <div className="text-green-700 space-y-2">
              <div className="flex justify-between">
                <span>Commission from Items:</span>
                <span>${Math.floor(commissionFromRooms).toLocaleString()}</span>
              </div>
              {showAdminFee && (
                <div className="flex justify-between">
                  <span>Admin Fee (50%):</span>
                  <span>${Math.floor(adminFee * 0.5).toLocaleString()}</span>
                </div>
              )}
              {designChangesFee > 0 && (
                <div className="flex justify-between">
                  <span>Design Changes (100%):</span>
                  <span>${designChangesFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl mt-2 pt-2 border-t border-green-300">
                <span>Total Commission:</span>
                <span>${Math.floor(myCommission).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 border-t border-gray-200 bg-white rounded-xl sm:rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
            Grand Total
          </h2>

          {/* Payment Toggle */}
          <div className="mb-4 flex justify-center gap-8 sm:gap-6 text-gray-700">
            <label className="flex items-center gap-2 text-lg sm:text-base">
              <input
                type="radio"
                value="cash"
                checked={paymentType === "cash"}
                onChange={() => setPaymentType("cash")}
                className="accent-indigo-600 w-4 h-4"
              />
              Cash
            </label>
            <label className="flex items-center gap-2 text-lg sm:text-base">
              <input
                type="radio"
                value="credit"
                checked={paymentType === "credit"}
                onChange={() => setPaymentType("credit")}
                className="accent-indigo-600 w-4 h-4"
              />
              Credit
            </label>
          </div>

          {/* Totals Breakdown */}
          <div className="text-gray-700 space-y-2">
            {showAdminFee ? (
              <div className="flex justify-between">
                <span
                  onClick={() => setShowAdminFee(!showAdminFee)}
                  className="cursor-pointer select-none"
                >
                  Administrative Fee:
                </span>
                <span>${adminFee.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between text-green-600">
                <span
                  onClick={() => setShowAdminFee(!showAdminFee)}
                  className="cursor-pointer select-none"
                >
                  Administrative Fee Waived:
                </span>
                <span>-$250</span>
              </div>
            )}
            {showCOI ? (
              <div className="flex justify-between">
                <span
                  onClick={() => setShowCOI(!showCOI)}
                  className="cursor-pointer select-none"
                >
                  COI Required:
                </span>
                <span>${coiFee.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between text-green-600">
                <span
                  onClick={() => setShowCOI(!showCOI)}
                  className="cursor-pointer select-none"
                >
                  COI Not Required:
                </span>
                <span>$0</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${Math.floor(subtotal).toLocaleString()}</span>
            </div>
            {paymentType === "cash" && (
              <div className="flex justify-between text-green-600">
                <span>Tax Exempt:</span>
                <span>-${Math.floor(taxSavings).toLocaleString()}</span>
              </div>
            )}
            {paymentType === "credit" && (
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${Math.floor(tax).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-xl mt-2 text-indigo-700">
              <span>Total Price:</span>
              <span>${Math.floor(total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Billing Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentView("commission")}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200 font-medium"
          >
            💼 Billing
          </button>
        </div>
      </div>
    </div>
  )

  // Render Commission view
  if (currentView === "commission") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-4xl">
          {/* Back to Home Button */}
          <div className="mb-6 text-center">
            <button
              onClick={() => setCurrentView("home")}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              ← Back to Estimate
            </button>
          </div>

          {/* Commission Component */}
          <Commission />
        </div>
      </div>
    )
  }

  // Default: Render Home view
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8">
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-gray-900 tracking-wide cursor-pointer select-none hover:text-indigo-700 transition-colors duration-200"
          onClick={() => setShowCommission(!showCommission)}
          title="Click to toggle commission details"
        >
          Organizers Unlimited {showCommission && "💰"}
        </h1>

        {/* Commission Selector */}
        <div className="mb-6 sm:mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Client Source
          </label>
          <select
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={commissionRate}
            onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
          >
            <option value={0.15}>Joel's Client</option>
            <option value={0.2}>My Client</option>
          </select>
        </div>

        {/* Design Changes Counter */}
        <div className="mb-6 sm:mb-8 text-center">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Design Changes
          </label>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setDesignChanges(Math.max(1, designChanges - 1))}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-lg sm:text-base"
            >
              -
            </button>
            <span className="text-xl sm:text-lg font-medium text-gray-900 min-w-[2.5rem] sm:min-w-[2rem] text-center">
              {designChanges}
            </span>
            <button
              onClick={() => setDesignChanges(designChanges + 1)}
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-lg sm:text-base"
            >
              +
            </button>
          </div>
        </div>

        {/* Rooms */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className="mb-4 sm:mb-6 p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Room Name */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Room:</h2>
              {room.isEditingName ? (
                <input
                  type="text"
                  placeholder="e.g., Master, Guest, Linen"
                  className="border border-gray-300 rounded-lg p-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={room.name}
                  onChange={(e) => updateRoomName(room.id, e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") saveRoomName(room.id)
                  }}
                  autoFocus
                />
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg font-medium text-gray-900">
                    {room.name || "Unnamed Room"}
                  </span>
                  <button
                    onClick={() => toggleRoomNameEdit(room.id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    ✏️ Edit
                  </button>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(room.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-1"
                      title="Remove this room"
                    >
                      🗑️ Delete
                    </button>
                  )}
                  <button
                    onClick={() => toggleRoomMinimize(room.id)}
                    className="text-gray-600 hover:text-gray-800 text-sm ml-1"
                    title={
                      room.isMinimized ? "Expand room details" : "Minimize room"
                    }
                  >
                    {room.isMinimized ? "📖 Expand" : "📱 Minimize"}
                  </button>
                </div>
              )}
            </div>

            {/* Room Details - Hidden when minimized */}
            {!room.isMinimized && (
              <>
                {/* Color Section */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <label className="flex items-center gap-1 text-gray-700">
                      <input
                        type="checkbox"
                        checked={room.hasColor}
                        onChange={() => toggleRoomColor(room.id)}
                      />
                      <span className="text-sm font-medium">Color Finish</span>
                    </label>
                    {room.hasColor && room.selectedColor && (
                      <a
                        href={
                          colors.find((c) => c.name === room.selectedColor)
                            ?.imageUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-4 h-4 rounded-full border bg-cover bg-center cursor-pointer hover:ring-2 hover:ring-indigo-300 transition-all duration-200"
                        style={{
                          backgroundImage: `url(${
                            colors.find((c) => c.name === room.selectedColor)
                              ?.imageUrl
                          })`,
                        }}
                        title="Click to view color details"
                      ></a>
                    )}
                  </div>
                  {room.hasColor && (
                    <select
                      className="border border-gray-300 rounded-lg p-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={room.selectedColor}
                      onChange={(e) => updateRoomColor(room.id, e.target.value)}
                    >
                      <option value="">Select a color</option>
                      {colors.map((color) => (
                        <option key={color.id} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Item Selector */}
                <ItemSelector
                  items={items}
                  onAdd={(itemId, qty) => addItemToRoom(room.id, itemId, qty)}
                />

                {/* Room Items List */}
                <ul className="mt-4 space-y-2">
                  {room.items.map((entry, idx) => {
                    const item = items.find((i) => i.id === entry.itemId)
                    return (
                      <li
                        key={idx}
                        className="flex justify-between items-center text-gray-700 border-b pb-1"
                      >
                        <span>
                          {entry.quantity} × {item?.name}
                        </span>
                        <button
                          className="text-red-600 font-semibold hover:text-red-800"
                          onClick={() => removeItemFromRoom(room.id, idx)}
                        >
                          X
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {/* Room Total */}
            <div className="mt-4 font-bold text-gray-900 text-lg">
              Room Total: $
              {Math.floor(
                calculateRoomTotal(room) +
                  (room.id === 1 ? designChangesFee : 0)
              ).toLocaleString()}
              {room.id === 1 && designChangesFee > 0 && (
                <div className="text-sm font-normal text-gray-600 mt-1"></div>
              )}
            </div>
          </div>
        ))}

        {/* Add Room Button */}
        <button
          className="w-full sm:w-auto px-6 py-4 sm:px-5 sm:py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-500 transition-all duration-200 font-medium mb-6 sm:mb-8"
          onClick={addRoom}
        >
          Add Another Room
        </button>

        {/* Commission Section */}
        {showCommission && (
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 border border-green-200 bg-green-50 rounded-xl sm:rounded-2xl shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-800">
              💰 My Commission
            </h2>
            <div className="text-green-700 space-y-2">
              <div className="flex justify-between">
                <span>Commission from Items:</span>
                <span>${Math.floor(commissionFromRooms).toLocaleString()}</span>
              </div>
              {showAdminFee && (
                <div className="flex justify-between">
                  <span>Admin Fee (50%):</span>
                  <span>${Math.floor(adminFee * 0.5).toLocaleString()}</span>
                </div>
              )}
              {designChangesFee > 0 && (
                <div className="flex justify-between">
                  <span>Design Changes (100%):</span>
                  <span>${designChangesFee.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl mt-2 pt-2 border-t border-green-300">
                <span>Total Commission:</span>
                <span>${Math.floor(myCommission).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Grand Total */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 border-t border-gray-200 bg-white rounded-xl sm:rounded-2xl shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900">
            Grand Total
          </h2>

          {/* Payment Toggle */}
          <div className="mb-4 flex justify-center gap-8 sm:gap-6 text-gray-700">
            <label className="flex items-center gap-2 text-lg sm:text-base">
              <input
                type="radio"
                value="cash"
                checked={paymentType === "cash"}
                onChange={() => setPaymentType("cash")}
                className="accent-indigo-600 w-4 h-4"
              />
              Cash
            </label>
            <label className="flex items-center gap-2 text-lg sm:text-base">
              <input
                type="radio"
                value="credit"
                checked={paymentType === "credit"}
                onChange={() => setPaymentType("credit")}
                className="accent-indigo-600 w-4 h-4"
              />
              Credit
            </label>
          </div>

          {/* Totals Breakdown */}
          <div className="text-gray-700 space-y-2">
            {showAdminFee ? (
              <div className="flex justify-between">
                <span
                  onClick={() => setShowAdminFee(!showAdminFee)}
                  className="cursor-pointer select-none"
                >
                  Administrative Fee:
                </span>
                <span>${adminFee.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between text-green-600">
                <span
                  onClick={() => setShowAdminFee(!showAdminFee)}
                  className="cursor-pointer select-none"
                >
                  Administrative Fee Waived:
                </span>
                <span>-$250</span>
              </div>
            )}
            {showCOI ? (
              <div className="flex justify-between">
                <span
                  onClick={() => setShowCOI(!showCOI)}
                  className="cursor-pointer select-none"
                >
                  COI Required:
                </span>
                <span>${coiFee.toLocaleString()}</span>
              </div>
            ) : (
              <div className="flex justify-between text-green-600">
                <span
                  onClick={() => setShowCOI(!showCOI)}
                  className="cursor-pointer select-none"
                >
                  COI Not Required:
                </span>
                <span>$0</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${Math.floor(subtotal).toLocaleString()}</span>
            </div>
            {paymentType === "cash" && (
              <div className="flex justify-between text-green-600">
                <span>Tax Exempt:</span>
                <span>-${Math.floor(taxSavings).toLocaleString()}</span>
              </div>
            )}
            {paymentType === "credit" && (
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${Math.floor(tax).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-xl mt-2 text-indigo-700">
              <span>Total Price:</span>
              <span>${Math.floor(total).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Billing Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentView("commission")}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-purple-700 transition-all duration-200 font-medium"
          >
            💼 Billing
          </button>
        </div>
      </div>
    </div>
  )
}

/* Helper Component: Item Selector */
function ItemSelector({ items, onAdd }) {
  // Sort items alphabetically by name
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name))

  // Find the "Unit" item to use as default
  const unitItem = items.find((item) => item.name === "Unit")
  const defaultId = unitItem ? unitItem.id : items[0].id

  const [selected, setSelected] = useState(defaultId)
  const [qty, setQty] = useState(1)

  const handleAdd = () => {
    onAdd(selected, qty)
    setSelected(defaultId)
    setQty(1)
  }

  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
      <select
        className="border border-gray-300 rounded-lg p-3 sm:p-2 flex-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={selected}
        onChange={(e) => setSelected(parseInt(e.target.value))}
      >
        {sortedItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="flex space-x-2 sm:space-x-0">
        <input
          type="number"
          min="1"
          className="w-20 border border-gray-300 rounded-lg p-3 sm:p-2 text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <button
          className="px-6 py-3 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-green-500 transition-all duration-200 font-medium flex-1 sm:flex-none"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
    </div>
  )
}
