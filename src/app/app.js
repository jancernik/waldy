/* eslint-disable operator-linebreak */
import { getDatabase, ref, onValue } from 'firebase/database';
import g from './global';
import UI from './UI';

let localTimer = null;
let totalSeconds = 0;
let correctGuesses = 0;

export default class App {
  static checkGuess(character) {
    const game = document.querySelector('.game:not(.hidden)');
    const targetGameID = parseInt(game.getAttribute('data-game-id'), 10);
    const answer = g.answers.filter((e) => e.gameID === targetGameID)[0];
    if (
      g.guess.x >= answer[`${character}MinX`] &&
      g.guess.x <= answer[`${character}MaxX`] &&
      g.guess.y >= answer[`${character}MinY`] &&
      g.guess.y <= answer[`${character}MaxY`]
    ) {
      correctGuesses += 1;
      this.checkEnd(answer);
      UI.displaySuccess(character);
    } else {
      UI.displayFailure(character);
    }
  }

  static checkEnd(answer) {
    const characterNum = (Object.keys(answer).length - 1) / 4;
    if (correctGuesses === characterNum) {
      this.getServerTime(false);
      this.stopLocalTimer();
      UI.displayEnd();
      const checkScoreTime = setInterval(() => {
        if (g.scoreTime) {
          const minutes = Math.floor(g.scoreTime / 60000);
          const seconds = g.scoreTime / 1000 - minutes * 60;
          const secondsRound = Math.round(seconds * 100) / 100;
          UI.displayTimer(minutes, secondsRound, '.end-timer');
          clearInterval(checkScoreTime);
        }
      }, 20);
    }
  }

  static updateLocalTimer() {
    totalSeconds += 1;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    UI.displayTimer(minutes, seconds, '.timer');
  }

  static getServerTime(isStartTime) {
    const offsetRef = ref(getDatabase(), '.info/serverTimeOffset');
    onValue(offsetRef, (snap) => {
      const offset = snap.val();
      const currentTime = new Date().getTime() + offset;
      if (isStartTime) g.startTime = currentTime;
      else g.scoreTime = currentTime - g.startTime;
    });
  }

  static startLocalTimer() {
    totalSeconds = 0;
    localTimer = setInterval(this.updateLocalTimer, 1000);
  }

  static stopLocalTimer() {
    clearInterval(localTimer);
  }

  static resetVals() {
    g.startTime = 0;
    g.scoreTime = 0;
    correctGuesses = 0;
  }
}
