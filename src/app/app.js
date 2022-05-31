import g from './global';
import UI from './UI';

export default class App {
  static checkGuess(character) {
    const game = document.querySelector('.game');
    const targetGameID = parseInt(game.getAttribute('data-game-ID'), 10);
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
}
