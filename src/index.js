const DOGSURL = 'http://localhost:3000/dogs'
const TABLE = document.getElementById('table-body')
const EDITFORM = document.getElementById('dog-form')

const header = (method, body = {}) => {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const editDogHandler = (dog) => {
    EDITFORM.name.value = dog.name
    EDITFORM.breed.value = dog.breed
    EDITFORM.sex.value = dog.sex
    EDITFORM.id = dog.id
}
const editDog = (name, breed, sex) => {
    fetch(DOGSURL + `/${EDITFORM.id}`, header('PATCH', {
        name: name,
        breed: breed,
        sex: sex
    }))
}
const formEventHandler = (e) => {
    const name = e.target.name.value
    const breed = e.target.breed.value
    const sex = e.target.sex.value
    editDog(name, breed, sex)
}
EDITFORM.addEventListener('submit', formEventHandler)


const getDogs = () => {
    return fetch(DOGSURL)
        .then(response => response.json())
}
const createDogRow = (dog) => {
    const row = TABLE.insertRow(0)
    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const buttonWrapper = document.createElement('td')
    const button = document.createElement('button')


    button.textContent = 'Edit'
    name.textContent = dog.name
    breed.textContent = dog.breed
    sex.textContent = dog.sex

    button.addEventListener('click', () => editDogHandler(dog))

    buttonWrapper.appendChild(button)
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(buttonWrapper)
}

const buildPage = () => {
    EDITFORM.name.value = ''
    EDITFORM.breed.value = ''
    EDITFORM.sex.value = ''
    getDogs()
        .then(dogsArray => dogsArray.forEach(createDogRow))

}

document.addEventListener('DOMContentLoaded', buildPage)