//--------------------------------------//
//--|funcionalidad_acertijos_mentales|--//
//--------------------------------------//
let datos = obtenerDatos();
let indiceActual = datos.indice;
let respuestaEscrita = datos.respuestaEscrita;
let respuestaRevelada = datos.respuestaRevelada;
const numeroAcertijo = document.getElementById("numeroAcertijo");
const textoAcertijo = document.getElementById("textoAcertijo");
const respuestaUsuario = document.getElementById("respuestaUsuario");
const zonaRespuesta = document.getElementById("zonaRespuesta");
const botonRevelar = document.getElementById("botonRevelar");
const botonSiguiente = document.getElementById("botonSiguiente");
const botonRestablecer = document.getElementById("botonRestablecer");
const mensaje = document.getElementById("mensaje");
//-------------------------------//
//--|datos_iniciales_guardados|--//
//-------------------------------//
const acertijosIniciales = [
    {
        pregunta: "¿Qué tiene agujas y no sabe coser?",
        respuesta: "Un reloj."
    },
    {
        pregunta: "Cuanto más le quitas, más grande se vuelve. ¿Qué es?",
        respuesta: "Un agujero."
    },
    {
        pregunta: "¿Qué tiene dientes pero no puede comer?",
        respuesta: "Un peine."
    },
    {
        pregunta: "Vuelo sin alas y lloro sin ojos. ¿Qué soy?",
        respuesta: "Una nube."
    }
];
//-------------------------------------------------//
//--|obtener_y_guardar_datos_usando_localstorage|--//
//-------------------------------------------------//
function obtenerDatos() {
    const datosGuardados = localStorage.getItem("acertijos_mentales");
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return {
        indice: 0,
        respuestaEscrita: "",
        respuestaRevelada: false
    };
}
function guardarDatos() {
    const datos = {
        indice: indiceActual,
        respuestaEscrita: respuestaUsuario.value,
        respuestaRevelada: respuestaRevelada
    };
    localStorage.setItem("acertijos_mentales", JSON.stringify(datos));
}
//----------------------------------//
//--|mostrar_acertijo_y_respuesta|--//
//----------------------------------//
function mostrarAcertijo() {
    const acertijo = acertijosIniciales[indiceActual];
    numeroAcertijo.textContent = `Acertijo ${indiceActual + 1} de ${acertijosIniciales.length}`;
    textoAcertijo.textContent = acertijo.pregunta;
    respuestaUsuario.value = respuestaEscrita;
    mostrarRespuesta();
    mensaje.textContent = "";
}
function mostrarRespuesta() {
    const acertijo = acertijosIniciales[indiceActual];
    if (respuestaRevelada) {
        zonaRespuesta.classList.add("respuesta_visible");
        zonaRespuesta.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <span>Respuesta:</span>
            <strong>${acertijo.respuesta}</strong>
        `;
        botonRevelar.innerHTML = `
            <i class="fa-solid fa-eye-slash"></i>
            Respuesta revelada
        `;
        botonRevelar.disabled = true;
    } else {
        zonaRespuesta.classList.remove("respuesta_visible");
        zonaRespuesta.innerHTML = `
            <i class="fa-solid fa-lock"></i>
            <span>La respuesta está oculta.</span>
        `;
        botonRevelar.innerHTML = `
            <i class="fa-solid fa-eye"></i>
            Revelar respuesta
        `;
        botonRevelar.disabled = false;
    }
}
//---------------------------//
//--|revelar_las_respuesta|--//
//---------------------------//
function revelarRespuesta() {
    respuestaRevelada = true;
    guardarDatos();
    mostrarRespuesta();
    mensaje.textContent = "Ahora puedes comprobar si pensaste en la respuesta correcta.";
}
//---------------------------//
//--|el_siguiente_acertijo|--//
//---------------------------//
function siguienteAcertijo() {
    respuestaEscrita = respuestaUsuario.value;
    indiceActual++;
    if (indiceActual >= acertijosIniciales.length) {
        indiceActual = 0;
    }
    respuestaEscrita = "";
    respuestaRevelada = false;
    guardarDatos();
    mostrarAcertijo();
}
//---------------------------//
//--|restablecer_los_datos|--//
//---------------------------//
function restablecerDatos() {
    indiceActual = 0;
    respuestaEscrita = "";
    respuestaRevelada = false;
    localStorage.removeItem("acertijos_mentales");
    mostrarAcertijo();
    mensaje.textContent = "Los acertijos fueron restablecidos.";
}
//------------------------//
//--|eventos_a_un_click|--//
//------------------------//
respuestaUsuario.addEventListener("input", function() {
    respuestaEscrita = respuestaUsuario.value;
    guardarDatos();
});
botonRevelar.addEventListener("click", revelarRespuesta);
botonSiguiente.addEventListener("click", siguienteAcertijo);
botonRestablecer.addEventListener("click", restablecerDatos);
respuestaUsuario.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        revelarRespuesta();
    }
});
mostrarAcertijo();