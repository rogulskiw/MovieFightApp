const createAutoComplete = ({root, renderOption, onOptionSelect, inputValue, fetchData}) => {
root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown')
const resultsWrapper = root.querySelector('.results')

const onInput = debounce(async event => { //Debouncing an input
    const items = await fetchData(event.target.value);

    if(!items.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for(let item of items){
        const option = document.createElement('a');

        option.classList.add('dropdown-item')
        option.innerHTML = renderOption(item);
        option.addEventListener('click', () => {
            dropdown.classList.remove('is-active')
            input.value = inputValue(item);
            onOptionSelect(item)
        })
        resultsWrapper.appendChild(option)
    }
}, 500);
    
input.addEventListener('input', onInput)

//Debounce could be also implented this way
// const onInput = event => { //Debouncing an input
//     fetchData(event.target.value)
// };
    
// input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', event => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
})
}