import UI from './UI';
import g from './global';

export default class BindEvent {
  static click() {
    const game = document.getElementById('game');
    game.addEventListener('mouseup', (e) => {
      e.preventDefault();
      document.body.style.cursor = 'default';
      g.isMouseDown = false;
      if (g.lastPos.x === e.clientX && g.lastPos.y === e.clientY) {
        UI.characterSelector(e.pageX, e.pageY);
      }
    });

    game.addEventListener('mousedown', (e) => {
      e.preventDefault();
      document.body.style.cursor = 'grabbing';
      g.start = { x: e.clientX - g.point.x, y: e.clientY - g.point.y };
      g.lastPos = { x: e.clientX, y: e.clientY };
      g.isMouseDown = true;
    });

    game.addEventListener('mousemove', (e) => {
      if (!g.isMouseDown) return;
      g.point.x = e.clientX - g.start.x;
      g.point.y = e.clientY - g.start.y;
      UI.applyTransform();
      UI.hideSelector();
      UI.removeCircle();
    });
  }

  static scroll() {
    const game = document.getElementById('game');
    game.addEventListener('wheel', (e) => {
      e.preventDefault();
      UI.setZoom(e);
      UI.hideSelector();
      UI.removeCircle();
    });
  }
}
