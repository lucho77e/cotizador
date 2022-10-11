let opcionElegida;
let tipoContratacion;
let valorTitular = 0;
let valorConyuge = 0;
let valorHijos = 0;

const titular = {
    nombre : "",
    edad: "",
};

const familia = {
    tieneConyuge: false,
    edadConyuge: 0,
    cantidadHijos: 0
};

const multiplicador = {
    mas26 : 1.1,
    mas36 : 1.25,
    adicionalHijo : 0.4,
    iva : 1.21
};

const valorCuotaLista = 10000;
let cotizacion;

// let edadTitular;
// let tieneConyuge = false;
// let edadConyuge = 0;
// let cantidadHijos = 0;
// const multiplicadorMas26 = 1.1;
// const multiplicadorMas36 = 1.25;
// const multiplicadorAdicionalHijo = 0.4;
// const multiplicadorIva = 1.21;



function tieneHijos () {
    // Averiguo cantidad de hijos
    familia.cantidadHijos = parseInt(prompt("¿Cuántos hijos tienes? (escribe 0 si no tienes hijos)"))
}

function composicionGrupoFamiliar () {
    //Averiguo edad del titular
    titular.edad = parseInt(prompt("Cuál es tu edad?"))
    
    //Averiguo composición del grupo familiar
    while (opcionElegida != "1" && opcionElegida != "2") {
        
        //Averiguo si tiene cónyuge
        opcionElegida = prompt("¿Tienes cónyuge?\n1- Sí\n2- No")
        switch (opcionElegida) {
            case "1":
                familia.tieneConyuge = true
                familia.edadConyuge = parseInt(prompt("¿Cuál es la edad de tu cónyuge?"))
                tieneHijos ()
                break;
            case "2":
                tieneHijos ()
                opcionElegida = "1"
                break;
            default:
                alert("Opción incorrecta, vuelve a intentar")
                break;
        }
    }
    
    //Multiplico valor de la cuota según edad del titular
    if (titular.edad >= 36) {
        valorTitular = valorCuotaLista * multiplicador.mas36
    } else if (titular.edad >= 26) {
        valorTitular = valorCuotaLista * multiplicador.mas26
    } else {
        valorTitular = valorCuotaLista
    }

    //Multiplico valor de la cuota según edad del cónyuge (si lo hubiera)
    if (familia.edadConyuge >= 36 && familia.tieneConyuge) {
        valorConyuge = valorCuotaLista * multiplicador.mas36
    } else if (familia.edadConyuge >= 26 && familia.tieneConyuge) {
        valorConyuge = valorCuotaLista * multiplicador.mas26
    } else if (familia.tieneConyuge) {
        valorConyuge = valorCuotaLista
    }

    //Multiplico valor de la cuota por cada hijo adicional
    if (familia.cantidadHijos != 0) {
        valorHijos = familia.cantidadHijos * valorCuotaLista * multiplicador.adicionalHijo
    }
}

while (opcionElegida != "1" && opcionElegida != "x" && opcionElegida != "X") {
    opcionElegida = prompt("Bienvenido a OSDE\n¿Qué deseas hacer?\n1- Cotizar cobertura\nX- Salir");
    
    if (opcionElegida == "1") {
        titular.nombre = prompt("Por favor, dinos tu nombre");

        while (tipoContratacion != "1" && tipoContratacion != "2") {
            //Averiguo tipo de contratación (aplica iva o no)
            tipoContratacion = prompt(titular.nombre + ", qué tipo de contratación deseas hacer?\n1- Derivando aportes como trabajador en Relación de dependencia o Monotributo\n2- En forma particular")

            switch(tipoContratacion) {
                case "1":
                    opcionElegida = 0
                    composicionGrupoFamiliar()
                    //Calculo cotización final sumando valor por titular, cónyuge e hijos
                    cotizacion = valorTitular + valorConyuge + valorHijos
                    alert(titular.nombre + ", el valor de la cobertura para tu grupo familiar es " + cotizacion)
                    break;
                case "2":
                    opcionElegida = 0
                    composicionGrupoFamiliar()
                    //Calculo cotización final sumando valor por titular, cónyuge e hijos y multiplicando por iva
                    cotizacion = (valorTitular + valorConyuge + valorHijos) * multiplicador.iva
                    alert(titular.nombre + ", el valor de la cobertura para tu grupo familiar es " + cotizacion)
                    break;
                default:
                    alert("Opción incorrecta, vuelve a intentar")
                    break;
            }
        }
    }
}
