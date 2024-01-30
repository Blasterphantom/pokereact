import React from "react";
import star from "../Assets/Star1.png";
import star2 from "../Assets/Star2.png";
import bug from "../Assets/BugIC_RSE.png";
import dark from "../Assets/DarkIC_RSE.png";
import dragon from "../Assets/DragonIC_RSE.png";
import electric from "../Assets/ElectricIC_RSE.png";
import fairy from "../Assets/Fairy.png";
import fighting from "../Assets/FightingIC_RSE.png";
import flying from "../Assets/FlyingIC_RSE.png";
import ghost from "../Assets/GhostIC_RSE.png";
import grass from "../Assets/GrassIC_RSE.png";
import ground from "../Assets/GroundIC_RSE.png";
import Ice from "../Assets/IceIC_RSE.png";
import normal from "../Assets/NormalIC_RSE.png";
import poison from "../Assets/PoisonIC_RSE.png";
import psychic from "../Assets/PsychicIC_RSE.png";
import rock from "../Assets/RockIC_RSE.png";
import steel from "../Assets/SteelIC_RSE.png";
import water from "../Assets/WaterIC_RSE.png";
import fire from "../Assets/FireIC_RSE.png";
import {
  saveToLocalStorageByName,
  GetLocalStorage,
  RemoveFromLocalStorage,
  favorites,
} from "./localStorage.js";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function HomeComponent() {
  let secondTypePic = document.getElementById("secondTypePic");
  let moves = document.getElementById("moves");

  const [pic, setPic] = useState(star);
  const [search, setSearch] = useState("Search Pokemon");
  const [sprite, setSprite] = useState();
  const [shiny, setShiny] = useState();
  const [location, setLocation] = useState("");
  const [ability, setAbility] = useState("");
  const [evolution, setEvolution] = useState("");
  const [typePic, setTypePic] = useState();
  const [typePic2, setTypePic2] = useState();
  const [pokemonName, setPokemonName] = useState("Pokemon Name");
  let asyncPokeApi;

  const handleSearch = async () => {
    GetPokeData(search.toLocaleLowerCase());

    GetLocalStorage();

    if (favorites.includes(search.toLocaleLowerCase()))
    {
        setPic(star2);
    }
    else
    {
        setPic(star);
    }
  };

  const handleFavorite = async () => {
    addAndRemoveFav(pokemonName.toLocaleLowerCase());
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleRandom = async () => {
    GetPokeData(Math.floor(Math.random() * 649) + 1);
  };

  function addAndRemoveFav(textPassed){

    GetLocalStorage();
    console.log(textPassed);

    if (favorites.includes(textPassed))
    {
        RemoveFromLocalStorage(textPassed);
        setPic(star);
    }
    else
    {
        saveToLocalStorageByName(textPassed);
        setPic(star2);
    }
  }


  async function GetPokeData(name) {
    console.log(name);
    await fetch("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((data) => data.json())
      .then((data) => {
        asyncPokeApi = data;
        console.log(asyncPokeApi);

        setPokemonName(asyncPokeApi.name.toLowerCase().charAt(0).toUpperCase() + asyncPokeApi.name.slice(1));

        setSprite(asyncPokeApi.sprites.front_default);
        setShiny(asyncPokeApi.sprites.front_shiny);

        let locationUrl = asyncPokeApi.location_area_encounters;

        GetLocation(locationUrl);

        setAbility(
          asyncPokeApi.abilities[0].ability.name
            .toLowerCase()
            .charAt(0)
            .toUpperCase() + asyncPokeApi.abilities[0].ability.name.slice(1)
        );

        if (asyncPokeApi.abilities[1]) {
          setAbility(
            asyncPokeApi.abilities[0].ability.name
              .toLowerCase()
              .charAt(0)
              .toUpperCase() +
              asyncPokeApi.abilities[0].ability.name.slice(1) +
              ", " +
              asyncPokeApi.abilities[1].ability.name
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              asyncPokeApi.abilities[1].ability.name.slice(1)
          );
        }

        if (asyncPokeApi.abilities[2]) {
          setAbility(
            asyncPokeApi.abilities[0].ability.name
              .toLowerCase()
              .charAt(0)
              .toUpperCase() +
              asyncPokeApi.abilities[0].ability.name.slice(1) +
              ", " +
              asyncPokeApi.abilities[1].ability.name
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              asyncPokeApi.abilities[1].ability.name.slice(1) +
              ", " +
              asyncPokeApi.abilities[2].ability.name
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              asyncPokeApi.abilities[2].ability.name.slice(1)
          );
        }

        removeOptions(moves);

        asyncPokeApi.moves.map((person) => {
          let option = document.createElement("option");
          option.value = person.move.name;
          option.textContent =
            person.move.name.toLowerCase().charAt(0).toUpperCase() +
            person.move.name.slice(1);

          moves.appendChild(option);
        });

        let evolutionUrl = asyncPokeApi.species.url;
        GetEvolutions(evolutionUrl);

        let type1 = asyncPokeApi.types[0].type.name;

        if (type1 === "normal") {
          setTypePic(normal);
        } else if (type1 === "bug") {
          setTypePic(bug);
        } else if (type1 === "dark") {
          setTypePic(dark);
        } else if (type1 === "dragon") {
          setTypePic(dragon);
        } else if (type1 === "electric") {
          setTypePic(electric);
        } else if (type1 === "fairy") {
          setTypePic(fairy);
        } else if (type1 === "fighting") {
          setTypePic(fighting);
        } else if (type1 === "fire") {
          setTypePic(fire);
        } else if (type1 === "flying") {
          setTypePic(flying);
        } else if (type1 === "ghost") {
          setTypePic(ghost);
        } else if (type1 === "grass") {
          setTypePic(grass);
        } else if (type1 === "ground") {
          setTypePic(ground);
        } else if (type1 === "ice") {
          setTypePic(Ice);
        } else if (type1 === "poison") {
          setTypePic(poison);
        } else if (type1 === "psychic") {
          setTypePic(psychic);
        } else if (type1 === "rock") {
          setTypePic(rock);
        } else if (type1 === "steel") {
          setTypePic(steel);
        } else if (type1 === "water") {
          setTypePic(water);
        }

        if (asyncPokeApi.types.length < 2) {
          secondTypePic.style.display = "none";
        } else {
          let type2 = asyncPokeApi.types[1].type.name;
          secondTypePic.style.display = "flex";

          if (type2 === "normal") {
            setTypePic2(normal);
          } else if (type2 === "bug") {
            setTypePic2(bug);
          } else if (type2 === "dark") {
            setTypePic2(dark);
          } else if (type2 === "dragon") {
            setTypePic2(dragon);
          } else if (type2 === "electric") {
            setTypePic2(electric);
          } else if (type2 === "fairy") {
            setTypePic2(fairy);
          } else if (type2 === "fighting") {
            setTypePic2(fighting);
          } else if (type2 === "fire") {
            setTypePic2(fire);
          } else if (type2 === "flying") {
            setTypePic2(flying);
          } else if (type2 === "ghost") {
            setTypePic2(ghost);
          } else if (type2 === "grass") {
            setTypePic2(grass);
          } else if (type2 === "ground") {
            setTypePic2(ground);
          } else if (type2 === "ice") {
            setTypePic2(Ice);
          } else if (type2 === "poison") {
            setTypePic2(poison);
          } else if (type2 === "psychic") {
            setTypePic2(psychic);
          } else if (type2 === "rock") {
            setTypePic2(rock);
          } else if (type2 === "steel") {
            setTypePic2(steel);
          } else if (type2 === "water") {
            setTypePic2(water);
          }
        }
      });
  }

  async function GetLocation(url) {
    await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        let locationPokeApi = data;
        console.log(locationPokeApi);

        if (locationPokeApi.length == 0) {
          setLocation("N/A");
        } else {
          const str = locationPokeApi[0].location_area.name.replace(/-/g, " ");
          const arr = str.split(" ");
          for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
          const str2 = arr.join(" ");

          setLocation(str2);
        }
      });
  }

  function removeOptions(element) {
    var i,
      L = element.options.length - 1;
    for (i = L; i >= 0; i--) {
      element.remove(i);
    }
  }

  async function GetEvolutions(url) {
    await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        let evolutionPokeApi = data;
        console.log(evolutionPokeApi);

        let evoChainUrl = evolutionPokeApi.evolution_chain.url;
        GetEvoChain(evoChainUrl);
      });
  }

  async function GetEvoChain(url) {
    await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        let evoChainPokeApi = data;
        console.log(evoChainPokeApi);

        let evoChain = [];
        let evoData = evoChainPokeApi.chain;

        do {
          let numberOfEvolutions = evoData["evolves_to"].length;

          evoChain.push({
            species_name: evoData.species.name,
          });

          if (numberOfEvolutions > 1) {
            for (let i = 1; i < numberOfEvolutions; i++) {
              evoChain.push({
                species_name: evoData.evolves_to[i].species.name,
              });
            }
          }

          evoData = evoData["evolves_to"][0];
        } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

        console.log(evoChain);

        setEvolution(
          evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
            evoChain[0].species_name.slice(1)
        );

        if (evoChain[1].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1)
          );
        }

        if (evoChain[2].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1)
          );
        }

        if (evoChain[3].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1)
          );
        }

        if (evoChain[4].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1)
          );
        }

        if (evoChain[5].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1) +
              ", " +
              evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[5].species_name.slice(1)
          );
        }

        if (evoChain[6].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1) +
              ", " +
              evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[5].species_name.slice(1) +
              ", " +
              evoChain[6].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[6].species_name.slice(1)
          );
        }

        if (evoChain[7].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1) +
              ", " +
              evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[5].species_name.slice(1) +
              ", " +
              evoChain[6].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[6].species_name.slice(1) +
              ", " +
              evoChain[7].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[7].species_name.slice(1)
          );
        }

        if (evoChain[8].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1) +
              ", " +
              evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[5].species_name.slice(1) +
              ", " +
              evoChain[6].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[6].species_name.slice(1) +
              ", " +
              evoChain[7].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[7].species_name.slice(1) +
              ", " +
              evoChain[8].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[8].species_name.slice(1)
          );
        }

        if (evoChain[9].species_name) {
          setEvolution(
            evoChain[0].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(1) +
              ", " +
              evoChain[1].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[1].species_name.slice(1) +
              ", " +
              evoChain[2].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[2].species_name.slice(1) +
              ", " +
              evoChain[3].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[3].species_name.slice(1) +
              ", " +
              evoChain[4].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[4].species_name.slice(1) +
              ", " +
              evoChain[5].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[5].species_name.slice(1) +
              ", " +
              evoChain[6].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[6].species_name.slice(1) +
              ", " +
              evoChain[7].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[7].species_name.slice(1) +
              ", " +
              evoChain[8].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[8].species_name.slice(1) +
              ", " +
              evoChain[9].species_name.toLowerCase().charAt(0).toUpperCase() +
              evoChain[0].species_name.slice(9)
          );
        }
      });
  }

  return (
    <Container className="homeContainer">
      <div className="titleBox">
        <h1 className="pokemonFont">Pokemon Api</h1>
      </div>
      <div
        className="convertOr grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}
      >
        <div className="boxSearch col-span-4 w-80 h-full p-0 m-0 flex flex-col items-center">
          <input
            id="boxSearch"
            className="form-control"
            type="search"
            onChange={handleChange}
            placeholder={search}
            aria-label="Search"
          />

          <button
            id="searchBtn"
            className="searchBtn"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>

          <button
            className="searchBtn2"
            type="button"
            id="Randomize"
            onClick={handleRandom}
          >
            Randomize
          </button>

          <button className="searchBtn2" type="button" id="FavoriteList">
            Favorites
          </button>
        </div>

        <div className="boxOutput col-span-6 w-100 p-0 m-0 mb-100px flex-col">
          <div className="boxOutputInside">
            <a className="aTag" id="favoriteBtn" onClick={handleFavorite}>
              <img className="picture" id="pictureStar" src={pic} />
            </a>
            <h1 className="namePokemon" id="pokemonName">
              {pokemonName}
            </h1>
            <Row className="pictureRow">
              <img className="normalPic" id="normalPic" src={sprite} alt="" />
              <img className="shinyPic" id="shinyPic" src={shiny} alt="" />
              <div className="typePicBox flex justify-center items-center flex-col">
                <img className="typePic" id="typePic" src={typePic} alt="" />
                <img
                  className="secondTypePic"
                  id="secondTypePic"
                  src={typePic2}
                  alt=""
                />
              </div>
            </Row>

            <Row className="pictureTextRow flex w-[100%] justify-evenly">
              <h2 className="text">Normal</h2>
              <h2 className="text">Shiny</h2>
              <h2 className="text">Type</h2>
            </Row>

            <Row className="locationRow">
              <h2 className="textLocation">Location :</h2>
              <h2 className="textLocation2" id="locationText">
                {location}
              </h2>
            </Row>

            <Row className="abilityRow">
              <h2 className="textAbility">Ability :</h2>
              <h2 className="textAbility2" id="abilityText">
                {ability}
              </h2>
            </Row>

            <Row className="movesRow">
              <h2 className="textMove">Moves :</h2>

              <select name="moves" className="textMove2" id="moves">
                <option value="default">Choose a move</option>
              </select>
            </Row>

            <Row className="evolutionsRow">
              <h2 className="textEvolution">Evolutions :</h2>
              <h2 className="textEvolution2" id="evolutionText">
                {evolution}
              </h2>
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
}
