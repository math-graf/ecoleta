// document.querySelector('select[name=uf]').addEventListener('change', () => {
//    console.log('mudei')
//}) arrow function

function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then( (res) => { return res.json() }) // para um parâmetro e um retorno, a arrow function pode ser escrita como res => res.json() (opcional)
    .then(states => {
    
        for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a Cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json() }) // para um parâmetro e um retorno, a arrow function pode ser escrita como res => res.json() (opcional)
    .then(cities => {

        for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false //o <select> para cidades estava desabilitado até aqui. Se o estado for selecionado, o <select> é habilitado.
    })

}



document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// Items de coleta

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle('selected')

    // toggle() adiciona ou remove dependendo do estado inicial do item.
    // se existir 'selected', remove, se não existir, adiciona.
    // add() adiciona
    // remove() remove
    
    const itemId = itemLi.dataset.id //seleciona o elemento com data-id

    console.log('ITEM ID: ', itemId);

    // algoritmo:
    // verificar se existem itens selecionados
    
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // Se sim, pegar os itens selecionados

    if (alreadySelected >= 0) {
        // Se já estiver selecionado, tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
    // Se não estiver selecionado, adicionar à seleção
    selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems);

    // Atualizar o input:hidden com os itens selecionados
    collectedItems.value = selectedItems

}