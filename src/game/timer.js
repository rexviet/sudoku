export class Timer {
  constructor() {
    this.startTime = null;
    this.elapsed = 0;
    this.intervalId = null;
    this.listeners = [];
    this.isRunning = false;
  }

  _startInterval() {
    if (this.isRunning) return;
    this.startTime = Date.now() - this.elapsed;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.elapsed = Date.now() - this.startTime;
      this.emit('tick', this.getElapsed());
    }, 1000);
  }

  start() {
    this.elapsed = 0;
    this._startInterval();
  }

  pause() {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.elapsed = Date.now() - this.startTime;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resume() {
    this._startInterval();
  }

  reset() {
    this.pause();
    this.startTime = null;
    this.elapsed = 0;
    this.emit('tick', 0);
  }

  getElapsed() {
    return this.elapsed;
  }

  setElapsed(ms) {
    this.elapsed = ms;
    if (this.isRunning) {
      this.startTime = Date.now() - this.elapsed;
    }
  }

  getFormatted() {
    const totalSeconds = Math.floor(this.elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  on(event, callback) {
    if (event === 'tick') {
      this.listeners.push(callback);
    }
  }

  off(callback) {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  emit(event, data) {
    if (event === 'tick') {
      this.listeners.forEach(callback => callback(data));
    }
  }

  destroy() {
    this.pause();
    this.listeners = [];
  }
}
