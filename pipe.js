function Pipe() {
    this.gapSize = 200;
    this.gapHeight = random(this.gapSize / 2, height - this.gapSize / 2)
    this.top = this.gapHeight - this.gapSize / 2
    this.bottom = this.gapHeight + this.gapSize / 2
    this.x = width;
    this.w = 75;
    this.speed = -6 ;
    this.highlight = false;

    this.show = function() {
        if (this.highlight) {
            fill(255, 0, 0)
        } else {
            fill(255);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height - this.bottom)
    }

    this.update = function() {
        this.x += this.speed;
    }

    this.offscreen = function() {
        return this.x < -this.w; 
    }

    this.hits = function(bird) {
        if ((bird.y < this.top || bird.y >  this.bottom) && (bird.x > this.x && bird.x < this.x + this.w)) {
            this.highlight = true;
            return true;
        } else {
            this.highlight = false;
            return false;
        }
    }
}