import { useState } from "react"

export default function Spinner() {
  const [names, setNames] = useState([])
  const [inputName, setInputName] = useState("")
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState("")
  const [rotation, setRotation] = useState(0)

  const addName = () => {
    if (inputName.trim() && !names.includes(inputName.trim())) {
      setNames([...names, inputName.trim()])
      setInputName("")
    }
  }

  const removeName = (nameToRemove) => {
    setNames(names.filter((name) => name !== nameToRemove))
    if (winner === nameToRemove) {
      setWinner("")
    }
  }

  const spinWheel = () => {
    if (names.length < 2) return

    setIsSpinning(true)
    setWinner("")

    // Random rotation between 1440 and 2880 degrees (4-8 full rotations)
    const minRotation = 1440
    const maxRotation = 2880
    const randomRotation =
      Math.random() * (maxRotation - minRotation) + minRotation
    const newRotation = rotation + randomRotation

    setRotation(newRotation)

    // Calculate winner based on final position
    setTimeout(() => {
      const segmentAngle = 360 / names.length
      const normalizedRotation = newRotation % 360
      const winnerIndex =
        Math.floor((360 - normalizedRotation) / segmentAngle) % names.length
      setWinner(names[winnerIndex])
      setIsSpinning(false)
    }, 3000) // 3 second spin duration
  }

  const resetWheel = () => {
    setNames([])
    setWinner("")
    setRotation(0)
    setIsSpinning(false)
  }

  const getSegmentColor = (index) => {
    const colors = [
      "from-red-400 to-red-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-yellow-400 to-yellow-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-orange-400 to-orange-600",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎯 Name Spinner
      </h2>

      {/* Input Section */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addName()}
            placeholder="Enter a name..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addName}
            disabled={!inputName.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>

        {/* Names List */}
        <div className="flex flex-wrap gap-2">
          {names.map((name, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {name}
              <button
                onClick={() => removeName(name)}
                className="text-red-500 hover:text-red-700 ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Spinning Wheel */}
      {names.length > 0 && (
        <div
          className="relative mx-auto mb-8"
          style={{ width: "300px", height: "300px" }}
        >
          {/* Wheel Container */}
          <div className="relative w-full h-full">
            {/* Arrow Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-gray-800"></div>
            </div>

            {/* Wheel */}
            <svg
              className={`w-full h-full transition-transform duration-[3000ms] ease-out ${
                isSpinning ? "" : ""
              }`}
              style={{ transform: `rotate(${rotation}deg)` }}
              viewBox="0 0 200 200"
            >
              {names.map((name, index) => {
                const segmentAngle = 360 / names.length
                const startAngle = index * segmentAngle - 90 // Start from top
                const endAngle = (index + 1) * segmentAngle - 90

                const startRadian = (startAngle * Math.PI) / 180
                const endRadian = (endAngle * Math.PI) / 180

                const largeArcFlag = segmentAngle > 180 ? 1 : 0

                const x1 = 100 + 90 * Math.cos(startRadian)
                const y1 = 100 + 90 * Math.sin(startRadian)
                const x2 = 100 + 90 * Math.cos(endRadian)
                const y2 = 100 + 90 * Math.sin(endRadian)

                const textAngle = (startAngle + endAngle) / 2
                const textRadian = (textAngle * Math.PI) / 180
                const textX = 100 + 60 * Math.cos(textRadian)
                const textY = 100 + 60 * Math.sin(textRadian)

                return (
                  <g key={index}>
                    {/* Segment */}
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      className={`bg-gradient-to-br ${getSegmentColor(index)}`}
                      fill={`hsl(${(index * 360) / names.length}, 70%, 60%)`}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    {/* Text */}
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-white font-bold text-sm"
                      transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                    >
                      {name.length > 8 ? name.substring(0, 8) + "..." : name}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-800 rounded-full border-4 border-white"></div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="text-center space-y-4">
        <div className="space-x-4">
          <button
            onClick={spinWheel}
            disabled={names.length < 2 || isSpinning}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSpinning ? "Spinning..." : "🎲 Spin!"}
          </button>

          <button
            onClick={resetWheel}
            disabled={isSpinning}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Reset
          </button>
        </div>

        {names.length < 2 && names.length > 0 && (
          <p className="text-gray-500 text-sm">Add at least 2 names to spin</p>
        )}
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="mt-8 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">🎉 Winner!</h3>
            <p className="text-3xl font-extrabold">{winner}</p>
          </div>
        </div>
      )}
    </div>
  )
}
