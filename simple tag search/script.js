// Load data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Populate tag options
        const tagSelect = document.getElementById('tagSelect');
        const tags = new Set();

        data.forEach(item => {
            item.tags.forEach(tag => {
                tags.add(tag);
            });
        });

        tags.forEach(tag => {
            const option = document.createElement('option');
            option.text = tag;
            tagSelect.appendChild(option);
        });

        // Filter and display items based on tag selection
        tagSelect.addEventListener('change', () => {
            const selectedTag = tagSelect.value;
            const itemContainer = document.getElementById('itemContainer');
            itemContainer.innerHTML = '';

            data.forEach(item => {
                if (item.tags.includes(selectedTag) || selectedTag === 'All') {
                    const itemDiv = document.createElement('div');
                    itemDiv.textContent = item.name;
                    itemContainer.appendChild(itemDiv);
                }
            });
        });
    });
