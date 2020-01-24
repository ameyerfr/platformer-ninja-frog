class Item extends Obstacle {
  constructor(config) {
    super(config);
    this.hidden = false;
  }

  isGrabbed() {
    this.hide();
  }

  hide() {
    this.hidden = true;
    this.DOMcontainer.style.display = 'none';
  }

  show() {
    this.hidden = false;
    this.DOMcontainer.style.display = 'block';
  }
  
}
