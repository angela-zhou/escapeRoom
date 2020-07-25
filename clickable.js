/* global collideRectRect, mouseX, mouseY */

class Clickable {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
    
  // returns true if the rectangle and cursor collide
  hit(cursorW, cursorH) {
    let hit = collideRectRect(this.x, this.y, this.w, this.h, mouseX, mouseY, cursorW, cursorH);
    return hit;
  }
  
}