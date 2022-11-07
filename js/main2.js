let searchKey = ""
let radioSelected
let arrayBotones = document.querySelectorAll("#botBorrar");
let tipo
let posicion

const multiplicador = {
    mas26 : 1.1,
    mas36 : 1.25,
    adicionalHijo : 0.4,
    iva : 1.21
};

const valorCuotaLista = 10000;

const search = document.querySelector("#buscador"),
cardsServicios = document.querySelector("#cards"),
radioTitular= document.querySelector("#titular"),
radioConyuge= document.querySelector("#conyuge"),
btnCotizar = document.querySelector("#cotizar"),
tablaFamilia = document.querySelector("#tablaFamilia"),
tabla = document.querySelector("#tabla"),
nombre = document.querySelector("#nombreApellido"),
edad = document.querySelector("#edadSelect"),
agregar = document.querySelector("#agregar");

grupoFamiliar = [];
let familiaEnLs = JSON.parse(localStorage.getItem("grupoFamiliar"))

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
}


const servicios = [
    {
        servicio: "Ortodoncia",
        aclaracion: "Para menores de 18 años",
        descripcion: "Cobertura con prestadores de cartilla con autorización previa",
        p210: false,
        p310: true,
        p410: true,
    },
    {
        servicio: "Prótesis nacionales",
        aclaracion: "Para cualquier tipo de cirugía",
        descripcion: "Con autorización previa",
        p210: true,
        p310: true,
        p410: true,
    },
    {
        servicio: "Consultas médicas",
        aclaracion: "Con cualquier especialista",
        descripcion: "Sin autorización previa y sin límites",
        p210: true,
        p310: true,
        p410: true,
    },
    {
        servicio: "Análisis de laboratorio",
        aclaracion: "Con prestadores de cartilla",
        descripcion: "Sin autorización previa y sin límites",
        p210: true,
        p310: true,
        p410: true,
    },
    {
        servicio: "Prótesis internacionales",
        aclaracion: "Para cualquier tipo de cirugía",
        descripcion: "Con autorización previa",
        p210: false,
        p310: false,
        p410: true,
    },
    {
        servicio: "Psicología",
        aclaracion: "Hasta 30 sesiones por año",
        descripcion: "Con autorización previa",
        p210: true,
        p310: true,
        p410: true,
    },
    {
        servicio: "Kinesiología",
        aclaracion: "Hasta 30 sesiones por año",
        descripcion: "Con autorización previa",
        p210: true,
        p310: true,
        p410: true,
    },
    {
        servicio: "Nutrición",
        aclaracion: "Hasta 30 sesiones por año",
        descripcion: "Con autorización previa",
        p210: true,
        p310: true,
        p410: true,
    },
];





// HTML Listar servicios 
function htmlServicios(arr) {
    cardsServicios.innerHTML = ""
    let html = "";
    for (const item of arr) {
        let planes = ""
        item.p210 && (planes = planes + "210, ")
        item.p310 && (planes = planes + "310, ")
        item.p410 && (planes = planes + "410")
        html = `<div class="col">
            <div class="card h-100" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${item.servicio}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.aclaracion}</h6>
                    <p class="card-text">${item.descripcion}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Disponible en plan: ${planes}</small>
                </div>
            </div>
        </div>`
        cardsServicios.innerHTML += html
    }
}

htmlServicios(servicios)


const pedirServicios = async () => {
    const resp = await fetch ('./data/data.json');
    const data = await resp;
    console.log(data);
}


// Limpiar campos
function limpiarCampos() {
    for (const radio of tipo) {
        if (radio.checked = true) {
            radio.checked = false;
        }
    }
    nombre.value =""
    edad.value =""
}

// HTML Listar Grupo familiar
function htmlFamilia(arr) {
    tablaFamilia.innerHTML = ""
    let html = "";
    for (const item of arr) {
        html = `<tr>
        <td>${item.nombre}</td>
        <td>${item.edad}</td>
        <td>${item.tipo}</td>
        <td><button type="button" id="${item.id}" class="btn btn-danger btn-sm">Borrar</button></td>
        </tr>`
        tablaFamilia.innerHTML += html
    }
    limpiarCampos()
    arrayBotones = document.querySelectorAll(".btn-danger");
    arrayBotones.forEach(btn => {
        btn.addEventListener("click", ()=> {
            buscarPos (grupoFamiliar, btn.id);
            if (grupoFamiliar[posicion].tipo == "Titular") {
                radioTitular.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Titular">
                <label class="form-check-label" for="tipoRadio">Titular</label>`
                escucharRadioTipo()
            } else if (grupoFamiliar[posicion].tipo == "Cónyuge") {
                radioConyuge.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Cónyuge">
                <label class="form-check-label" for="tipoRadio">Cónyuge</label>`
                escucharRadioTipo()
            }
            grupoFamiliar = grupoFamiliar.filter(el => el.id != btn.id)
            if (grupoFamiliar == "") {
                tabla.style.display = "none";
            }
            guardarLocal("grupoFamiliar", JSON.stringify(grupoFamiliar))
            htmlFamilia(grupoFamiliar)
            

        })
    });
}




// Listener del Radio Tipo Afiliado
function escucharRadioTipo() {
    radioSelected = ""
    tipo = document.querySelectorAll('input[name="tipoRadio"]')
    for (const radio of tipo) {
        radio.addEventListener('change', ()=>{
            if (radio.checked) {
                radioSelected = radio.value
                if (radio.value != "Hijo") {
                    edad.innerHTML = `<option value="Entre 18 y 25">Entre 18 y 25</option>
                    <option value="Entre 26 y 35">Entre 26 y 35</option>
                    <option value="Más de 36">Más de 36</option>`
                } else {
                    edad.innerHTML = `<option value="Entre 1 y 17">Entre 1 y 17</option>
                    <option value="Entre 18 y 25">Entre 18 y 25</option>`
                }
            }
        })
    }
}
escucharRadioTipo()

// Funcion agregadora de familiar creado al grupo familiar
function cargarFamiliar(arr, familiar) {
    return arr.push(familiar);
};


// Funcion constructora familiar
function familiar(tipo, nombre, edad) {
    this.tipo = tipo
    this.nombre = nombre
    this.edad = edad
    this.id = Date.now()
}



// Botón agregar familiar
agregar.addEventListener('click', (e)=> {
    e.preventDefault();
    if ((radioSelected == "") || (nombre.value == "") || (edad.value == "")) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes completar todos los campos!',
        })
    } else {
        const familiarNuevo = new familiar(
            radioSelected,
            nombre.value,
            edad.value
        )
        cargarFamiliar(grupoFamiliar, familiarNuevo)
        if (grupoFamiliar != []) {
            tabla.style.display = "table";
        }
        if (radioSelected == "Titular") {
            radioTitular.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Titular" disabled>
            <label class="form-check-label" for="tipoRadio">Titular</label>`
            escucharRadioTipo()
        } else if (radioSelected == "Cónyuge") {
            radioConyuge.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Cónyuge" disabled>
            <label class="form-check-label" for="tipoRadio">Cónyuge</label>`
            escucharRadioTipo()
        } else {
            escucharRadioTipo()
        }
        guardarLocal("grupoFamiliar", JSON.stringify(grupoFamiliar))
        htmlFamilia(grupoFamiliar)
    }
});



// Busqueda
function filtrarServicio(arr, filtro){
    const filtrado = arr.filter((el) => {
        return el.servicio.toLowerCase().includes(filtro);
    })
    htmlServicios(filtrado)
}


let cotizacion

// Calcular cotizacion
function analisisGrupoFamiliar (arr) {
    cotizacion = 0
    for (const integrante of grupoFamiliar) {
        if (integrante.tipo != "Hijo") {
            if (integrante.edad === "Entre 26 y 35") {
                cotizacion = cotizacion + (valorCuotaLista * multiplicador.mas26)
            } else if (integrante.edad === "Más de 36") {
                cotizacion = cotizacion + (valorCuotaLista * multiplicador.mas36)
            } else {
                cotizacion = cotizacion + valorCuotaLista
            }
        } else {
            cotizacion = cotizacion + (valorCuotaLista * multiplicador.adicionalHijo)
        }
    }
}

// Listener
search.addEventListener("input", () => {
    searchKey = search.value.toLowerCase()
    filtrarServicio(servicios, searchKey)
})

btnCotizar.addEventListener("click", () => {
    analisisGrupoFamiliar(grupoFamiliar)
    Swal.fire(
        'Tu cotización',
        'El precio de tu plan es ' + cotizacion,
        'success'
      )

})

// Funcion buscar posicion en array
function buscarPos (arr1, filtr) {
    let id = 0
    for (const item1 of arr1) {
        if (item1.id == filtr) {
            posicion = id   
        } else {
            id = id + 1
        }
    }
}

if (familiaEnLs != "") {
    grupoFamiliar = familiaEnLs
    htmlFamilia(grupoFamiliar)
    tabla.style.display = "table"

    for (const familiar of grupoFamiliar) {
        if (familiar.tipo == "Titular") {
            radioTitular.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Titular" disabled>
            <label class="form-check-label" for="tipoRadio">Titular</label>`
        } else if (familiar.tipo == "Cónyuge") {
            radioConyuge.innerHTML = `<input class="form-check-input" type="radio" name="tipoRadio" value="Cónyuge" disabled>
            <label class="form-check-label" for="tipoRadio">Cónyuge</label>`
    }}

} else {
    tabla.style.display = "none"
}