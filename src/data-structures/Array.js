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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Async bubble sort to animate the sorting.
  async bubbleSortAnimated(arr, onSwap) {
    let n = arr.length,
      swapped;
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
          if (onSwap && typeof onSwap === "function") {
            onSwap(arr, [i, i + 1]);
          }

          await this.sleep(20); // pause for 400ms between swaps
        }
      }
      n--;
    } while (swapped);
    return arr;
  }

  async insertionSortAnimated(arr, onSwap) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      let j = i;
      while (j > 0 && arr[j] < arr[j - 1]) {
        // Swap arr[j] and arr[j-1]
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;

        // Call the callback with the current state, if provided
        if (onSwap && typeof onSwap === "function") {
          onSwap(arr, [j - 1, j]);
        }

        await this.sleep(20); // Pause for visualization
        j--;
      }
    }
    return arr;
  }

  async selectionSortAnimated(arr, onSwap) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        // Swap arr[i] and arr[minIndex]
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

        if (onSwap && typeof onSwap === "function") {
          onSwap(arr, [i, minIndex]);
        }
        await this.sleep(20); // Pause for visualization
      }
    }
    return arr;
  }

  async quickSortAnimated(arr, low = 0, high = arr.length - 1, onSwap) {
    // Inner partition function using arrow function to capture 'this'
    const partition = async (low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          if (onSwap && typeof onSwap === "function") {
            onSwap(arr, [i, j]);
          }
          await this.sleep(20);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      if (onSwap && typeof onSwap === "function") {
        onSwap(arr, [i + 1, high]);
      }
      await this.sleep(20);
      return i + 1;
    };

    if (low < high) {
      const pi = await partition(low, high);
      await this.quickSortAnimated(arr, low, pi - 1, onSwap);
      await this.quickSortAnimated(arr, pi + 1, high, onSwap);
    }
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

  async updateAt(index, value) {
    await this.sleep(10);
    this.items[index] = value;
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
