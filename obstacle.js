class Obstacle {

  constructor(config) {
    this.parentEl = config.parentEl;
    this.initialize(config)
  }

  initialize(config) {
    let el = document.createElement('div')

    el.setAttribute('id', `obstacle-${config.id}`)
    el.className = `obstacle ${config.type}`

    el.style.height = `${config.h} px`;
    el.style.width = `${config.w} px`;

    if (config.hasOwnProperty('top')){ el.style.top = `${config.top}px` }
    if (config.hasOwnProperty('right')){ el.style.right = `${config.right}px` }
    if (config.hasOwnProperty('bottom')){ el.style.bottom = `${config.bottom}px` }
    if (config.hasOwnProperty('left')){ el.style.left = `${config.left}px` }

    this.parentEl.appendChild(el);
    this.DOMcontainer = el;
    this.clientRects = el.getBoundingClientRect();
  }

}
