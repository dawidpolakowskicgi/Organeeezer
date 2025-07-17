const itemsList = document.getElementById('items-list');
let items = [];

function render() {
  itemsList.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.checked;
    checkbox.addEventListener('change', () => {
      items[index].checked = checkbox.checked;
      window.api.saveItems(items);
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.value = item.label;
    input.classList.add('item-input');
    input.addEventListener('change', () => {
      items[index].label = input.value;
      window.api.saveItems(items);
    });

    li.appendChild(checkbox);
    li.appendChild(input);
    itemsList.appendChild(li);
  });
}

window.api.loadItems().then(loadedItems => {
  items = loadedItems;
  render();
});

document.getElementById('add-button').addEventListener('click', () => {
  items.push({ label: 'New item', checked: false });
  window.api.saveItems(items);
  render();
});

document.getElementById('close-button').addEventListener('click', () => {
  window.api.closeWindow();
});

document.getElementById('minimize-button').addEventListener('click', () => {
  window.api.minimizeWindow();
});