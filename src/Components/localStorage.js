let favorites = [];
favorites = GetLocalStorage();


function saveToLocalStorageByName(name){

    favorites = GetLocalStorage();

    favorites.push(name);
    console.log(name);

    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

function GetLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');

    if(localStorageData == null)
    {
        return [];
    }

    return JSON.parse(localStorageData);
}

function RemoveFromLocalStorage(name){
    favorites = GetLocalStorage();
    console.log(name);

    let nameIndex = favorites.indexOf(name);

    favorites.splice(nameIndex, 1);

    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export {saveToLocalStorageByName, GetLocalStorage, RemoveFromLocalStorage, favorites};