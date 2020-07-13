
// Funçoes e estrategias para o preenchiento do formulári0

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for(state of states){
               ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }            
        });
}

populateUfs();

function getCities(event){
   const citySelect = document.querySelector("select[name=city]");
   const stateInput = document.querySelector("input[name=state]");
   const ufValue = event.target.value;
   const indexOfSelectedState = event.target.selectedIndex
   stateInput.value = event.target.options[indexOfSelectedState].text
  
   //faz com q ao trocar o estado zere as cidades do estado anterior.
   citySelect.innerHTML = "<option value>Selecione a cidade</option>"
   //bloqueia o select de cidades.
   citySelect.disabled = true
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
            .then(res => res.json())
            .then(cities => {
                for(city of cities){
                  citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                }   
                citySelect.disabled = false         
            });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)


// FUNÇÕES E ESTRATÉGIAS PARA ITENS DE COLETA

// Pegar todas as <li> através do click e chama a função handleSelectedItem.
const itensToCollect = document.querySelectorAll(".itens-grid li")
for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

// Cria um array de itens selecionados.
let selectedItens = []
// Função irá adicionar ou remover uma classe no javascript 
function handleSelectedItem(event){
    // O event.target pega <li data-id="1"> mais os filhos <img> <span>.
    const itemLi = event.target
    // Verifica se esta selecionado ou se não esta selecionado.
    itemLi.classList.toggle("selected")
    // itemId recebe apenas o id da <li data-id>
    const itemId = itemLi.dataset.id
    
    // Verificar se existe itens selecionados, se sim pega e adiciona no array alReadySelected.
    const alReadySelected = selectedItens.findIndex(item => {
        const itemFound = item == itemId 
        return itemFound
    })
    // Se alReadySelected for igual ou maior q zero significa q existe itens no selectItens.
    // Faz um filtro comparando se o item existe, Se ele ja estiver ele será excluido.
    // E os itens restante adicionados ao array filteresItens.  
    if(alReadySelected >= 0){
            const filteredItens = selectedItens.filter(item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
         })
       selectedItens = filteredItens
    }else{ 
        // Por padrão nenhum item iniciará selecionado então cairá no else.
        // Se não tiver selecionado adciona no array. 
        selectedItens.push(itemId)
       
    }    
    //Atualizar o input escondido no formulario com o array selectedItens
    collectedItens.value = selectedItens
    console.log(collectedItens)
}