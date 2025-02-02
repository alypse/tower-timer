import { RunProps, RunResults, calculateTotalWaveTime } from '../utils/waveTime'
import { integerRange, convertSecondsToTime } from '../utils/utils'
import { useState } from 'react'

function RunTimer() {
  const [runProps, setRunProps] = useState<RunProps>({
    startingWave: 1,
    targetWave: 5000,
    introSprintCardLevel: 7,
    introSprintMasteryEnabled: true,
    introSprintMasteryLevel: 9,
    waveSkipCardLevel: 7,
    waveSkipMasteryEnabled: true,
    waveSkipMasteryLevel: 9,
    waveAcceleratorCardLevel: 7,
    tournament: false,
    gameSpeedAcquireWave: 1000,
    gameSpeedBase: 5.0,
    gameSpeedPerk: 5.0
  })
  const [runResults, setRunResults] = useState<RunResults>({} as RunResults)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Tower Run Timer
      </h1>
      <div className="controls space-y-6 max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4">
          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Waves to run:
            </span>
            <input
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.targetWave}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  targetWave: parseInt(e.target.value, 10) || 100
                })
              }
              min={100}
              max={20000}
              type="number"
            />
          </label>

          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Wave Accelerator Card:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveAcceleratorCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveAcceleratorCardLevel: parseInt(e.target.value, 10) || 0 // todo: Why do I need or 0 here to enable 0 selection
                })
              }
            >
              {integerRange(0, 7).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Intro Sprint Card:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.introSprintCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  introSprintCardLevel: parseInt(e.target.value, 10) || 0 // todo: Why do I need or 0 here to enable 0 selection
                })
              }
            >
              {integerRange(0, 7).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Intro Sprint Mastery:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.introSprintMasteryLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  introSprintMasteryLevel: parseInt(e.target.value, 10) || 0 // todo: Why do I need or 0 here to enable 0 selection
                })
              }
            >
              {integerRange(0, 9).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Waveskip Card:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveSkipCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveSkipCardLevel: parseInt(e.target.value, 10)
                })
              }
            >
              {integerRange(0, 7).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Wave Skip Mastery:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveSkipMasteryLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveSkipMasteryLevel: parseInt(e.target.value, 10)
                })
              }
            >
              {integerRange(0, 9).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
            <label className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">
                Tournament:
              </span>
              <input
                className="form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                type="checkbox"
                defaultChecked={runProps.tournament}
                onChange={() =>
                  setRunProps({
                    ...runProps,
                    tournament: !runProps.tournament
                  })
                }
                name="isTournament"
              />
            </label>

            <label className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">
                Wave Skip Mastery:
              </span>
              <input
                className="form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                type="checkbox"
                defaultChecked={runProps.waveSkipMasteryEnabled}
                onChange={() =>
                  setRunProps({
                    ...runProps,
                    waveSkipMasteryEnabled: !runProps.waveSkipMasteryEnabled
                  })
                }
                name="waveSkipMasteryEnabled"
              />
            </label>

            <label className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">
                Intro Sprint Mastery:
              </span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
                defaultChecked={runProps.introSprintMasteryEnabled}
                onChange={() =>
                  setRunProps({
                    ...runProps,
                    introSprintMasteryEnabled:
                      !runProps.introSprintMasteryEnabled
                  })
                }
                name="introSprintMasteryEnabled"
              />
            </label>
          </div>

          <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
            <span className="text-sm font-medium text-gray-300">
              Game Speed Base:
            </span>
            <input
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.gameSpeedBase}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  gameSpeedBase: parseFloat(e.target.value) || 5.0
                })
              }
              min={1}
              max={5}
              step={0.05}
              type="number"
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          {!runProps.tournament && (
            <div className="flex flex-wrap gap-4 w-full">
              <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
                <span className="text-sm font-medium text-gray-300">
                  Game Speed Perk:
                </span>
                <input
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={runProps.gameSpeedPerk}
                  onChange={(e) =>
                    setRunProps({
                      ...runProps,
                      gameSpeedPerk: parseFloat(e.target.value) || 6.3
                    })
                  }
                  min={1}
                  max={6.3}
                  step={0.05}
                  type="number"
                />
              </label>

              <label className="flex-1 flex flex-col space-y-2 min-w-[200px]">
                <span className="text-sm font-medium text-gray-300">
                  Game Speed Perk Wave:
                </span>
                <input
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={runProps.gameSpeedAcquireWave}
                  onChange={(e) =>
                    setRunProps({
                      ...runProps,
                      gameSpeedAcquireWave: parseInt(e.target.value, 10) || 1000
                    })
                  }
                  min={100}
                  max={runProps.targetWave}
                  step={100}
                  type="number"
                />
              </label>
            </div>
          )}
        </div>

        <button
          onClick={() => setRunResults(calculateTotalWaveTime(runProps))}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors duration-200 shadow-lg"
        >
          Calculate
        </button>
      </div>

      <div className="results mt-8 max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="result text-2xl font-bold text-center text-blue-400 mb-4">
          {!isNaN(runResults.timeInSeconds) &&
            convertSecondsToTime(runResults.timeInSeconds)}
        </div>

        <div className="result flex flex-wrap gap-4">
          {Object.entries(runResults).map(([key, value]) => (
            <div
              key={key}
              className="flex-1 flex justify-between p-2 border-b border-gray-700 min-w-[200px]"
            >
              <span className="font-medium">{key}:</span>
              <span>{value.toLocaleString('en-US', { maximumSignificantDigits: 8 })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default RunTimer

