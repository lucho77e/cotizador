let opcionElegida;
let tipoContratacion;
let edadTitular;
let tieneConyuge = false;
let edadConyuge = 0;
let cantidadHijos = 0;
let valorTitular = 0;
let valorConyuge = 0;
let valorHijos = 0;
const multiplicadorMas26 = 1.1;
const multiplicadorMas36 = 1.25;
const multiplicadorAdicionalHijo = 0.4;
const multiplicadorIva = 1.21;
const valorCuotaLista = 10000;
let cotizacion;

function tieneHijos () {
    // Averiguo cantidad de hijos
    cantidadHijos = parseInt(prompt("¿Cuántos hijos tienes? (escribe 0 si no tienes hijos)"))
}

function composicionGrupoFamiliar () {
    //Averiguo edad del titular
    edadTitular = parseInt(prompt("Cuál es tu edad?"))
    
    //Averiguo composición del grupo familiar
    while (opcionElegida != "1" && opcionElegida != "2") {
        
        //Averiguo si tiene cónyuge
        opcionElegida = prompt("¿Tienes cónyuge?\n1- Sí\n2- No")
        switch (opcionElegida) {
            case "1":
                tieneConyuge = true
                edadConyuge = parseInt(prompt("¿Cuál es la edad de tu cónyuge?"))
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
    if (edadTitular >= 36) {
        valorTitular = valorCuotaLista * multiplicadorMas36
    } else if (edadTitular >= 26) {
        valorTitular = valorCuotaLista * multiplicadorMas26
    } else {
        valorTitular = valorCuotaLista
    }

    //Multiplico valor de la cuota según edad del cónyuge (si lo hubiera)
    if (edadConyuge >= 36 && tieneConyuge) {
        valorConyuge = valorCuotaLista * multiplicadorMas36
    } else if (edadConyuge >= 26 && tieneConyuge) {
        valorConyuge = valorCuotaLista * multiplicadorMas26
    } else if (tieneConyuge) {
        valorConyuge = valorCuotaLista
    }

    //Multiplico valor de la cuota por cada hijo adicional
    if (cantidadHijos != 0) {
        valorHijos = cantidadHijos * valorCuotaLista * multiplicadorAdicionalHijo
    }
}

while (opcionElegida != "1" && opcionElegida != "x" && opcionElegida != "X") {
    opcionElegida = prompt("Bienvenido a OSDE\n¿Qué deseas hacer?\n1- Cotizar cobertura\nX- Salir");
    
    if (opcionElegida == "1") {
        const nombre = prompt("Por favor, dinos tu nombre")

        while (tipoContratacion != "1" && tipoContratacion != "2") {
            //Averiguo tipo de contratación (aplica iva o no)
            tipoContratacion = prompt(nombre + ", qué tipo de contratación deseas hacer?\n1- Derivando aportes como trabajador en Relación de dependencia o Monotributo\n2- En forma particular")

            switch(tipoContratacion) {
                case "1":
                    opcionElegida = 0
                    composicionGrupoFamiliar()
                    //Calculo cotización final sumando valor por titular, cónyuge e hijos
                    cotizacion = valorTitular + valorConyuge + valorHijos
                    alert(nombre + ", el valor de la cobertura para tu grupo familiar es " + cotizacion)
                    break;
                case "2":
                    opcionElegida = 0
                    composicionGrupoFamiliar()
                    //Calculo cotización final sumando valor por titular, cónyuge e hijos y multiplicando por iva
                    cotizacion = (valorTitular + valorConyuge + valorHijos) * multiplicadorIva
                    alert(nombre + ", el valor de la cobertura para tu grupo familiar es " + cotizacion)
                    break;
                default:
                    alert("Opción incorrecta, vuelve a intentar")
                    break;
            }
        }
    }
}
