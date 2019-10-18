const listEl = document.getElementById("people-list")

async function fetchPeopleFromApi() {
  fetch(`https://swapi.co/api/people`)
    .then(response => response.json())
    .then(async response => {
      const {count, results} = response
      renderPeopleData(results, listEl);
      await storePeopleData(results)
    })
}


fetchPeopleFromApi()