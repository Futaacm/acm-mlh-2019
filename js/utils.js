const applyClasses = (classNames, element) => {
  element.classList.add(...(classNames.split(" ")))
}

const removeClasses = (classNames, element) => {
  classNames.split(" ").forEach(className => {
    element.classList.remove(className)
  })
}

function storePeopleData(data) {
  return localforage.setItem("peopleData", data)
}

function getPeopleData() {
  return localforage.getItem("peopleData")
}

async function toggleFavorite(personId) {
  const favorites = await getFavorites()
  const isInFavorites = await isFavorited(personId)
  if (!isInFavorites) {
    return localforage.setItem("favorites", [...favorites, personId])
  } else {
    return localforage.setItem("favorites", favorites.filter(id => personId !== id))
  }
}

async function getFavorites() {
  const favorites = await localforage.getItem("favorites")
  if (favorites === null ){
    localforage.setItem("favorites", [])
    return []
  }
  return favorites
}

async function isFavorited(personId) {
  const favorites = await getFavorites()
  return favorites.includes(personId)
}

async function renderFavoriteIcon (favoritedIcon, personId) {
  const favorited = await isFavorited(personId)
  favoritedIcon.innerText = ``
  if (favorited) {
    favoritedIcon.innerText = `favorite`
  } else {
    favoritedIcon.innerText = `favorite_border`
  }
}

function renderPeopleData(results, listEl) {
  listEl.innerHTML = ``
  results.forEach(async (result, index) => {
    const {name} = result
    const personId = index + 1
    const listItemEl = document.createElement("li")
    applyClasses("list-group-item list-group-item-action d-flex justify-content-between align-items-center", listItemEl)
    const personLinkEl = document.createElement("a")
    personLinkEl.href = `/person.html?id=${personId}`
    const personLinkText = document.createTextNode(name)
    const favoritedIcon = document.createElement("i")
    applyClasses("material-icons", favoritedIcon)
    favoritedIcon.addEventListener("click", async function () {
      await toggleFavorite(personId)
      await renderFavoriteIcon(favoritedIcon, personId)
    })
    await renderFavoriteIcon(favoritedIcon, personId)
    personLinkEl.appendChild(personLinkText)
    listItemEl.appendChild(personLinkEl)
    listItemEl.appendChild(favoritedIcon)
    listEl.appendChild(listItemEl)
  })
  return listEl
}