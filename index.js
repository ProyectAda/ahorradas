// navbar
const toggleBtn = document.getElementById('toggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');

    toggleBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');

      // Cambiar el ícono de hamburguesa a la "x" y viceversa
      if (mobileMenu.classList.contains('hidden')) {
        hamburgerIcon.classList.remove('fa-xmark');
        hamburgerIcon.classList.add('fa-bars');
      } else {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-xmark');
      }
    });

    //nueva operacion

    const seccionBalances = document.getElementById("seccionBalances");
    // const seccionCategorias = document.getElementById("seccionCategorias");
    // const seccionReportes = document.getElementById("seccionReportes");
    const botonNuevaOperacion = document.getElementById("botonNuevaOperacion");
    const seccionAgregarOperacion = document.getElementById("seccionAgregarOperacion");
   
    
    
    botonNuevaOperacion.addEventListener("click", (e) => {
        seccionBalances.classList.add("hidden");
        // seccionCategorias.classList.add("hidden");
        // seccionReportes.classList.add("hidden");
        seccionAgregarOperacion.classList.remove("hidden");
        sinOperaciones.classList.add("hidden")
    
    })

    
    
//boton
const descripcionNuevaOperacion = document.getElementById("input-descripcion-nueva-operacion");
    const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
    const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
    const categoriaNuevaOperacion = document.getElementById("categoria-nueva-operacion");
    const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");
    const botonAgregarNuevaOperacion = document.getElementById("boton-agregar-operacion");
    const operacionesRealizadas = document.getElementById("operaciones-realizadas");
    const sinOperaciones = document.getElementById("sin-operaciones");
    const acciones=document.getElementById("acciones")
    

    // Array de operaciones
    let arrayDeOperaciones = [];

    const mostrarOperacionesEnHTML = (array) => {
        let operacionesHTML = "";
        array.forEach((elemento) => {
            const dateArray = elemento.fecha.split("-");
            const fechaIntefaz = dateArray[2] + "-" + dateArray[1] + '-' + dateArray[0];
            operacionesHTML += `<div class="lg:grid grid-cols-5 lg:ml-4 ">
                                    <div class="">
                                        <h3 class="font-semibold">Descripcion
                                            <span class="">
                                                ${elemento.descripcion}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class="">
                                        <h3 class="font-semibold">Categoria
                                            <span class="">
                                                ${elemento.categoria}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class=" ">
                                        <h3 class="lg:mr-14 font-semibold">Fecha
                                            <span class="text-xs">
                                                ${fechaIntefaz}
                                            </span>
                                        </h3>
                                    </div>
                                    <div class="lg:ml-10">
                                        <h3 class="lg:mr-14 font-semibold">Monto
                                            <span class="">
                                                ${elemento.monto}
                                            </span>
                                        </h3>
                                    </div>
                                    <div>
                                    <h3 class="lg:mr-14 font-semibold">Acciones
                                        <button class="text-blue-700"onclick="editarElemento(${elemento.id})">
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
    };
    //boton agregar nueva operacion
    botonAgregarNuevaOperacion.addEventListener('click', () => {
        arrayDeOperaciones.push({
            id:Date.now(),
            descripcion: descripcionNuevaOperacion.value,
            monto: montoNuevaOperacion.value,
            tipo: tipoNuevaOperacion.value,
            categoria: categoriaNuevaOperacion.value,
            fecha: fechaNuevaOperacion.value,    
        });

        mostrarOperacionesEnHTML(arrayDeOperaciones);
        seccionAgregarOperacion.classList.add("hidden");
        seccionBalances.classList.remove("hidden")
        operacionesRealizadas.classList.remove("hidden")
        sinOperaciones.classList.add("hidden")
        
       
    });




//boton eliminar elementos
    const eliminarElemento = (id) => {
        arrayDeOperaciones = arrayDeOperaciones.filter((elemento) => {
            return elemento.id !== parseInt(id);
        });
        mostrarOperacionesEnHTML(arrayDeOperaciones);
    };
    mostrarOperacionesEnHTML(arrayDeOperaciones);






// En la página actual donde se ejecuta la función editarElemento
function editarElemento(id) {
    // Buscar la operación correspondiente en el arrayDeOperaciones
    const operacionSeleccionada = arrayDeOperaciones.find(elemento => elemento.id === id);

    // Obtener la sección de editar operación como HTML
    const seccionEditarOperacionHTML = `
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
                    <option value="servicios">Servicios</option>
                    <option value="salidas">Salidas</option>
                    <option value="educacion">Educación</option>
                    <option value="transporte">Transporte</option>
                    <option value="trabajo">Trabajo</option>
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
      
</section>`

    // Reemplazar el contenido de la página actual con la sección de editar operación
    document.body.innerHTML = seccionEditarOperacionHTML;

    // Obtener la sección de editar operación del DOM
    const seccionEditarOperacion = document.getElementById('seccionEditarOperacion');

    // Verificar si la sección existe
    if (seccionEditarOperacion) {
        // Llenar los campos con la información correspondiente
        document.getElementById("input-descripcion-nueva-operacion").value = operacionSeleccionada.descripcion;
        document.getElementById("monto-nueva-operacion").value = operacionSeleccionada.monto;
        document.getElementById("tipo-nueva-operacion").value = operacionSeleccionada.tipo;
        document.getElementById("categoria-nueva-operacion").value = operacionSeleccionada.categoria;
        document.getElementById("fecha-nueva-operacion").value = operacionSeleccionada.fecha;

        // Mostrar la sección de editar operación
        seccionEditarOperacion.classList.remove("hidden");

        // Volver a cargar el array de operaciones desde localStorage
        const operacionesDesdeLocalStorage = JSON.parse(localStorage.getItem('arrayDeOperaciones'));

        // Verificar si se cargó correctamente el array desde localStorage
        if (operacionesDesdeLocalStorage) {
            // Actualizar el arrayDeOperaciones con los datos cargados desde localStorage
            arrayDeOperaciones = operacionesDesdeLocalStorage;

            // Volver a mostrar las operaciones en HTML con la función mostrarOperacionesEnHTML
            mostrarOperacionesEnHTML(arrayDeOperaciones);
        } else {
            console.error('Error al cargar el arrayDeOperaciones desde localStorage.');
        }
    } else {
        console.error('La sección de editar operación no se encontró en el DOM.');
    }
}







  







//filtros

// boton mostrar filtros
const ocultarFiltro = document.getElementById("ocultarFiltro")
const listaFiltro = document.getElementById("listaFiltro")
const filtroConteiner = document.getElementById("filtroConteiner")

ocultarFiltro.addEventListener("click", (e) => {
  listaFiltro.classList.toggle("hidden")

  if (listaFiltro.classList.contains("hidden")) {
    ocultarFiltro.innerText = "Mostrar filtros"
    filtroConteiner.style.height = "80px"
    filtroConteiner.style.marginBottom = "0"
  } else {
    ocultarFiltro.innerText = "Ocultar filtros"
    filtroConteiner.style.marginBottom = "300px"
  }
})

//segun tipo de filtro
// const filtroTipo = document.getElementById("filtro-tipo")
// const filtroCategoria = document.getElementById("filtro-categoria")
// const filtroFecha = document.getElementById("filtro-fecha")
// const ordenar = document.getElementById("filtro-ordenar")

// //filtro tipo
// const aplicarFiltros = () => {
//     const tipo = filtroTipo.value
//     const filtradoPorTipo = arrayDeOperaciones.filter((elemento) => {
//         if (tipo === "todos") {
//             return elemento
//         }
//         return elemento.tipo === tipo
//     })

//filtro categoria
//     const categoria = filtroCategoria.value
//     const filtradoPorCategoria = filtradoPorTipo.filter((elemento) => {
//         if (categoria === "todos") {
//             return elemento
//         }
//         return elemento.categoria === categoria
//     })

// //fitro fecha
//     const fechaDesde = filtroFecha.value
//     filtradoPorFecha = filtradoPorCategoria.filter((elemento) => {

//             if (fechaDesde === 0) {
//                 return elemento
//             }
//             return elemento.fecha >= fechaDesde
//         })

// //filtro oredenar por
//     console.log(ordenar.value)
//     switch (ordenar.value) {
//         case 'recientes':
//             filtradoPorFecha = ordernarPorFecha(filtradoPorFecha, 'DESC')
//             break
//         case 'antiguas':
//             filtradoPorFecha = ordernarPorFecha(filtradoPorFecha, 'ASC')
//             break
//         case 'monto_mayor':
//             filtradoPorFecha = ordernarPorMonto(filtradoPorFecha, 'DESC')
//             break
//         case 'monto_menor':
//             filtradoPorFecha = ordernarPorMonto(filtradoPorFecha, 'ASC')
//             break
//         case 'A/Z':
//             filtradoPorFecha = ordernarPorDescripcion(filtradoPorFecha, 'ASC')
//             break
//         case 'Z/A':
//             filtradoPorFecha = ordernarPorDescripcion(filtradoPorFecha, 'DESC')
//             break
//         default:
//     }

//     return filtradoPorFecha

// }



//     const ordernarPorFecha = (arrayVariable, ordenar) => {
//         console.log(arrayVariable)
//         return [...arrayVariable].sort((a, b) => {
//             const fechaA = new Date(a.fecha)
//             const fechaB = new Date(b.fecha)
//             return ordenar === 'ASC' ?
//                 fechaA.getTime() - fechaB.getTime() :
//                 fechaB.getTime() - fechaA.getTime()
//         })
//     }

//     const ordernarPorMonto = (arrayVariable, ordenar) => {
//         return [...arrayVariable].sort((a, b) => {
//             return ordenar === 'ASC' ? a.monto - b.monto : b.monto - a.monto
//         })
//     }

//     const ordernarPorDescripcion = (arrayVariable, ordenar) => {
//         if (ordenar === 'ASC') {
//             return [...arrayVariable].sort((a, b) => {
//                 if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
//                     return -1
//                 }
//                 if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
//                     return 1
//                 }
//                 return 0
//             })
//         } else {
//             return [...arrayVariable].sort((a, b) => {
//                 if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
//                     return -1
//                 }
//                 if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
//                     return 1
//                 }
//                 return 0
//             })
//         }

//     }

//mostrar filtros

    // filtroTipo.onchange = () => {
    //     const arrayFiltrado = aplicarFiltros()
    //     operacionesRealizadas.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    // }

    // filtroCategoria.onchange = () => {
    //     const arrayFiltrado = aplicarFiltros()
    //     operacionesRealizadas.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    // }

    // filtroFecha.onchange = () => {
    //         const arrayFiltrado = aplicarFiltros()
    //         operacionesRealizadas.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    //     }


    // ordenar.onchange = () => {
    //         const arrayFiltrado = aplicarFiltros()
    //         operacionesRealizadas.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    //     }



