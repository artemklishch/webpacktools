console.log('polyfill for map');

Array.prototype.flat = Array.prototype.flatMap || function flatMap(){
    // ... implementation for older browsers
};