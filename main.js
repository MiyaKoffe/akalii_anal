
mainContent = document.querySelector(".main")
searchEntity = document.querySelector("#searchInput")
cardCountValue = document.querySelector(".count")

let from_value, to_value;
let musicIdOn = 1

function priceRange(priceType) {
    console.log(from_value, to_value)
    sellPrices = [...document.querySelectorAll(".content__card .sell-price")]
    buyPrices = [...document.querySelectorAll(".main .buy-price")]
    getAllCards = document.querySelectorAll(".main .content__card")

    sellMin = Math.min.apply(null, sellPrices.map(item => Number(item.textContent)))
    buyMax = Math.max.apply(null, buyPrices.map(item => Number(item.textContent)))

    priceType.id == 'from'? from_value = Number(priceType.value): to_value = Number(priceType.value)

    if (from_value == null || to_value == null){
        return;
    }

    for(let i = 0; i < sellPrices.length; i++){
        console.log(`From: ${from_value} sell: ${parseInt(sellPrices[i].textContent)}`)
        if((from_value <= parseInt(sellPrices[i].textContent) && to_value >= parseInt(sellPrices[i].textContent)) && ((from_value <= parseInt(buyPrices[i].textContent) && to_value >= parseInt(buyPrices[i].textContent)))){
            getAllCards[i].classList.remove("hidden")
        }else{
            getAllCards[i].classList.add("hidden")
        }
    }

    hiddenCount = document.querySelectorAll(".content__card.hidden")
    if (hiddenCount.length !== 0) {
        cardCountValue.textContent = getAllCards.length - hiddenCount.length
    }
}

function search(elem) {
    elem = elem.value || elem.textContent

    getAllCards = document.querySelectorAll(".main .content__card")
    if (!elem) cardCountValue.textContent = getAllCards.length

    if (getAllCards.length > 0 ) {
        for (card of getAllCards) {

            if (!card.textContent.toLocaleLowerCase().includes(elem.toLocaleLowerCase()))
                card.classList.add('hidden');
            else {
                card.classList.remove('hidden');
            }
        }

        hiddenCount = document.querySelectorAll(".content__card.hidden")
        if (hiddenCount.length !== 0)
            cardCountValue.textContent = getAllCards.length - hiddenCount.length

    }
}
const arrayValidateInfoToShow = {
    houseware:  ["tag", "buyprice", "sellprice", "source"],
    fish:       ["availability"],
    songs:      [ "buy-price", "sell-price"],
    villagers:  ["personality", "gender", "hobby"]
};

const arrayFilterToShow = {

    houseware: [{
        tag: [ "Musical Instrument", "Bed", "Arch", "Chair", "Seaside", "Vehicle", "Fan", "Clock", "Hospital", "Desk" ],
        source: ["C.J.", "Flick", "Nook's Cranny", "Nook Shopping Seasonal", "Nook Shopping Promotion", "Starting items", "Crafting", "Birthday", "Nook Miles Redemption", "Nook's Cranny; Pavé", "Luna", "Gulliver", "Gullivarrr" , "Crafting; Nook's Cranny" , "Crafting; Jack" , "Jingle" , "Crafting; Nook's Cranny; Franklin" , "Cyrus"]
    }],

    fish: [{
        rarity:  ["Common", "Uncommon", "Rare", "Ultra-rare" ],
        location: ["Pond", "River", "River (Clifftop)", "Sea", "River (Mouth)", "River (Clifftop) & Pond", "Pier", "Sea (when raining or snowing)" ]
    }],

    villagers: [{
        gender: [ "Male", "Female" ],
        hobby: [ "Education", "Play", "Fashion", "Nature", "Fitness", "Music" ],
        personality: [ "Jock", "Cranky", "lazy", "Snooty", "Smug", "Normal", "Peppy", "Uchi" ]
    }]
}

function filter(elem) {
    for (item of elem.parentElement.children){
        if (item.classList.contains('active'))
            item.classList.remove('active')

        elem.classList.add('active')
    }
    search(elem)
}

function generateCategoryFilter(category) {
    soundsplayer = document.querySelector('.music_content')
    if (category == 'songs') {soundsplayer.classList.remove("hidden")} else soundsplayer.classList.add("hidden")

    filterContentInner = document.querySelector(".filtersUse")
    ulFilters = document.createElement("ul")

    for(item of arrayFilterToShow[category]) {
        ulFilters.className = "filters "

        for (id in item) {
            filterTitleDesc = create_element(ulFilters, "p", ['title_filter'])
            filterTitleDesc.textContent = id

            for (value_id of item[id]) {
                liFilterItem = create_element(ulFilters, "li", ['filter_card', "(range)"])
                liFilterItem.textContent = value_id
                liFilterItem.setAttribute("value", value_id)
                liFilterItem.setAttribute("onclick", `filter(this)`)
            }
        }
        filterContentInner.appendChild(ulFilters)

        if (item.range) {
            ulFilters.class
            priceRangeContainer = document.createElement("div")
            priceRangeContainer.className = "priceRange"

            for (elem of []) {
                input = document.createElement("input")
                input.type = "number"; input.id = elem; input.placeholder = elem
                input.setAttribute("onkeyup", `priceRange(this)`)
                priceRangeContainer.appendChild(input)
            }
            filterContentInner.appendChild(priceRangeContainer)
        }
    }
}
function create_element (path, elemName, arrayClassName = []) {
    element = document.createElement(elemName)

    if (arrayClassName.length > 0) {
        element.classList.add(...arrayClassName)
    }

    path.appendChild(element)
    return element
}

function createCard(imgUrl, objectInfo, entity, id) {
    contentCard = create_element(mainContent, "div", ['content__card'])

    imgCard = create_element(contentCard, "div", ['img_card'])
    img = create_element(imgCard, "img")
    img.src = imgUrl
    infoList = create_element(contentCard, "ul", ['info__card'])
    for (key in objectInfo) {
        elemLi = create_element(infoList, "li", ['card_items'])
        infoListTitle = create_element(elemLi, "p", ["title"])
        infoListTitle.textContent = key
        infoListDesc = create_element(elemLi, "p", ['desc', key])
        infoListDesc.textContent = objectInfo[key]
    }
    if (entity == "songs") {
        play = create_element(contentCard, "div", ['play_music'])
        play.textContent = '(.)(.)'
        play.id = id
        play.setAttribute("onclick", `playMusic(this)`)
    }
}

function is_inside(category, key) {
    return arrayValidateInfoToShow[category].indexOf(key) > -1? true: false
}

function deleteContent() {
    mainContent.innerHTML = ""
    filterUseInner = document.querySelector('.filtersUse')
    if (filterUseInner.children.length > 0) filterUseInner.innerHTML = ''
}

function objectSelect(elem) {

    if (elem.children[0].classList.length === 2) return

    for (let btn of elem.parentElement.children) {
        link = btn.querySelector('a');

        if (link.classList.contains('active')) {
            link.classList.remove('active');
        }
        if (btn.id == elem.id) {
            link.classList.add('active');
        }
    }

    deleteContent()
    sendRequest(elem.id)
    generateCategoryFilter(elem.id)
}
function sendRequest(elem) {
    fetch(`https://acnhapi.com/v1a/${elem}`)
    .then((res) => {
    if (res.ok) {
        return res.json()
    }
    })
    .then((e) => {
        let card = new Object()
        const arrayContent = e.flat(Infinity)
        cardCountValue.textContent = arrayContent.length

        for (contentNumber of arrayContent) {
            arrayKeys = (Object.keys(contentNumber))
            for (key of arrayKeys) {
                if (is_inside((elem), key)) {
                    card.name = contentNumber.name['name-EUru']

                    if (typeof contentNumber[key] === "object" & !!contentNumber[key]) {
                        switch (key) {
                            case "availability":
                                card.location = contentNumber[key].location
                                card.rarity = contentNumber[key].rarity
                                card.price = contentNumber[key].price || "Неизвестно"
                                break;
                            case "catch-translations":
                                card.personality = contentNumber[key].personality
                                card.birthday = contentNumber[key].birthday
                                card.hobby = contentNumber[key].hobby
                                card.gender = contentNumber[key].gender
                        }
                    } else {
                        card[key] = contentNumber[key] || "Неизвестно"
                    }
                }
            }
            createCard(contentNumber.image_uri, card, elem,  contentNumber.id)
        }
    });
}


async function playMusic(card) {

    const activeAudio = document.querySelector('.play_music.active')
    if (activeAudio) {activeAudio.classList.remove('active')}

    card.classList.add('active')

    const audio = document.querySelector('.audio')
    let reguest = await fetch(`http://acnhapi.com/v1a/music/${card.id}`)
    if (reguest.ok) {
        const convertDataURIToBinary = URL.createObjectURL(await reguest.blob());
        audio.setAttribute("src", convertDataURIToBinary)
        audio.play()
    }
}

objectSelect(document.querySelector("#songs"))
