import g from './global';

export default class UI {
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
    const barHeight = document.querySelector('.bottom-bar').offsetHeight;
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
    this.applyTransform();
  }

  static applyTransform() {
    const game = document.getElementById('game');
    this.checkEdge();
    game.style.transform = `translate(${g.point.x}px, ${g.point.y}px) scale(${g.scale})`;
  }

  static checkEdge() {
    if (g.point.x >= 0) g.point.x = 0;
    if (g.point.x <= g.max.x) g.point.x = g.max.x;
    if (g.point.y >= 0) g.point.y = 0;
    if (g.point.y <= g.max.y) g.point.y = g.max.y;
  }
}
