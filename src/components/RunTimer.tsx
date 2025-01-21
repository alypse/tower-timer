import { RunProps, RunResults, calculateTotalWaveTime } from '../utils/waveTime'
import { integerRange, convertSecondsToTime } from '../utils/utils'
import { useState } from 'react'


function RunTimer() {
  const [runProps, setRunProps] = useState<RunProps>({
    wavesToComplete: 5000,
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
    gameSpeedPerk: 6.25
  })
  const [runResults, setRunResults] = useState<RunResults>({} as RunResults)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Tower Run Timer
      </h1>
      {/*<div>Run configuration:</div>*/}
      {/*<div>*/}
      {/*  {Object.entries(runProps).map(([key, value]) => (*/}
      {/*    <div key={key}>*/}
      {/*      <div>*/}
      {/*        {key}: {value}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="controls space-y-6 max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              Waves to run:
            </span>
            <input
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.wavesToComplete}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  wavesToComplete: parseInt(e.target.value, 10) || 100
                })
              }
              min={100}
              max={20000}
              type="number"
            />
          </label>

          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              Wave Accelerator Card Level:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveAcceleratorCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveAcceleratorCardLevel: parseInt(e.target.value, 10) || 7
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              Intro Sprint Card Level:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.introSprintCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  introSprintCardLevel: parseInt(e.target.value, 10) || 7
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

          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              Intro Sprint Mastery Level:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.introSprintMasteryLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  introSprintMasteryLevel: parseInt(e.target.value, 10) || 9
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              Waveskip Card Level:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveSkipCardLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveSkipCardLevel: parseInt(e.target.value, 10) || 7
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

          <label className="flex flex-col space-y-2">
            <span className="text-sm font-medium text-gray-300">
              {' '}
              Wave Skip Mastery Level:
            </span>
            <select
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={runProps.waveSkipMasteryLevel}
              onChange={(e) =>
                setRunProps({
                  ...runProps,
                  waveSkipMasteryLevel: parseInt(e.target.value, 10) || 9
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

        <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-300">
              Tournament:{' '}
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

          <label className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-300">
              Wave Skip Mastery Enabled:{' '}
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
          <label className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-300">
              Intro Sprint Mastery Enabled:{' '}
            </span>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-purple-500 rounded focus:ring-purple-500 focus:ring-offset-gray-800"
              defaultChecked={runProps.introSprintMasteryEnabled}
              onChange={() =>
                setRunProps({
                  ...runProps,
                  introSprintMasteryEnabled: !runProps.introSprintMasteryEnabled
                })
              }
              name="introSprintMasteryEnabled"
            />
          </label>
        </div>
        {!runProps.tournament &&
        <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3">
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

          <label className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-300">
              {' '}
              Game Speed Perk:
            </span>
            <input
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              // value={!runProps.tournament ? runProps.gameSpeedPerk : runProps.gameSpeedBase}
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

          <label className="flex items-center space-x-3">
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
              max={runProps.wavesToComplete}
              type="number"
            />
          </label>
        </div>}

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

        <div className="result grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          {Object.entries(runResults).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between p-2 border-b border-gray-700"
            >
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
      }

      export default RunTimer

