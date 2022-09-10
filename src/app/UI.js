import g from './global';

export default class UI {
  static displayGame(id) {
    const game = document.querySelector(`.game[data-game-id="${id}"]`);
    game.classList.remove('hidden');
    document.querySelector('.top-bar').classList.remove('hidden');
    document.querySelector('.main').classList.remove('hidden');
    document.querySelector('.games').classList.add('hidden');
    // const title = document.querySelector('.game-title');
    if (id === '1') {
      // title.innerText = 'Medieval traffic jam';
      this.removeFromSelector('wenda');
      this.removeFromBar('wenda');
    }
    if (id === '2') {
      // title.innerText = 'Work day at the moon';
    }
    if (id === '3') {
      // title.innerText = 'Stone age shenanigans';
      this.removeFromSelector('odlaw');
      this.removeFromBar('odlaw');
      this.removeFromSelector('wizard');
      this.removeFromBar('wizard');
    }
  }

  static displayLevels() {
    document.querySelectorAll('.game').forEach((el) => {
      el.classList.add('hidden');
    });
    document.querySelector('.top-bar').classList.add('hidden');
    document.querySelector('.main').classList.add('hidden');
    document.querySelector('.games').classList.remove('hidden');
    document.querySelectorAll('button[data-name]').forEach((el) => {
      el.classList.remove('hidden');
    });
    document.querySelectorAll('img[data-name]').forEach((el) => {
      el.classList.remove('hidden');
    });
  }

  static characterSelector(x, y) {
    const selector = document.querySelector('.character-selector');
    if (!selector.classList.contains('active')) {
      this.drawCircle(x, y, selector);
      this.setSelectorPos(x, y);
      this.showSelector();
    } else {
      this.removeCircle();
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
    g.max.x = -(e.target.width * g.scale - e.target.width);
    g.max.y = -(e.target.height * g.scale - e.target.height);
  }

  static applyTransform(useTransition) {
    const game = document.querySelector('.game:not(.hidden)');
    if (useTransition) game.style.transition = 'all 0.17s ease-in-out';
    else game.style.transition = 'none';
    this.checkEdge();
    game.style.transform = `translate(${g.point.x}px, ${g.point.y}px) scale(${g.scale})`;
  }

  static checkEdge() {
    if (g.point.x >= 0) g.point.x = 0;
    if (g.point.x <= g.max.x) g.point.x = g.max.x;
    if (g.point.y >= 0) g.point.y = 0;
    if (g.point.y <= g.max.y) g.point.y = g.max.y;
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

  static removeFromSelector(character) {
    const btnChar = document.querySelector(`button[data-name='${character}']`);
    btnChar.classList.add('hidden');
  }

  static removeFromBar(character) {
    const img = document.querySelector(`img[data-name='${character}']`);
    img.classList.add('hidden');
  }
}
