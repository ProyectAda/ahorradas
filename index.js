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

    
    
 // array inicial
    const descripcionNuevaOperacion = document.getElementById("input-descripcion-nueva-operacion");
    const montoNuevaOperacion = document.getElementById("monto-nueva-operacion");
    const tipoNuevaOperacion = document.getElementById("tipo-nueva-operacion");
    const categoriaNuevaOperacion = document.getElementById("categoria-nueva-operacion");
    const fechaNuevaOperacion = document.getElementById("fecha-nueva-operacion");
    const botonAgregarNuevaOperacion = document.getElementById("boton-agregar-operacion");
    const operacionesRealizadas = document.getElementById("operaciones-realizadas");
    const sinOperaciones = document.getElementById("sin-operaciones");
    const acciones=document.getElementById("acciones")
    
// local storage
const guardarDatosLocal = (array) => {
    const datosGuardadosJSON = JSON.stringify(array);
    localStorage.setItem('operaciones', datosGuardadosJSON);
}

// recupero datos del local
const obtenerDatosLocal = () => {
    const datosGuardadosEnElLocalStorage = localStorage.getItem('operaciones');
    const datosGuardadosJSONaJS = JSON.parse(datosGuardadosEnElLocalStorage);
    
    if (datosGuardadosEnElLocalStorage === null) {
        return [];
    } else {
        return datosGuardadosJSONaJS;
    }
}

    // Array de operaciones
    let arrayDeOperaciones = [];

    const mostrarOperacionesEnHTML = (array) => {
        let operacionesHTML = "";
        array.forEach((elemento) => {
            console.log('Elemento actual:', elemento);
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
                                console.log('Fecha interfaz:', fechaIntefaz);
         
        });
     
        operacionesRealizadas.innerHTML = operacionesHTML;
        operacionesRealizadas.classList.remove("hidden");

    };

const inicializarPagina = () => {
    arrayDeOperaciones = obtenerDatosLocal();

    if (arrayDeOperaciones.length > 0) {
        mostrarOperacionesEnHTML(arrayDeOperaciones);
        operacionesRealizadas.classList.remove("hidden");
        sinOperaciones.classList.add("hidden");
    } else {
        operacionesRealizadas.classList.add("hidden");
        sinOperaciones.classList.remove("hidden");
    }
};

    document.addEventListener("DOMContentLoaded", inicializarPagina);



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
        guardarDatosLocal(arrayDeOperaciones);
        mostrarOperacionesEnHTML(arrayDeOperaciones);
        seccionAgregarOperacion.classList.add("hidden");
        seccionBalances.classList.remove("hidden")
        operacionesRealizadas.classList.remove("hidden")
        sinOperaciones.classList.add("hidden")
        

    });

    // boton eliminar
    const eliminarElemento = (id) => {
        arrayDeOperaciones = arrayDeOperaciones.filter((elemento) => {
            return elemento.id !== parseInt(id);
        });

        mostrarOperacionesEnHTML(arrayDeOperaciones);

        guardarDatosLocal(arrayDeOperaciones);
        // Check if there are remaining operations
        if (arrayDeOperaciones.length === 0) {
        // If no operations are left, display the "sin operaciones" section
            operacionesRealizadas.classList.add("hidden");
            sinOperaciones.classList.remove("hidden");
    }

    };













// //boton editar

// const editarElemento = (id)=> {
//     const operacionSeleccionada = arrayDeOperaciones.find(elemento => elemento.id === id);
//     const seccionEditarOperacionHTML = `
//     <!-- Barra de navegación -->
//         <nav class="bg-[#00d1b2] p-4">
//           <div class="container mx-auto flex justify-between items-center">
//             <!-- Logo -->
//             <a href="#" class="text-white text-2xl font-semibold hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fa-solid fa-wallet p-2 "></i>AhorrADAS</a>
      
//             <!-- Botón de hamburguesa para pantallas pequeñas -->
//             <div class="block lg:hidden">
//                 <button id="toggleBtn" class="text-white focus:outline-none ">
//                     <i id="hamburgerIcon" class="fa-solid fa-bars text-xl hover:bg-[#00947e]/[.36] p-2 rounded-lg "></i>
//                   </button>
//             </div>
      
//             <!-- Menú de navegación -->
//             <div class="hidden lg:flex space-x-4">
//               <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fas fa-chart-line p-2"></i>Balance</a>
//               <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fa-solid fa-tag p-2 "></i>Categorías</a>
//               <a href="#" class="text-white  hover:bg-[#00947e]/[.36] p-2 rounded-lg"><i class="fas fa-chart-pie p-2"></i>Reportes</a>
//             </div>
//           </div>
//         </nav>
      
//         <!-- Menú desplegable para pantallas pequeñas -->
//         <div id="mobileMenu" class="lg:hidden hidden bg-white">
//           <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fas fa-chart-line p-2"></i>Balance</a>
//           <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fa-solid fa-tag p-2"></i>Categorías</a>
//           <a href="#" class="block text-slate-700 p-2 hover:bg-slate-100 hover:text-[#3273dc]"><i class="fas fa-chart-pie p-2"></i>Reportes</a>
//         </div>
//     <section class="hidden" id="seccionEditarOperacion">
//     <div class="ml-4 mt-20 mb-16 w-72 h-[40rem] rounded-lg bg-white md:w-[46rem] md:h-[40rem] lg:ml-36 shadow-2xl ">
//         <h2 class="text-4xl ml-5 mr-4 pt-6 pb-10 font-bold  ">Editar operación</h2>
//         <div>
//             <label class="ml-4 font-bold">Descripción</label>
//             <div class="ml-4 pt-2 pb-2">
//                 <input type="text" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="input-descripcion-nueva-operacion">
//             </div>
//         </div>
//         <div>
//             <label class="ml-4 font-bold">Monto</label>
//             <div class="ml-4 pt-2 pb-2">
//                 <input type="number" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="monto-nueva-operacion">
//             </div>
//         </div>
//         <div>
//             <label class="ml-4 font-bold">Tipo</label>
//             <div class="ml-4 pt-2 pb-2">
//                 <select id="tipo-nueva-operacion" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]">
//                     <option value="ganancia">Ganancia</option>
//                     <option value="gasto">Gasto</option>
//                 </select>
//             </div>
//         </div>
//         <div>
//             <label class="ml-4 font-bold">Categoría</label>
//             <div class="ml-4 pt-2 pb-2">
//                 <select id="categoria-nueva-operacion" class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]">
//                     <option value="servicios">Servicios</option>
//                     <option value="salidas">Salidas</option>
//                     <option value="educacion">Educación</option>
//                     <option value="transporte">Transporte</option>
//                     <option value="trabajo">Trabajo</option>
//                 </select>
//             </div>
//         </div>
//         <div>
//             <label class="ml-4 font-bold " for="date">Fecha</label>
//             <div class="ml-4 pt-2 pb-2">
//                 <input class="border-solid border-2 border-neutral-200 rounded-lg w-64 h-10 rounded md:w-[44rem]" id="fecha-nueva-operacion" type="date" value="2023-12-22">

//             </div>
//         </div>
//         <div class="flex justify-end mt-6 mr-4">
//         <button class="bg-[#f5f5f5] w-20 h-10 text-black rounded mr-2" id="boton-cancelar-edicion">Cancelar</button>
//         <button class="bg-[#48c774] w-20 h-10 text-white rounded" id="boton-guardar-edicion">Editar</button>        
//         </div>
//     </div>
      
// </section>`

//     document.body.innerHTML = seccionEditarOperacionHTML;

//     const seccionEditarOperacion = document.getElementById('seccionEditarOperacion');

//     if (seccionEditarOperacion) {
//         document.getElementById("input-descripcion-nueva-operacion").value = operacionSeleccionada.descripcion;
//         document.getElementById("monto-nueva-operacion").value = operacionSeleccionada.monto;
//         document.getElementById("tipo-nueva-operacion").value = operacionSeleccionada.tipo;
//         document.getElementById("categoria-nueva-operacion").value = operacionSeleccionada.categoria;
//         document.getElementById("fecha-nueva-operacion").value = operacionSeleccionada.fecha;

//         seccionEditarOperacion.classList.remove("hidden");

//     const botonGuardarEdicion = document.getElementById('boton-guardar-edicion');
//     if (botonGuardarEdicion) {
//     botonGuardarEdicion.addEventListener('click', () => {
//         guardarEdicion(id);
//     });
//     } else {
//     console.error('El botón de guardar edición no se encontró en el DOM.');
//     }   
// }

// }

// const guardarEdicion = (id) => {
//     console.log('Array de operaciones antes de la edición:', arrayDeOperaciones);
//     console.log('Guardar edición ejecutado con éxito!')
//     const nuevaDescripcion = document.getElementById("input-descripcion-nueva-operacion").value;
//     const nuevoMonto = document.getElementById("monto-nueva-operacion").value;
//     const nuevoTipo = document.getElementById("tipo-nueva-operacion").value;
//     const nuevaCategoria = document.getElementById("categoria-nueva-operacion").value;
//     const nuevaFecha = document.getElementById("fecha-nueva-operacion").value;
//     console.log('Nueva descripción:', nuevaDescripcion);
//     console.log('Nuevo monto:', nuevoMonto);
//     console.log('Nuevo tipo:', nuevoTipo);
//     console.log('Nueva categoría:', nuevaCategoria);
//     console.log('Nueva fecha:', nuevaFecha);

//     const operacionAEditar = arrayDeOperaciones.find(elemento => elemento.id === id);

//     operacionAEditar.descripcion = nuevaDescripcion;
//     operacionAEditar.monto = nuevoMonto;
//     operacionAEditar.tipo = nuevoTipo;
//     operacionAEditar.categoria = nuevaCategoria;
//     operacionAEditar.fecha = nuevaFecha;

  
//     localStorage.setItem('arrayDeOperaciones', JSON.stringify(arrayDeOperaciones));
 
//     console.log('Array de operaciones después de la edición:', arrayDeOperaciones);

   
//     mostrarOperacionesEnHTML(arrayDeOperaciones);
// };




  














// //filtros

// // boton mostrar filtros
// const ocultarFiltro = document.getElementById("ocultarFiltro")
// const listaFiltro = document.getElementById("listaFiltro")
// const filtroConteiner = document.getElementById("filtroConteiner")

// ocultarFiltro.addEventListener("click", (e) => {
//   listaFiltro.classList.toggle("hidden")

//   if (listaFiltro.classList.contains("hidden")) {
//     ocultarFiltro.innerText = "Mostrar filtros"
//     filtroConteiner.style.height = "80px"
//     filtroConteiner.style.marginBottom = "0"
//   } else {
//     ocultarFiltro.innerText = "Ocultar filtros"
//     filtroConteiner.style.marginBottom = "300px"
//   }
// })

// //Clases de filtros

// const filtroTipo = document.getElementById("filtro-tipo")
// const filtroCategoria = document.getElementById("filtro-categoria")
// const filtroFecha = document.getElementById("filtro-fecha")
// const ordenar = document.getElementById("filtro-ordenar")

// //filtro tipo
// const aplicarFiltrosTipo = () => {
//     const tipo = filtroTipo.value;
//     const filtradoPorTipo = arrayDeOperaciones.filter((elemento) => {
//         if (tipo === "todos") {
//             return true;  
//         }
//         const resultadoFiltro = elemento.tipo === tipo;
//         console.log("funciona filtro tipo", resultadoFiltro);
//         return resultadoFiltro;
//     });

//     return filtradoPorTipo; 
// };


//     filtroTipo.onchange = () => {
//         const arrayFiltrado = aplicarFiltrosTipo()
//         mostrarOperacionesEnHTML(arrayFiltrado);

//     }


// //filtro categoria
//     const aplicarFiltrosCategoria = () => {
//     const categoria = filtroCategoria.value
//     const filtradoPorCategoria = arrayDeOperaciones.filter((elemento) => {
//         if (categoria === "todas") {
//             return true; 
//         }
//         const resultadoFiltro = elemento.categoria === categoria;
//         console.log("funciona filtro categoria", resultadoFiltro);
//         return resultadoFiltro;
//     });

//     return filtradoPorCategoria; 
//     }

//     filtroCategoria.onchange = () => {
//         const arrayFiltrado = aplicarFiltrosCategoria()
//         mostrarOperacionesEnHTML(arrayFiltrado);
//     }


    //filtro fecha

    
//     const fechaDesde = filtroFecha.value
//     filtradoPorFecha = filtradoPorCategoria.filter((elemento) => {

//             if (fechaDesde === 0) {
//                 return elemento
//             }
//             return elemento.fecha >= fechaDesde
//         })

    
//    filtroFecha.onchange = () => {
//         const arrayFiltrado = aplicarFiltros()
//         boxOperaciones.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
//     }















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




    // ordenar.onchange = () => {
    //         const arrayFiltrado = aplicarFiltros()
    //         operacionesRealizadas.innerHTML = mostrarOperacionesEnHTML(arrayFiltrado)
    //     }



