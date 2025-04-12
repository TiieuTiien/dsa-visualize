// src/data-structures/Array.js
class ArrayStructure {
    constructor(size) {
      this.items = this.generateArray(size);
    }
  
    // Function to generate a random array
    generateArray(size) {
      const arr = [];
      for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
      }
      return arr;
    }

    // Helper function to delay execution.
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Async bubble sort to animate the sorting.
    async bubbleSortAnimated(arr, onSwap) {
      let n = arr.length, swapped;
      do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            // Swap two elements
            let temp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = temp;
            swapped = true;

            // Call the callback with the current state, if provided
            if (onSwap && typeof onSwap === 'function') {
              onSwap(arr, [i, i + 1]);
            }    

            await this.sleep(20); // pause for 400ms between swaps
          }
        }
        n--;
      } while (swapped);
      return arr;
    }

    async randomizeArray() {
      for (let i = this.items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
        await this.sleep(10); // slight delay for visualization
      }
      return this.items;
    }
  
    // Get the array for visualization
    getArray() {
      return this.items;
    }

    async insertAt(index, value) {
      await this.sleep(10);
      this.items.splice(index, 0, value);
      return this.items;
    }
    
    async removeAt(index) {
      await this.sleep(10);
      if (index < 0 || index >= this.items.length) {
        throw new Error("Index out of bounds");
      }
      this.items.splice(index, 1);
      return this.items;
    }
}
  
export default ArrayStructure;
  