import { RunProps, RunResults, calculateTotalWaveTime } from '../utils/waveTime'
import { integerRange } from '../utils/utils'
import { useState } from 'react'


function RunTimer() {
  const [runProps, setRunProps] = useState<RunProps>(
    {
      wavesToComplete: 5000,
      introSprintCardLevel: 7,
      introSprintMasteryEnabled: true,
      introSprintMasteryLevel: 9,
      waveSkipCardLevel: 7,
      waveSkipMasteryEnabled: true,
      waveSkipMasteryLevel: 9,
      waveAcceleratorCardLevel: 7,
      tournament: true,
      gameSpeedAcquireWave: 1000,
      gameSpeedBase: 5.0,
      gameSpeedPerk: 6.25,
    }
  )
  const [runResults, setRunResults] = useState<RunResults>({} as RunResults)

  return (
    <div>
      <h1>This is the Run Timer</h1>
      <div>Run configuration:</div>
      <div>
        {Object.entries(runProps).map(([key, value]) => (
          <div key={key}>
            <div>
              {key}: {value}
            </div>
          </div>
        ))}
      </div>

      <div className="controls">
        <label>
          Waves to run:
          <input
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

        <label>
          Intro Sprint Card Level:
          <select
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

        <label>
          Intro Sprint Mastery Enabled:{' '}
          <input
            type="checkbox"
            checked={runProps.introSprintMasteryEnabled}
            onChange={() =>
              setRunProps({
                ...runProps,
                introSprintMasteryEnabled: false
              })
            }
            name="introSprintMasteryEnabled"
          />
          /
        </label>

        <label>
          Intro Sprint Mastery Level:
          <select
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

        <label>
          Waveskip Card Level:
          <select
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

        <label>
          Wave Skip Mastery Enabled:{' '}
          <input
            type="checkbox"
            checked={runProps.waveSkipMasteryEnabled}
            onChange={() =>
              setRunProps({
                ...runProps,
                waveSkipMasteryEnabled: false
              })
            }
            name="waveSkipMasteryEnabled"
          />
          /
        </label>

        <label>
          Wave Skip Mastery Level:
          <select
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

        <label>
          Wave Accelerator Card Level:
          <select
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

        <label>
          Tournament:{' '}
          <input
            type="checkbox"
            checked={runProps.tournament}
            onChange={() =>
              setRunProps({
                ...runProps,
                tournament: false
              })
            }
            name="isTournament"
          />
          /
        </label>

        <label>
          Game Speed Perk Wave:
          <input
            value={runProps.gameSpeedAcquireWave}
            onChange={(e) =>
              setRunProps({
                ...runProps,
                gameSpeedAcquireWave: parseInt(e.target.value, 10) || 1000
              })
            }
            min={100}
            max={20000}
            type="number"
          />
        </label>

        <label>
          Game Speed Base:
          <input
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

        <label>
          Game Speed Perk:
          <input
            value={runProps.gameSpeedPerk}
            onChange={(e) =>
              setRunProps({
                ...runProps,
                gameSpeedPerk: parseFloat(e.target.value) || 6.25
              })
            }
            min={1}
            max={6.25}
            step={0.05}
            type="number"
          />
        </label>


        <button onClick={() => setRunResults(calculateTotalWaveTime(runProps))}>
          Calculate
        </button>
      </div>

      <div className="results">
        {Object.entries(runResults).map(([key, value]) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RunTimer

