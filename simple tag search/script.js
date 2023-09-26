const tagButtons = document.querySelectorAll('.tag-button');
const filterButton = document.getElementById('filterButton');
const itemContainer = document.getElementById('itemContainer');

let data = []; // Store the loaded data globally
const selectedTags = new Set(); // Store selected tags

// Load data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Store the loaded data
        populateTagButtons();
    });

function populateTagButtons() {
    const tags = new Set();

    data.forEach(item => {
        item.tags.forEach(tag => {
            tags.add(tag);
        });
    });

    const tagButtonsContainer = document.getElementById('tagButtons');

    tags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.id = tag;
        button.className = 'tag-button';
        tagButtonsContainer.appendChild(button);

        button.addEventListener('click', () => {
            button.classList.toggle('selected'); // Toggle the selected class
            const tag = button.textContent;

            if (button.classList.contains('selected')) {
                selectedTags.add(tag);
            } else {
                selectedTags.delete(tag);
            }
        });
    });
}

filterButton.addEventListener('click', () => {
    itemContainer.innerHTML = '';

    data.forEach(item => {
        if (selectedTags.size === 0 || selectedTags.has(item.tags.find(tag => selectedTags.has(tag)))) {
            const itemTags = new Set(item.tags);
            const intersection = [...selectedTags].filter(tag => itemTags.has(tag));

            if (intersection.length === selectedTags.size) {
                const itemDiv = document.createElement('div');
                itemDiv.textContent = item.name;
                itemContainer.appendChild(itemDiv);
            }
        }
    });
});
