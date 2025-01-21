

/**
 * @function getRealGameSpeed - Return the actual speed multiplier from a displayed game speed, because the number in the UI is not the actual multiplier
 *
 * @param displayedGameSpeed - number - the game speed displayed in the ui.
 * @returns number - the actual game speed multiplier to use for math
 */
export const getRealGameSpeed = (
  displayedGameSpeed: number,
) => {
  let realGameSpeed = 1
  if (displayedGameSpeed <= 1) {
    realGameSpeed = 1.07000005245
  } else if (displayedGameSpeed <= 1.5) {
    realGameSpeed = 1.60500001907
  } else if (displayedGameSpeed <= 2) {
    realGameSpeed = 2
  } else if (displayedGameSpeed <= 2.5) {
    realGameSpeed = 2.375
  } else if (displayedGameSpeed <= 3) {
    realGameSpeed = 2.75999999046
  } else if (displayedGameSpeed <= 3.5) {
    realGameSpeed = 3.07999992371
  } else if (displayedGameSpeed <= 4) {
    realGameSpeed = 3.3599998951
  } else if (displayedGameSpeed <= 4.5) {
    realGameSpeed = 3.69000005722
  } else if (displayedGameSpeed <= 5) {
    realGameSpeed = 4
  } else if (displayedGameSpeed <= 5.5) {
    realGameSpeed = 4.40000009537
  } else if (displayedGameSpeed <= 6) {
    realGameSpeed = 4.80000019073
  } else if (displayedGameSpeed <= 6.01) {
    realGameSpeed = 4.80800008774
  } else if (displayedGameSpeed <= 6.02) {
    realGameSpeed = 4.81599998474
  } else if (displayedGameSpeed <= 6.03) {
    realGameSpeed = 4.82399988174
  } else if (displayedGameSpeed <= 6.04) {
    realGameSpeed = 4.83200025558
  } else if (displayedGameSpeed <= 6.05) {
    realGameSpeed = 4.84000015259
  } else if (displayedGameSpeed <= 6.06) {
    realGameSpeed = 4.84800004959
  } else if (displayedGameSpeed <= 6.07) {
    realGameSpeed = 4.85600042343
  } else if (displayedGameSpeed <= 6.08) {
    realGameSpeed = 4.8639998436
  } else if (displayedGameSpeed <= 6.09) {
    realGameSpeed = 4.87200021744
  } else if (displayedGameSpeed <= 6.1) {
    realGameSpeed = 4.88000011444
  } else if (displayedGameSpeed <= 6.11) {
    realGameSpeed = 4.88800001144
  } else if (displayedGameSpeed <= 6.12) {
    realGameSpeed = 4.89599990845
  } else if (displayedGameSpeed <= 6.13) {
    realGameSpeed = 4.90400028229
  } else if (displayedGameSpeed <= 6.14) {
    realGameSpeed = 4.91200017929
  } else if (displayedGameSpeed <= 6.15) {
    realGameSpeed = 4.92000007629
  } else if (displayedGameSpeed <= 6.16) {
    realGameSpeed = 4.9279999733
  } else if (displayedGameSpeed <= 6.17) {
    realGameSpeed = 4.93600034714
  } else if (displayedGameSpeed <= 6.18) {
    realGameSpeed = 4.9439997673
  } else if (displayedGameSpeed <= 6.19) {
    realGameSpeed = 4.95200014114
  } else if (displayedGameSpeed <= 6.2) {
    realGameSpeed = 4.96000003815
  } else if (displayedGameSpeed <= 6.21) {
    realGameSpeed = 4.96799993515
  } else if (displayedGameSpeed <= 6.22) {
    realGameSpeed = 4.97600030899
  } else if (displayedGameSpeed <= 6.23) {
    realGameSpeed = 4.98400020599
  } else if (displayedGameSpeed <= 6.24) {
    realGameSpeed = 4.992000103
  } else if (displayedGameSpeed >= 6.25) {
    realGameSpeed = 5
  }
  return realGameSpeed
}

/**
 * @constant WAVE_DURATION - How long the base wave time is where enemies spawn, excluding the cooldown, before applying game speed - note that Device Frame Drift may extend this slightly.
 */
export const WAVE_DURATION = 26

/**
 * @constant WAVE_COOLDOWN - The base length for the cooldown (green bar) between waves lasts on non-boss waves, outside of tournaments, and without Wave Accelerator, before applying game speed - note that Device Frame Drift may extend this slightly.
 */
export const WAVE_COOLDOWN = 9

/**
 * @constant TOURNAMENT_COOLDOWN_MODIFIER - The multiplier reduction on the Cooldown (green bar) between waves in tournaments
 */
export const TOURNAMENT_COOLDOWN_MODIFIER = 0.5

/**
 * @function getWaveCooldown - Get the cooldown for the wave, without game speed applied, and without accounting for Device Frame Drift
 *
 * @param waveAcceleratorCardLevel - number - The level of the Wave Accelerator card (0 for unequipped, 1-7 for card stars; invalid values will be treated as 0
 * @param tournament - boolean - If a tournament is active, speed up the cooldown by the tournament modifier
 * @returns number - The cooldown time, before game speed is applied, and without accounting for Device Frame Drift
 */
export const getWaveCooldown = (
  waveAcceleratorCardLevel: number,
  tournament: boolean
) => {
  const waModifier =
    1 - ((WAVE_ACCELERATOR_CARD as never)[waveAcceleratorCardLevel] || 0) / 100
  const tournamentModifier = tournament ? TOURNAMENT_COOLDOWN_MODIFIER : 1
  return WAVE_COOLDOWN * waModifier * tournamentModifier
}

/**
 * @function getInGameWaveTime - Get the "Game" time the wave takes
 *
 * @param waveAccelerator - number - The stars of the Wave Accelerator card, 0 for unequipped
 * @param tournament - boolean - If a tournament is active, it speeds up the cooldown portion
 * @returns number - The number of "in game seconds" the wave lasts for.
 */
export const getInGameWaveTime = (
  waveAccelerator: number,
  tournament: boolean
) => {
  return WAVE_DURATION + getWaveCooldown(waveAccelerator, tournament)
}

/**
 * @function getRealWaveTime - Get the real world time a wave takes, accounting for game speed, but not accounting for Device Frame Drift.
 *
 * Takes an object with the params:
 * - `displayedGameSpeed` - number - The displayed game speed - use the value in game. For perks, you can use the "actual" value pre-rounding (6.25 with 1.25 perk bonus)
 * - `waveAccelerator` - number - The stars of the Wave Accelerator card (0-7, 0 is unequipped)
 * - `tournament` - boolean - If it is a tournament, speed up the cooldown.
 * @returns number - The actual seconds the wave took, not accounting for Device Frame Drift.
 */
export const getRealWaveTime = ({
  displayedGameSpeed,
  waveAcceleratorCardLevel,
  tournament
}: {
  displayedGameSpeed: number
  waveAcceleratorCardLevel: number
  tournament: boolean
}) => {
  const gameSpeed = getRealGameSpeed(displayedGameSpeed)
  const time = getInGameWaveTime(waveAcceleratorCardLevel, tournament)
  return time / gameSpeed
}

// CARDS
/**
 * @constant WAVE_ACCELERATOR_CARD - Maps Wave Accelerator Card stars to value, 0 is unequipped
 */
export const WAVE_ACCELERATOR_CARD: {[index: number]: any} = Object.freeze({
  0: 0,
  1: 30,
  2: 34,
  3: 38,
  4: 42,
  5: 46,
  6: 50,
  7: 54,
});

/**
 * @constant INTRO_SPRINT_CARD - Maps Intro Sprint Card stars to value, 0 is unequipped
 */
export const INTRO_SPRINT_CARD: {[index: number]: any} = Object.freeze({
  0: 0,
  1: 20,
  2: 30,
  3: 40,
  4: 50,
  5: 60,
  6: 80,
  7: 100,
});

/**
 * @constant WAVE_SKIP_CARD - Maps Wave Skip Card stars to value, 0 is unequipped
 */
export const WAVE_SKIP_CARD: {[index: number]: any} = Object.freeze({
  0: 0,
  1: 9,
  2: 10,
  3: 11,
  4: 13,
  5: 15,
  6: 17,
  7: 19,
});

/**
 * @constant WAVE_SKIP_MASTERY - Adds a chance to double skip waves after wave skip procs. Maps lab levels for the mastery
 */
export const WAVE_SKIP_MASTERY: {[index: number]: any} = {
  0: 10.0,
  1: 15.0,
  2: 20.0,
  3: 25.0,
  4: 30.0,
  5: 35.0,
  6: 40.0,
  7: 45.0,
  8: 50.0,
  9: 55.0
}

/**
 * @constant INTRO_SPRINT_MASTERY - Multiplies the max wave of Intro Sprint card. Maps lab levels for the mastery
 */
export const INTRO_SPRINT_MASTERY: {[index: number]: any} = {
  0: 1.8,
  1: 3.6,
  2: 5.4,
  3: 7.2,
  4: 9.0,
  5: 10.8,
  6: 12.6,
  7: 14.4,
  8: 16.2,
  9: 18.0
}

export interface RunProps {
  wavesToComplete: number;
  introSprintCardLevel: number;
  introSprintMasteryEnabled: boolean;
  introSprintMasteryLevel: number;
  waveSkipCardLevel: number;
  waveSkipMasteryEnabled: boolean;
  waveSkipMasteryLevel: number;
  waveAcceleratorCardLevel: number;
  tournament: boolean;
  gameSpeedAcquireWave: number;
  gameSpeedBase: number;
  gameSpeedPerk: number;
}

export interface RunResults {
  timeInSeconds: number;
  totalWaveSkips: number;
  totalUnskippedWaves: number;
  finalWave: number;
}

// Consts for testing
// const wavesToComplete: number = 5000
// const introSprintCardLevel: number = 7
// const introSprintMasteryEnabled: boolean = true
// const introSprintMasteryLevel:number = 9
// const waveSkipCardLevel: number = 7
// const waveSkipMasteryEnabled: boolean = true
// const waveSkipMasteryLevel: number = 9
// const waveAcceleratorCardLevel: number = 7
// const tournament: boolean = false
// const gameSpeedAcquireWave: number = 1000
// const gameSpeedBase: number = 5.0
// const gameSpeedPerk: number = 6.25

// Props for testing
// const runProps = {
//   wavesToComplete: 5000,
//   introSprintCardLevel: 7,
//   introSprintMasteryEnabled: true,
//   introSprintMasteryLevel: 9,
//   waveSkipCardLevel: 7,
//   waveSkipMasteryEnabled: true,
//   waveSkipMasteryLevel: 9,
//   waveAcceleratorCardLevel: 7,
//   tournament: true,
//   gameSpeedAcquireWave: 1000,
//   gameSpeedBase: 5.0,
//   gameSpeedPerk: 6.25,
// }


// WS Stuff
const isWaveSkip = (wsChance: number) => {
  // const value = rand.ws.NextDouble();
  // return wsChance >= value;
  const roll = Math.floor(Math.random() * 100 + 1);
  return wsChance >= roll
};

const isDoubleWaveSkip = (wsDoubleChance: number) => {
  // const value = rand.ws.NextDouble();
  // return wsDoubleChance >= value;
  const roll = Math.floor(Math.random() * 100 + 1);
  return wsDoubleChance >= roll
};

// Calculate Intro Sprint end wave
const introSprintWaves = (
  introSprintCardLevel: number,
  introSprintMasteryLevel: number,
  introSprintMasteryEnabled: boolean): number => {
  if (introSprintCardLevel == 0) { return 0 } // Introsprint not equipped
  if (introSprintCardLevel > 0 && !introSprintMasteryEnabled) { return INTRO_SPRINT_CARD[introSprintCardLevel] } // Introsprint equipped without card mastery
  if (introSprintCardLevel > 0 && introSprintMasteryEnabled) { return INTRO_SPRINT_CARD[introSprintCardLevel] * INTRO_SPRINT_MASTERY[introSprintMasteryLevel] } // Introsprint equipped and mastery unlocked
  return 0; // Default return value
}



// Main function, returns seconds for total run
export const calculateTotalWaveTime = (runProps: {
  wavesToComplete: number
  introSprintCardLevel: number
  introSprintMasteryLevel: number
  gameSpeedAcquireWave: number
  gameSpeedPerk: number
  gameSpeedBase: number
  waveSkipCardLevel: number
  waveSkipMasteryEnabled: boolean
  waveSkipMasteryLevel: number
  waveAcceleratorCardLevel: number
  tournament: boolean
  introSprintMasteryEnabled: boolean
}): RunResults => {
  let maxWaveInIntroSprint: number = introSprintWaves(runProps.introSprintCardLevel, runProps.introSprintMasteryLevel, runProps.introSprintMasteryEnabled)
  let currentWave: number = 1
  let elapsedTime: number = 0
  let totalWaveSkips: number = 0
  let totalUnskippedWaves: number = 0
  const wsChance = WAVE_SKIP_CARD[runProps.waveSkipCardLevel]
  const wsDoubleChance: number = WAVE_SKIP_MASTERY[runProps.waveSkipMasteryLevel]

  // Main loop
  while (runProps.wavesToComplete > currentWave) {
    let displayedGameSpeed = (currentWave >= runProps.gameSpeedAcquireWave) ? runProps.gameSpeedPerk : runProps.gameSpeedBase
    // Intro Sprint duration
    while (currentWave < maxWaveInIntroSprint) {
      // console.log('Sprinting wave: ', currentWave)
      if (currentWave % 10 == 0) {
        elapsedTime += getRealWaveTime({ displayedGameSpeed, waveAcceleratorCardLevel: runProps.waveAcceleratorCardLevel, tournament: runProps.tournament })
        currentWave += 10
      }
      if (currentWave == 1) {
        elapsedTime += getRealWaveTime({ displayedGameSpeed, waveAcceleratorCardLevel: runProps.waveAcceleratorCardLevel, tournament: runProps.tournament })
        currentWave += 9
      }
      if (currentWave == maxWaveInIntroSprint) {
        elapsedTime += getRealWaveTime({ displayedGameSpeed, waveAcceleratorCardLevel: runProps.waveAcceleratorCardLevel, tournament: runProps.tournament })
        currentWave += 1
      }
    }

    // Normal waves
    while (runProps.wavesToComplete > currentWave) {
      displayedGameSpeed = (currentWave >= runProps.gameSpeedAcquireWave) ? runProps.gameSpeedPerk : runProps.gameSpeedBase
      // console.log('Current wave: ', currentWave)

      if (runProps.waveSkipCardLevel > 0) {
        // console.log('Attempting to skip wave: ', currentWave)

        let waveSkips: number = 0
        while (isWaveSkip(wsChance)) {
          waveSkips += 1

          // If you have mastery, roll that as well
          if (runProps.waveSkipMasteryEnabled && isDoubleWaveSkip(wsDoubleChance)) {
            // console.log('Double Wave Skip')
            waveSkips += 1
          }
          // console.log('Skipped waves: ', waveSkips)
          currentWave += waveSkips
          totalWaveSkips += waveSkips
        }
        if (waveSkips == 0) {
          // console.log('Running wave: ', currentWave)
          elapsedTime += getRealWaveTime({ displayedGameSpeed, waveAcceleratorCardLevel: runProps.waveAcceleratorCardLevel, tournament: runProps.tournament })
          currentWave++
          totalUnskippedWaves++
        }
      }
    }
    // console.log('Completed waves: ', currentWave)
  }
  return {
    timeInSeconds: elapsedTime,
    totalWaveSkips: totalWaveSkips,
    totalUnskippedWaves: totalUnskippedWaves,
    finalWave: currentWave
  }
}

// module.exports = { calculateTotalWaveTime }
// console.log(calculateTotalWaveTime(runProps))

