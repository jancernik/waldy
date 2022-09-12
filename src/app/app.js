import g from './global';
import UI from './UI';

let timer = null;
let totalSeconds = 0;

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
      UI.displaySuccess(character);
    } else {
      UI.displayFailure(character);
    }
  }

  static updateTimer() {
    totalSeconds += 1;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    UI.displayTimer(minutes, seconds);
  }

  static getTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
    return { minutes, seconds };
  }

  static startTimer() {
    timer = setInterval(this.updateTimer, 1000);
  }

  static stopTimer() {
    clearInterval(timer);
    totalSeconds = 0;
  }
}
