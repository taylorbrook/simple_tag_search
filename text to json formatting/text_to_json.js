const fs = require('fs'); // Node.js filesystem module
const path = require('path'); // Node.js path module

// Input folder path and output JSON file path
const inputFolder = './txt_files'; // Replace with the path to your input folder
const outputFile = 'output.json'; // Replace with your desired output JSON file path

const items = [];

// Read each text file in the input folder
fs.readdirSync(inputFolder).forEach((file) => {
    if (file.endsWith('.txt')) {
        const filePath = path.join(inputFolder, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const [name, ...tags] = fileContent.split(','); // Split by comma

        // Trim whitespace from name and tags
        const trimmedName = name.trim();
        const trimmedTags = tags.map(tag => tag.trim());

        items.push({
            name: trimmedName,
            tags: trimmedTags
        });
    }
});

// Write the data as an array directly in the JSON file
fs.writeFileSync(outputFile, JSON.stringify(items, null, 4)); // Format with 4-space indentation
console.log(`Data has been written to ${outputFile}`);
