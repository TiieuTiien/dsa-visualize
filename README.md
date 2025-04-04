# Data Structure Visualization

This project provides a visual representation of data structures with a focus on array operations and sorting algorithms. You can visualize the bubble sort process and interact with the array via drag and drop and insertion.

## Features
- **[Array Visualization:](/public/index.html)** Displays an array as a set of vertical bars.
- **Animated Sorting:** Uses an animated bubble sort to visually swap elements.
- **Drag & Drop:** Interactively swap array elements using drag and drop.
- **Element Insertion:** Insert a random element at a random index in the array.

## Directory Structure

```
dsa-visualize/
├── assets/
│   └── styles/
│       └── styles.css
├── public/
│   └── index.html
├── src/
│   ├── data-structures/
│   │   └── Array.js
│   ├── drag-drop/
│   │   └── drag-drop.js
│   ├── App.js
│   └── index.js
└── package.json
```

## How to Run

1. **Clone the Repository:**  
   Clone the project to your local machine.

2. **Open in VS Code:**  
   Open the cloned repository with Visual Studio Code.

3. **Install Dependencies:**  
   If you add dependencies later, run:
   ```bash
   npm install
   ```

4. **Open index.html in a Browser:**  
   Open `/public/index.html` in your browser or use a live server extension in VS Code.

5. **Interacting with the App:**
   - Click **Start Sorting** to begin the animated bubble sort.
   - Click **Insert** to insert a random value at a random position.
   - Use drag and drop on the bars to swap their positions manually.

## Customization

- **Styles:** Customize the styles by modifying `/assets/styles/styles.css`.
- **Algorithm Speed:** Adjust the sorting animation speed by changing the delay in `/src/data-structures/Array.js`.
- **Data Structures:** Extend the project by adding more data structures to `/src/data-structures/`.

## License

This project is provided as is. Modify it as needed for your learning or development purposes.