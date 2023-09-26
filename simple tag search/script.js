const tagSelect = document.getElementById('tagSelect');
const filterButton = document.getElementById('filterButton');

// Load data from data.json
let data = []; // Store the loaded data globally

fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Store the loaded data
        populateTagOptions();
    });

function populateTagOptions() {
    const tags = new Set();

    data.forEach(item => {
        item.tags.forEach(tag => {
            tags.add(tag);
        });
    });

    const tagSelect = document.getElementById('tagSelect');

    tags.forEach(tag => {
        const option = document.createElement('option');
        option.text = tag;
        option.value = tag;
        tagSelect.appendChild(option);
    });
}

filterButton.addEventListener('click', () => {
    const selectedTags = Array.from(tagSelect.selectedOptions, option => option.value);
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    data.forEach(item => {
        if (selectedTags.every(tag => item.tags.includes(tag)) || selectedTags.length === 0) {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = item.name;
            itemContainer.appendChild(itemDiv);
        }
    });
});
