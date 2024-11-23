//Atributos poke rival
const imgRival = document.querySelector("#img-rival");
const nombreRival = document.querySelector("#nombreRival");
const tipo1Rival = document.querySelector("#tipo1Rival");
const tipo2Rival = document.querySelector("#tipo2Rival");
const atkFisRival = document.querySelector("#ataqueFisRival");
const atkEspRival = document.querySelector("#ataqueEspRival");
const vidaRival = document.querySelector("#vidaRival");
let vidaTotalRival = 0;
const defensaEspRival = document.querySelector("#defensaEspRival");
const defensaFisRival = document.querySelector("#defensaFisRival");
const velocidadRival = document.querySelector("#velocidadRival");
let tiposRival = undefined;

//Atributos poke propio

const imgPropio = document.querySelector("#img-propio");
const nombrePropio = document.querySelector("#nombrePropio");
const tipo1Propio = document.querySelector("#tipo1Propio");
const tipo2Propio = document.querySelector("#tipo2Propio");
const atkFisPropio = document.querySelector("#ataqueFisPropio");
const atkEspPropio = document.querySelector("#ataqueEspPropio");
const vidaPropio = document.querySelector("#vidaPropio");
let vidaTotalPropio = 0;
const defensaEspPropio = document.querySelector("#defensaEspPropio");
const defensaFisPropio = document.querySelector("#defensaFisPropio");
const velocidadPropio = document.querySelector("#velocidadPropio");
let atkActual = undefined;
let tiposPropio = undefined;

//Interfaz de usuario

const arena = document.querySelector("#arena");
const input = document.querySelector("#input");
const btnElegir = document.querySelector("#btn-poke");
const btnAtkFis = document.querySelector("#btn-atk-fis");
const btnAtkEsp = document.querySelector("#btn-atk-esp");
const btnPelear = document.querySelector("#btn-pelear");
const uiAtkSeleccionado = document.querySelector("#atk-seleccionado");
const hpBarPropio = document.querySelector("#hp-bar-propio");
const hpBarRival = document.querySelector("#hp-bar-rival");

// Al cargar la página, se reproduce la canción automáticamente
window.onload = function() {
    var audio = document.getElementById('audioPlayer');
    audio.play(); // Reproduce el audio
    audio.volume = 0.02;
};
//Método de número random
const getNumRandom = () => {
    let min = 1;
    let max = 1026;

    return Math.floor(Math.random() * (max - min) + min);
};

//Se elegirá un pokemon pero solo del tipo fantasma, el tipo de elección del pokemon queda a criterio del desarrollador, que sea divertido.
const obtenerPokePropio = () => {
    const num = input.value;

    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then((res) => {
            return res.data;
        })
        .then((res) => {
            imgPropio.src = res.sprites.back_default;
            nombrePropio.innerHTML = res.name;
            tipo1Propio.style.backgroundImage =
                "url('img/" + res.types[0].type.name + ".png')";
            if (res.types[1] != undefined) {
                tipo2Propio.style.backgroundImage =
                    "url('img/" + res.types[1].type.name + ".png')";
            }
            tiposPropio = res.types;
            vidaPropio.innerHTML = res.stats[0].base_stat;
            vidaTotalPropio = res.stats[0].base_stat;
            atkFisPropio.innerHTML = res.stats[1].base_stat;
            defensaFisPropio.innerHTML = res.stats[2].base_stat;
            atkEspPropio.innerHTML = res.stats[3].base_stat;
            defensaEspPropio.innerHTML = res.stats[4].base_stat;
            velocidadPropio.innerHTML = res.stats[5].base_stat;
        });
};
//Se generará un pokemon rival aleatorio
const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`)
        .then((res) => {
            return res.data;
        })
        .then((res) => {
            imgRival.src = res.sprites.front_default;
            nombreRival.innerHTML = res.name;
            tipo1Rival.style.backgroundImage =
                "url('img/" + res.types[0].type.name + ".png')";
            if (res.types[1] != undefined) {
                tipo2Rival.style.backgroundImage =
                    "url('img/" + res.types[1].type.name + ".png')";
            }
            tiposRival = res.types;
            vidaRival.innerHTML = res.stats[0].base_stat;
            vidaTotalRival = res.stats[0].base_stat;
            atkFisRival.innerHTML = res.stats[1].base_stat;
            defensaFisRival.innerHTML = res.stats[2].base_stat;
            atkEspRival.innerHTML = res.stats[3].base_stat;
            defensaEspRival.innerHTML = res.stats[4].base_stat;
            velocidadRival.innerHTML = res.stats[5].base_stat;
        });
};

const position_img = function () {
    const width = arena.offsetWidth;
    const height = arena.offsetHeight;

    imgPropio.style.top = 0.38 * height + "px";
    imgPropio.style.left = 0.15 * width + "px";

    imgRival.style.top = 0.06 * height + "px";
    imgRival.style.left = 0.52 * width + "px";
};

const peleaPoke = function () {};

position_img();

window.addEventListener("resize", position_img);

//Combate, el pokemon perdedor será el que se le acabe primero su vida.
//El usuario deberá elegir si ocupa ataque fisico o especial, según lo elegido los pokemon usarán su defensa especial o defensa fisica para bloquear los ataques
//La defensa especial o fisica del pokemon que recibe el ataque sera restada del ataque especial o fisico del pokemon atacante, la diferencia será restada a la vida del pokemon defensor
//En caso de que el resultado de la resta sea negativo o cero, se va a dejar un 1 como el resultado minimo de la resta
//El pokemon que tenga más velocidad va a pegar primero
//Se debe de aplicar la tabla de tipos al resultado de la resta de defensa y ataque, pero solo en daño, no en resitencias
//Ejemplo poke1AtaqueFisico = 56;
// poke2Defensafisica = 35; poke2vida = 98;
// DañoRecibido = poke1AtaqueFisico - poke2DefensaFisica;
//poke2VidaRestante = poke2Vida - DañoRecibido;
//Se turnarán los pokemon hasta que haya un ganador
//Mostrar el ganador
const combate = async () => {
    if (atkActual == undefined) return

    let danoPropio = atkActual
        ? atkEspPropio.textContent
        : atkFisPropio.textContent;
    let atkRival = Math.floor(Math.random() * 2);

    let danoRival = atkRival
        ? atkEspRival.textContent
        : atkFisRival.textContent;

    let defPropia = atkRival
        ? defensaEspPropio.textContent
        : defensaFisPropio.textContent;

    let defRival = atkActual
        ? defensaEspRival.textContent
        : defensaFisRival.textContent;

    let danoInfligido = danoPropio - defRival;
    danoInfligido = Math.max(danoInfligido, 1);
    let danoRecibido = danoRival - defPropia;
    danoRecibido = Math.max(danoRecibido, 1);

    const multPropio =
        (await checkTypeEffectivity(tiposPropio[0], tiposRival)) *
        (await checkTypeEffectivity(tiposPropio[1], tiposRival));

    const multRival =
        (await checkTypeEffectivity(tiposRival[0], tiposPropio)) *
        (await checkTypeEffectivity(tiposRival[1], tiposPropio));

    danoInfligido *= multPropio;
    danoRecibido *= multRival;

    if (velocidadRival.textContent > velocidadPropio.textContent) {
        if (setVidaPropio(danoRecibido)) {
            setVidaRival(danoInfligido);
        }
    } else {
        if (setVidaRival(danoInfligido)) {
            setVidaPropio(danoRecibido);
        }
    }
};

const checkTypeEffectivity = async (typeAttack, typesDefense) => {
    if (typeAttack == undefined) return 1;

    const res = await axios.get(
        `https://pokeapi.co/api/v2/type/${typeAttack.type.name}`,
    );
    const damageRelations = res.data.damage_relations;

    const typeDefense1 = typesDefense[0].type.name;
    const typeDefense2 = typesDefense[1]?.type.name;

    // Check no damage
    if (
        damageRelations.no_damage_to.some(
            (type) => type.name === typeDefense1 || type.name === typeDefense2,
        )
    )
        return 0;

    // Check half damage
    if (
        damageRelations.half_damage_to.some(
            (type) => type.name === typeDefense1 || type.name === typeDefense2,
        )
    )
        return 0.5;

    // Check double damage
    if (
        damageRelations.double_damage_to.some(
            (type) => type.name === typeDefense1 || type.name === typeDefense2,
        )
    )
        return 2;

    return 1;
};

const setVidaRival = (dano) => {
    const vida = Math.max(vidaRival.textContent - dano, 0);
    vidaRival.textContent = vida;

    const porcentaje = (vida * 100) / vidaTotalRival;
    hpBarRival.style.width = porcentaje + "%";

    if (vida == 0) {
        pokeGanador(1);
        return false;
    }
    return true;
};

const setVidaPropio = (dano) => {
    const vida = Math.max(vidaPropio.textContent - dano, 0);
    vidaPropio.textContent = vida;

    const porcentaje = (vida * 100) / vidaTotalPropio;
    hpBarPropio.style.width = porcentaje + "%";

    if (vida == 0) {
        pokeGanador(0);
        return false;
    }
    return true;
};

function sleep(t){
    var esperarHasta = new Date().getTime() + t;
    while(new Date().getTime() < esperarHasta) continue;
}
function pokeGanador(ganador) {
    // Crear el contenedor para las opciones
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.innerHTML = `
        <div id="modal-content">
            <h2>${ganador === 1 ? "¡GANASTE! :D" : "Perdiste :C"}</h2>
            <div id="modal-options">
                <button id="restart-battle">Reiniciar Batalla</button>
                <button id="new-battle">Nueva Batalla</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Manejo de los botones
    document.querySelector("#restart-battle").addEventListener("click", () => {
        document.body.removeChild(modal);
        // Reinicia el combate con los mismos Pokémon
        vidaRival.textContent = vidaTotalRival;
        hpBarRival.style.width = "100%";
        vidaPropio.textContent = vidaTotalPropio;
        hpBarPropio.style.width = "100%";
        btnPelear.addEventListener("click", combate);
    });

    document.querySelector("#new-battle").addEventListener("click", () => {
        document.body.removeChild(modal);
        location.reload(); // Cargar nueva batalla
    });

    btnPelear.removeEventListener("click", combate);
}

window.addEventListener("load", obtenerPokeRival);

btnElegir.addEventListener("click", obtenerPokePropio);

btnPelear.addEventListener("click", combate);

btnAtkEsp.addEventListener("click", () => {
    atkActual = 1;
    uiAtkSeleccionado.innerHTML = "Ataque Especial";
});

btnAtkFis.addEventListener("click", () => {
    atkActual = 0;
    uiAtkSeleccionado.innerHTML = "Ataque Físico";
});
