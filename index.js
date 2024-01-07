// navbar
const toggleBtn = document.getElementById("toggleBtn");
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");

toggleBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden");

  // Cambiar el ícono de hamburguesa a la "x" y viceversa
  if (mobileMenu.classList.contains("hidden")) {
    hamburgerIcon.classList.remove("fa-xmark");
    hamburgerIcon.classList.add("fa-bars");
  } else {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-xmark");
  }
});

//nueva operacion

const seccionBalances = document.getElementById("seccionBalances");
const botonNuevaOperacion = document.getElementById("botonNuevaOperacion");
const seccionAgregarOperacion = document.getElementById(
  "seccionAgregarOperacion"
);

botonNuevaOperacion.addEventListener("click", (e) => {
  seccionBalances.classList.add("hidden");
  seccionAgregarOperacion.classList.remove("hidden");
  sinOperaciones.classList.add("hidden");
});

// array inicial
const descripcionNuevaOperacion = document.getElementById(
  "input-descripcion-nueva-operacion"
);
const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
const categoriaNuevaOperacion = document.getElementById(
  "categoria-nueva-operacion"
);
const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");
const botonAgregarNuevaOperacion = document.getElementById(
  "boton-agregar-operacion"
);
const operacionesRealizadas = document.getElementById("operacionesRealizadas");
const sinOperaciones = document.getElementById("sin-operaciones");
const acciones = document.getElementById("acciones");

// local storage
const guardarDatosLocal = (array) => {
  const datosGuardadosJSON = JSON.stringify(array);
  localStorage.setItem("operaciones", datosGuardadosJSON);
};

// recupero datos del local
const obtenerDatosLocal = () => {
  const datosGuardadosEnElLocalStorage = localStorage.getItem("operaciones");
  const datosGuardadosJSONaJS = JSON.parse(datosGuardadosEnElLocalStorage);

  if (datosGuardadosEnElLocalStorage === null) {
    return [];
  } else {
    return datosGuardadosJSONaJS;
  }
};

const obtenerColorMonto = (tipo) => {
  if (tipo === "ganancia") {
    return "text-green-500";
  } else if (tipo === "gasto") {
    return "text-red-500";
  } else {
    return "";
  }
};

// Array de operaciones
let arrayDeOperaciones = [];

const mostrarOperacionesEnHTML = (array) => {
  let operacionesHTML = "";
  array.forEach((elemento) => {
    const dateArray = elemento.fecha ? elemento.fecha.split("-") : [];
    const fechaIntefaz =
      dateArray.length === 3
        ? dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
        : "";
    const montoColor = obtenerColorMonto(elemento.tipo);
    const signo = elemento.tipo === "ganancia" ? "+" : "-";
    operacionesHTML += `<div class="lg:grid grid-cols-5 lg:ml-4 ">
                                    <div class="">
                                        <h3 class="font-semibold text-lg">Descripcion
                                            <span class="">
                                                ${elemento.descripcion}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class="">
                                        <h3 class="font-semibold text-lg">Categoria
                                            <span class="">
                                                ${elemento.categoria}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class=" ">
                                        <h3 class="font-semibold text-lg">Fecha
                                            <span class="text-xs">
                                                ${fechaIntefaz}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class="lg:ml-10">
                                        <h3 class="font-semibold text-lg">Monto
                                            <span class="${montoColor}">
                                                ${signo}$${elemento.monto}
                                            </span>
                                        </h3>
                                    </div>
                                    <div>
                                    <h3 class="font-semibold text-lg">Acciones
                                        <button class="text-blue-700" onclick="editarElemento(${elemento.id})">
                                            editar
                                        </button>
                                        <button class="text-blue-700" onclick="eliminarElemento(${elemento.id})">
                                            eliminar
                                        </button>
                                    </h3>
                                </div>
                                </div>`;
  });

  operacionesRealizadas.innerHTML = operacionesHTML;
  operacionesRealizadas.classList.remove("hidden");
};

const inicializarPagina = () => {
  const filtroCategoriaSelect = document.getElementById("filtroCategoria");
  const categories = getCategoryData();
 // filtroCategoriaSelect.innerHTML = "";

  categories.forEach((categoria) => {
    const optionElement = document.createElement("option");
    optionElement.value = categoria.name;
    optionElement.text = categoria.name;
    filtroCategoriaSelect.add(optionElement);
  });

  const categoriaNuevaOperacion = document.getElementById(
    "categoria-nueva-operacion"
  );

  categoriaNuevaOperacion.innerHTML = "";

  categories.forEach((categoria) => {
    const optionElement = document.createElement("option");
    optionElement.value = categoria.name;
    optionElement.text = categoria.name;
    categoriaNuevaOperacion.add(optionElement);
  });

  arrayDeOperaciones = obtenerDatosLocal();

  if (arrayDeOperaciones.length > 0) {
    mostrarOperacionesEnHTML(arrayDeOperaciones);
    operacionesRealizadas.classList.remove("hidden");
    sinOperaciones.classList.add("hidden");
  } else {
    operacionesRealizadas.classList.add("hidden");
    sinOperaciones.classList.remove("hidden");
  }
  mostrarOperacionesEnHTML(arrayDeOperaciones);
};

document.addEventListener("DOMContentLoaded", inicializarPagina);

//boton agregar nueva operacion
botonAgregarNuevaOperacion.addEventListener("click", () => {
  arrayDeOperaciones.push({
    id: Date.now(),
    descripcion: descripcionNuevaOperacion.value,
    monto: montoNuevaOperacion.value,
    tipo: tipoNuevaOperacion.value,
    categoria: categoriaNuevaOperacion.value,
    fecha: fechaNuevaOperacion.value,
  });
  guardarDatosLocal(arrayDeOperaciones);
  mostrarOperacionesEnHTML(arrayDeOperaciones);
  seccionAgregarOperacion.classList.add("hidden");
  seccionBalances.classList.remove("hidden");
  operacionesRealizadas.classList.remove("hidden");
  sinOperaciones.classList.add("hidden");
  mostrarGananciasEnHTML();
  mostrarGastosEnHTML();
  actualizarBalancesEnHTML();
  filtrarOperacionesYBalances();
});

// boton eliminar
const eliminarElemento = (id) => {
  arrayDeOperaciones = arrayDeOperaciones.filter((elemento) => {
    return elemento.id !== parseInt(id);
  });

  mostrarOperacionesEnHTML(arrayDeOperaciones);

  guardarDatosLocal(arrayDeOperaciones);
  if (arrayDeOperaciones.length === 0) {
    operacionesRealizadas.classList.add("hidden");
    sinOperaciones.classList.remove("hidden");
  }
};

//boton editar

const editarElemento = (id) => {
  const operacionSeleccionada = arrayDeOperaciones.find(
    (elemento) => elemento.id === id
  );
  const seccionEditarOperacionHTML = `
    <!-- Barra de navegación -->
        <nav class="bg-[#00d1b2] p-4">
          <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <a href="#" class="text-white text-2xl font-semibold hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fa-solid fa-wallet p-2 "></i>AhorrADAS</a>
      
            <!-- Botón de hamburguesa para pantallas pequeñas -->
            <div class="block lg:hidden">
                <button id="toggleBtn" class="text-white focus:outline-none ">
                    <i id="hamburgerIcon" class="fa-solid fa-bars text-xl hover:bg-[#00947e]/[.36] p-2 rounded-lg "></i>
                  </button>
            </div>
      
            <!-- Menú de navegación -->
            <div class="hidden lg:flex space-x-4">
              <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fas fa-chart-line p-2"></i>Balance</a>
              <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fa-solid fa-tag p-2 "></i>Categorías</a>
              <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fas fa-chart-pie p-2"></i>Reportes</a>
            </div>
          </div>
        </nav>
      
        <!-- Menú desplegable para pantallas pequeñas -->
        <div id="mobileMenu" class="lg:hidden hidden bg-white">
          <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fas fa-chart-line p-2"></i>Balance</a>
          <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fa-solid fa-tag p-2"></i>Categorías</a>
          <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fas fa-chart-pie p-2"></i>Reportes</a>
        </div>
    <section class="hidden" id="seccionEditarOperacion">
    <div class="ml-4 mt-20 mb-16 w-72 h-[40rem] rounded-lg bg-white md:w-[46rem] md:h-[40rem] lg:ml-36 shadow-2xl ">
        <h2 class="text-4xl ml-5 mr-4 pt-6 pb-10 font-bold  ">Editar operación</h2>
        <div>
            <label class="ml-4 font-bold">Descripción</label>
            <div class="ml-4 pt-2 pb-2">
                <input type="text" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="input-descripcion-nueva-operacion">
            </div>
        </div>
        <div>
            <label class="ml-4 font-bold">Monto</label>
            <div class="ml-4 pt-2 pb-2">
                <input type="number" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="monto-nueva-operacion">
            </div>
        </div>
        <div>
            <label class="ml-4 font-bold">Tipo</label>
            <div class="ml-4 pt-2 pb-2">
                <select id="tipo-nueva-operacion" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]">
                    <option value="ganancia">Ganancia</option>
                    <option value="gasto">Gasto</option>
                </select>
            </div>
        </div>
        <div>
            <label class="ml-4 font-bold">Categoría</label>
            <div class="ml-4 pt-2 pb-2">
                <select id="categoria-nueva-operacion" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]">
                  
                </select>
            </div>
        </div>
        <div>
            <label class="ml-4 font-bold " for="date">Fecha</label>
            <div class="ml-4 pt-2 pb-2">
                <input class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="fecha-nueva-operacion" type="date" value="2023-12-22">

            </div>
        </div>
        <div class="flex justify-end mt-6 mr-4">
        <button class="bg-[#f5f5f5] w-20 h-10 text-black rounded mr-2" id="boton-cancelar-edicion">Cancelar</button>
        <button class="bg-[#48c774] w-20 h-10 text-white rounded" id="boton-guardar-edicion">Editar</button>        
        </div>
    </div>
      
</section>`;

  document.body.innerHTML = seccionEditarOperacionHTML;
  const cancelarEdicionBtn = document.getElementById("boton-cancelar-edicion");

  if (cancelarEdicionBtn) {
    cancelarEdicionBtn.addEventListener("click", () =>
      window.location.reload()
    );
  }

  const selectCategoria = document.getElementById("categoria-nueva-operacion");

  selectCategoria.innerHTML = "";
  const categories = getCategoryData();

  categories.forEach((categoria) => {
    const optionElement = document.createElement("option");
    optionElement.value = categoria.name;
    optionElement.text = categoria.name;
    selectCategoria.add(optionElement);
  });

  const seccionEditarOperacion = document.getElementById(
    "seccionEditarOperacion"
  );

  if (seccionEditarOperacion) {
    document.getElementById("input-descripcion-nueva-operacion").value =
      operacionSeleccionada.descripcion;
    document.getElementById("monto-nueva-operacion").value =
      operacionSeleccionada.monto;
    document.getElementById("tipo-nueva-operacion").value =
      operacionSeleccionada.tipo;
    document.getElementById("categoria-nueva-operacion").value =
      operacionSeleccionada.categoria;
    document.getElementById("fecha-nueva-operacion").value =
      operacionSeleccionada.fecha;

    seccionEditarOperacion.classList.remove("hidden");

    const botonGuardarEdicion = document.getElementById(
      "boton-guardar-edicion"
    );
    if (botonGuardarEdicion) {
      botonGuardarEdicion.addEventListener("click", () => {
        guardarEdicion(id);
        location.reload();
      });
    } else {
      ("El botón de guardar edición no se encontró en el DOM.");
    }
  }
};

const guardarEdicion = (id) => {
  const nuevaDescripcion = document.getElementById(
    "input-descripcion-nueva-operacion"
  ).value;
  const nuevoMonto = document.getElementById("monto-nueva-operacion").value;
  const nuevoTipo = document.getElementById("tipo-nueva-operacion").value;
  const nuevaCategoria = document.getElementById(
    "categoria-nueva-operacion"
  ).value;
  const nuevaFecha = document.getElementById("fecha-nueva-operacion").value;

  const index = arrayDeOperaciones.findIndex((elemento) => elemento.id === id);

  arrayDeOperaciones[index].descripcion = nuevaDescripcion;
  arrayDeOperaciones[index].monto = nuevoMonto;
  arrayDeOperaciones[index].tipo = nuevoTipo;
  arrayDeOperaciones[index].categoria = nuevaCategoria;
  arrayDeOperaciones[index].fecha = nuevaFecha;

  localStorage.setItem("operaciones", JSON.stringify(arrayDeOperaciones));

  mostrarOperacionesEnHTML(arrayDeOperaciones);
};

// //filtros

// boton mostrar filtros
const ocultarFiltro = document.getElementById("ocultarFiltro");
const listaFiltro = document.getElementById("listaFiltro");
const filtroConteiner = document.getElementById("filtroConteiner");

ocultarFiltro.addEventListener("click", (e) => {
  listaFiltro.classList.toggle("hidden");

  if (listaFiltro.classList.contains("hidden")) {
    ocultarFiltro.innerText = "Mostrar filtros";
    filtroConteiner.style.height = "80px";
    filtroConteiner.style.marginBottom = "0";
  } else {
    ocultarFiltro.innerText = "Ocultar filtros";
    filtroConteiner.style.marginBottom = "300px";
  }
});

//CARD BALANCE
//GANANCIAS
const obtenerGananciasDesdeLocalStorage = () => {
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  const ganancias = operacionesGuardadas.filter(
    (operacion) => operacion.tipo === "ganancia"
  );
  return ganancias;
};

const sumarGanancias = () => {
  const ganancias = obtenerGananciasDesdeLocalStorage();
  if (ganancias.length === 0) {
    return 0;
  }
  const suma = ganancias.reduce(
    (total, ganancia) => total + parseInt(ganancia.monto),
    0
  );

  return suma;
};

const mostrarGananciasEnHTML = () => {
  const totalGanancias = sumarGanancias();
  const elementoGanancias = document.getElementById("ganancias");
  elementoGanancias.textContent = `+$${totalGanancias}`;
};

mostrarGananciasEnHTML();

//gastos card balance

const obtenerGastosDesdeLocalStorage = () => {
  const operacionesGuardadas =
    JSON.parse(localStorage.getItem("operaciones")) || [];
  const gastos = operacionesGuardadas.filter(
    (operacion) => operacion.tipo === "gasto"
  );
  return gastos;
};

const sumarGastos = () => {
  const gastos = obtenerGastosDesdeLocalStorage();
  if (gastos.length === 0) {
    return 0;
  }

  const suma = gastos.reduce(
    (total, gasto) => total + parseInt(gasto.monto),
    0
  );
  return suma;
};

const mostrarGastosEnHTML = () => {
  const totalGastos = sumarGastos();
  const elementoGastos = document.getElementById("gastos");

  elementoGastos.textContent = `-$${totalGastos}`;
};

mostrarGastosEnHTML();

//diferencia entre gastos y ganancias
const actualizarBalancesEnHTML = () => {
  const totalGanancias = sumarGanancias();
  const elementoGanancias = document.getElementById("ganancias");
  elementoGanancias.textContent = `+$${totalGanancias}`;

  const totalGastos = sumarGastos();
  const elementoGastos = document.getElementById("gastos");
  elementoGastos.textContent = `-$${totalGastos}`;

  const diferencia = totalGanancias - totalGastos;
  const elementoDiferencia = document.getElementById("diferencia");
  elementoDiferencia.textContent = `$${diferencia}`;
  elementoDiferencia.style.color = diferencia >= 0 ? "green" : "red";
};

actualizarBalancesEnHTML();

// referencia al botón de cancelar
const cancelarAgregarOperacionBtn = document.getElementById(
  "boton-cancelar-agregar-operacion"
);

cancelarAgregarOperacionBtn.addEventListener("click", () => {
  seccionAgregarOperacion.classList.add("hidden");
  seccionBalances.classList.remove("hidden");
});

//Clases de filtros

const filtroTipo = document.getElementById("filtro-tipo");

const ordenar = document.getElementById("filtro-ordenar");

//filtro tipo
const aplicarFiltrosTipo = () => {
  const tipo = filtroTipo.value;
  const filtradoPorTipo = arrayDeOperaciones.filter((elemento) => {
    if (tipo === "todos") {
      return true;
    }
    const resultadoFiltro = elemento.tipo === tipo;
    return resultadoFiltro;
  });

  return filtradoPorTipo;
};

const actualizarBalancesPorTipo = (tipo) => {
  const operacionesFiltradas = arrayDeOperaciones.filter(
    (elemento) => tipo === "todos" || elemento.tipo === tipo
  );
  const ganancias = operacionesFiltradas.filter(
    (operacion) => operacion.tipo === "ganancia"
  );
  const gastos = operacionesFiltradas.filter(
    (operacion) => operacion.tipo === "gasto"
  );

  const totalGanancias = ganancias.reduce(
    (total, ganancia) => total + parseInt(ganancia.monto, 10),
    0
  );
  const totalGastos = gastos.reduce(
    (total, gasto) => total + parseInt(gasto.monto, 10),
    0
  );
  const diferencia = totalGanancias - totalGastos;

  document.getElementById("ganancias").textContent = `+$${totalGanancias}`;
  document.getElementById("gastos").textContent = `-$${totalGastos}`;
  const elementoDiferencia = document.getElementById("diferencia");
  elementoDiferencia.textContent = `$${diferencia}`;
  elementoDiferencia.style.color = diferencia >= 0 ? "green" : "red";
};

filtroTipo.onchange = () => {
  const tipoSeleccionado = filtroTipo.value;
  const arrayFiltrado = aplicarFiltrosTipo();
  mostrarOperacionesEnHTML(arrayFiltrado);
  actualizarBalancesPorTipo(tipoSeleccionado);
};

const filtrarOperacionesYBalances = () => {
  const tipoSeleccionado = filtroTipo.value;
  const arrayFiltrado = aplicarFiltrosTipo();
  mostrarOperacionesEnHTML(arrayFiltrado);
  actualizarBalancesPorTipo(tipoSeleccionado);
};

//filtro categoria

let filtroCategoria;

filtroCategoria = document.getElementById("filtroCategoria");

filtroCategoria.addEventListener("change", () => {
  const categoriaFiltrada = filtroCategoria.value;

  const operacionesFiltradas = arrayDeOperaciones.filter((elemento) => {
    if (categoriaFiltrada === "todas") {
      return true;
    }

    return (
      (elemento.categoria === categoriaFiltrada &&
        elemento.tipo === filtroTipo.value) ||
      (elemento.categoria === categoriaFiltrada && filtroTipo.value === "todos")
    );
  });

  mostrarOperacionesEnHTML(operacionesFiltradas);

  if (operacionesFiltradas.length === 0) {
    const sinOperaciones = document.getElementById("sin-operaciones");
    sinOperaciones.classList.remove("hidden");
  } else {
    const sinOperaciones = document.getElementById("sin-operaciones");
    sinOperaciones.classList.add("hidden");
  }
});

//filtro fecha

const filtrarYMostrarOperaciones = (fechaDesde) => {
  const fechaFiltro = new Date(fechaDesde);

  const operacionesFiltradas = arrayDeOperaciones.filter((operacion) => {
    const fechaOperacion = new Date(operacion.fecha);
    return fechaOperacion >= fechaFiltro;
  });

  mostrarOperacionesEnHTML(operacionesFiltradas);
};

const inputFecha = document.getElementById("filtro-fecha");
inputFecha.addEventListener("change", () => {
  const fechaSeleccionada = inputFecha.value;
  filtrarYMostrarOperaciones(fechaSeleccionada);
});

const establecerFechaHoyEnInput = function () {
  const inputFecha = document.getElementById("filtro-fecha");

  // Obtener la fecha actual
  const fechaHoy = new Date();

  const dia = fechaHoy.getDate();
  const mes = fechaHoy.getMonth() + 1;
  const anio = fechaHoy.getFullYear();

  const formatoFecha = `${anio}-${mes < 10 ? "0" : ""}${mes}-${
    dia < 10 ? "0" : ""
  }${dia}`;

  inputFecha.value = formatoFecha;
};

document.addEventListener("DOMContentLoaded", establecerFechaHoyEnInput);


//mayor monto 

const operaciones = obtenerDatosLocal();

console.log('Array de operaciones:', operaciones);

const encontrarMayorMonto = (operaciones) => {
  if (operaciones.length === 0) {
    return null;
  }

  const copiaOperaciones = operaciones.slice();
  const operacionesOrdenadas = copiaOperaciones.sort((a, b) => parseFloat(b.monto) - parseFloat(a.monto));
  const mayorMonto = operacionesOrdenadas[0];

  return mayorMonto;
}

const resultado = encontrarMayorMonto(operaciones);
 console.log('Operación con mayor monto:', resultado);

 

const mostrarOperacionMayorMonto = (operacion) => {
  const dateArray = operacion.fecha ? operacion.fecha.split("-") : [];
  const fechaIntefaz =
    dateArray.length === 3
      ? dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
      : "";
  const montoColor = obtenerColorMonto(operacion.tipo);
  const signo = operacion.tipo === "ganancia" ? "+" : "-";

  const operacionHTML = `<div class="lg:grid grid-cols-5 lg:ml-4 ">
                              <div class="">
                                  <h3 class="font-semibold text-lg">Descripcion
                                      <span class="">
                                          ${operacion.descripcion}
                                      </span>
                                  </h3>
                              </div>
                              <div class="">
                                  <h3 class="font-semibold text-lg">Categoria
                                      <span class="">
                                          ${operacion.categoria}
                                      </span>
                                  </h3>
                              </div>
                              <div class=" ">
                                  <h3 class="font-semibold text-lg">Fecha
                                      <span class="text-xs">
                                          ${fechaIntefaz}
                                      </span>
                                  </h3>
                              </div>
                              <div class="lg:ml-10">
                                  <h3 class="font-semibold text-lg">Monto
                                      <span class="${montoColor}">
                                          ${signo}$${operacion.monto}
                                      </span>
                                  </h3>
                              </div>
                              <div>
                              <h3 class="font-semibold text-lg">Acciones
                                  <button class="text-blue-700" onclick="editarElemento(${operacion.id})">
                                      editar
                                  </button>
                                  <button class="text-blue-700" onclick="eliminarElemento(${operacion.id})">
                                      eliminar
                                  </button>
                              </h3>
                          </div>
                          </div>`;

  operacionesRealizadas.innerHTML = operacionHTML;
  operacionesRealizadas.classList.remove("hidden");
};

document.getElementById("filtro-ordenar").addEventListener("change", function() {
  const filtroSeleccionado = this.value;

  if (filtroSeleccionado === "monto_mayor") {
    const mayorMonto = encontrarMayorMonto(operaciones);
    if (mayorMonto) {
      mostrarOperacionMayorMonto(mayorMonto);
    } else {
      console.log('No hay operaciones para mostrar.');
    }
  } else {
    // Mostrar todas las operaciones para otros filtros
    mostrarOperacionesEnHTML(operaciones);
  }
});



//menor monto
const encontrarMenorMonto = (operaciones) => {
  if (operaciones.length === 0) {
    return null;
  }

  const copiaOperaciones = operaciones.slice();
  const operacionesOrdenadas = copiaOperaciones.sort((a, b) => parseFloat(a.monto) - parseFloat(b.monto));
  const menorMonto = operacionesOrdenadas[0];

  return menorMonto;
}

const mostrarOperacionMenorMonto = (operacion) => {
  const dateArray = operacion.fecha ? operacion.fecha.split("-") : [];
  const fechaIntefaz =
    dateArray.length === 3
      ? dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
      : "";
  const montoColor = obtenerColorMonto(operacion.tipo);
  const signo = operacion.tipo === "ganancia" ? "+" : "-";

  const operacionHTML = `<div class="lg:grid grid-cols-5 lg:ml-4 ">
                              <div class="">
                                  <h3 class="font-semibold text-lg">Descripcion
                                      <span class="">
                                          ${operacion.descripcion}
                                      </span>
                                  </h3>
                              </div>
                              <div class="">
                                  <h3 class="font-semibold text-lg">Categoria
                                      <span class="">
                                          ${operacion.categoria}
                                      </span>
                                  </h3>
                              </div>
                              <div class=" ">
                                  <h3 class="font-semibold text-lg">Fecha
                                      <span class="text-xs">
                                          ${fechaIntefaz}
                                      </span>
                                  </h3>
                              </div>
                              <div class="lg:ml-10">
                                  <h3 class="font-semibold text-lg">Monto
                                      <span class="${montoColor}">
                                          ${signo}$${operacion.monto}
                                      </span>
                                  </h3>
                              </div>
                              <div>
                              <h3 class="font-semibold text-lg">Acciones
                                  <button class="text-blue-700" onclick="editarElemento(${operacion.id})">
                                      editar
                                  </button>
                                  <button class="text-blue-700" onclick="eliminarElemento(${operacion.id})">
                                      eliminar
                                  </button>
                              </h3>
                          </div>
                          </div>`;

  operacionesRealizadas.innerHTML = operacionHTML;
  operacionesRealizadas.classList.remove("hidden");
};

document.getElementById("filtro-ordenar").addEventListener("change", function() {
  const filtroSeleccionado = this.value;

  if (filtroSeleccionado === "monto_mayor") {
    const mayorMonto = encontrarMayorMonto(operaciones);
    if (mayorMonto) {
      mostrarOperacionMayorMonto(mayorMonto);
    } else {
      console.log('No hay operaciones para mostrar.');
    }
  } else if (filtroSeleccionado === "monto_menor") {
    const menorMonto = encontrarMenorMonto(operaciones);
    if (menorMonto) {
      mostrarOperacionMenorMonto(menorMonto);
    } else {
      console.log('No hay operaciones para mostrar.');
    }
  } else {
    // Mostrar todas las operaciones para otros filtros
    mostrarOperacionesEnHTML(operaciones);
  }
});




