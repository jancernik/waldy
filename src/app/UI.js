import g from './global';

export default class UI {
  static prepareGame(id) {
    const game = document.querySelector(`.game[data-game-id="${id}"]`);
    game.classList.remove('hidden');
    document.querySelector('.top-bar').classList.remove('hidden');
    document.querySelector('.main').classList.remove('hidden');
    if (id === '1') {
      this.removeFromSelector('wenda');
      this.removeFromBar('wenda');
    }
    if (id === '3') {
      this.removeFromSelector('odlaw');
      this.removeFromBar('odlaw');
      this.removeFromSelector('wizard');
      this.removeFromBar('wizard');
    }
  }

  static displayGame() {
    const games = document.querySelector('.games');
    games.style.transform = 'translateY(100%)';
    // setTimeout(() => {
    //   games.classList.add('hidden');
    // }, 1000);
  }

  static redisplayGame(id) {
    this.resetTimer();
    document.querySelectorAll('button[data-name]').forEach((el) => {
      el.classList.remove('hidden');
    });
    document.querySelectorAll('img[data-name]').forEach((el) => {
      el.classList.remove('hidden');
      el.classList.remove('success');
    });
    if (id === 1) {
      this.removeFromSelector('wenda');
      this.removeFromBar('wenda');
    }
    if (id === 3) {
      this.removeFromSelector('odlaw');
      this.removeFromBar('odlaw');
      this.removeFromSelector('wizard');
      this.removeFromBar('wizard');
    }
    document.querySelector('.end-card').classList.add('hidden');
    document.querySelector('.top-bar').classList.remove('end');
  }

  static displayLevels() {
    // document.querySelector('.games').classList.remove('hidden');
    g.transitionEnded = false;
    document.querySelector('.games').style.transform = 'translateY(0)';
    setTimeout(() => {
      document.querySelector('.top-bar').classList.add('hidden');
      document.querySelector('.main').classList.add('hidden');
      document.querySelector('.end-card').classList.add('hidden');
      document.querySelector('.top-bar').classList.remove('end');
      document.querySelectorAll('button[data-name]').forEach((el) => {
        el.classList.remove('hidden');
      });
      document.querySelectorAll('img[data-name]').forEach((el) => {
        el.classList.remove('hidden');
        el.classList.remove('success');
      });
      document.querySelectorAll('.game').forEach((el) => {
        el.classList.add('hidden');
      });
      g.transitionEnded = true;
    }, 800);
  }

  static characterSelector(x, y) {
    const selector = document.querySelector('.character-selector');
    if (!selector.classList.contains('active')) {
      // this.drawCircle(x, y, selector);
      this.setSelectorPos(x, y);
      this.showSelector();
    } else {
      // this.removeCircle();
      this.hideSelector();
    }
  }

  static showSelector() {
    document.querySelector('.character-selector').classList.add('active');
  }

  static hideSelector() {
    document.querySelector('.character-selector').classList.remove('active');
  }

  static setSelectorPos(x, y) {
    const selector = document.querySelector('.character-selector');
    const barHeight = document.querySelector('.top-bar').offsetHeight;
    const selectorHeight = selector.offsetHeight;
    const centerX = x - selector.offsetWidth / 2;
    const vOffset = 30;
    if (selectorHeight + y > window.innerHeight - (barHeight + vOffset)) {
      selector.style.top = `${y - vOffset - 5 - selectorHeight}px`;
    } else {
      selector.style.top = `${y + vOffset + 5}px`;
    }
    if (x - selector.offsetWidth / 2 - 5 < 0) {
      selector.style.left = `${x}px`;
    } else if (x + selector.offsetWidth / 2 + 5 > window.innerWidth) {
      selector.style.left = `${x - selector.offsetWidth}px`;
    } else {
      selector.style.left = `${centerX}px`;
    }
  }

  static drawCircle(x, y, selector) {
    const circleSize = 50;
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = `${x - circleSize / 2}px`;
    circle.style.top = `${y - circleSize / 2}px`;
    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    selector.append(circle);
  }

  static removeCircle() {
    const circle = document.querySelector('.circle');
    if (circle) circle.parentNode.removeChild(circle);
  }

  static setZoom(e) {
    const xs = (e.clientX - g.point.x) / g.scale;
    const ys = (e.clientY - g.point.y) / g.scale;
    if (e.wheelDelta > 0 && g.scale < 7) g.scale *= 1.2;
    if (e.wheelDelta < 0 && g.scale > 1) g.scale /= 1.2;
    if (g.scale !== 1) {
      g.point.x = e.clientX - xs * g.scale;
      g.point.y = e.clientY - ys * g.scale;
    } else {
      g.point.x = 0;
      g.point.y = 0;
    }
    // g.max.x = -(e.target.width * g.scale - e.target.width);
    // g.max.y = -(e.target.height * g.scale - e.target.height);
  }

  static applyTransform(useTransition) {
    const game = document.querySelector('.game:not(.hidden)');
    if (useTransition) game.style.transition = 'all 0.17s ease-in-out';
    else game.style.transition = 'none';
    game.style.transform = `translate(${g.point.x}px, ${g.point.y}px) scale(${g.scale})`;
    // this.checkEdge();
  }

  static checkEdge() {
    if (g.point.x >= 0) g.point.x = 0;
    if (g.point.x <= g.max.x) g.point.x = g.max.x;
    if (g.point.y >= 0) g.point.y = 0;
    if (g.point.y <= g.max.y) g.point.y = g.max.y;
  }

  static displayTimer(minutes, seconds, selector) {
    if (selector === '.timer') {
      const min = minutes < 10 ? `0${minutes}` : minutes;
      const sec = seconds < 10 ? `0${seconds}` : seconds;
      document.querySelector(selector).innerText = `${min}:${sec}`;
    } else if (selector === '.end-timer') {
      let min = '';
      if (minutes === 1) min = '1 minute and ';
      if (min > 1) min = `${minutes} minutes and `;
      document.querySelector(selector).innerText = `${min}${seconds} seconds`;
    }
  }

  static resetTimer() {
    document.querySelector('.timer').innerText = '00:00';
  }

  static displayFailure(character) {
    const imgChar = document.querySelector(`img[data-name='${character}']`);
    imgChar.classList.add('failure');
    setTimeout(() => {
      imgChar.classList.remove('failure');
    }, 800);
  }

  static displaySuccess(character) {
    const imgChar = document.querySelector(`img[data-name='${character}']`);
    imgChar.classList.add('success');
    this.removeFromSelector(character);
  }

  static displayEnd() {
    document.querySelector('.top-bar').classList.add('end');
    const endCard = document.querySelector('.end-card');
    endCard.style.opacity = '0';
    endCard.classList.remove('hidden');
    setTimeout(() => {
      endCard.style.opacity = '1';
    }, 800);
  }

  static removeFromSelector(character) {
    const btnChar = document.querySelector(`button[data-name='${character}']`);
    btnChar.classList.add('hidden');
  }

  static removeFromBar(character) {
    const img = document.querySelector(`img[data-name='${character}']`);
    img.classList.add('hidden');
  }
}
