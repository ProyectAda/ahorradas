
// Cargar datos desde localStorage

const loadFromLocalStorage = () => {
    const categories = JSON.parse(localStorage.getItem('categories')) || [];
    const operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];
    return { categories, operaciones }
};

// Estilos a  montos Y nombres de categorías

const formatAmountWithColor = (amount, tipo) => {
    const signo = (tipo === 'gasto') ? '-' : '+';
    const colorClass = (parseInt(amount, 10) === 0) ? 'text-gray-500' : (tipo === 'ganancia') ? 'text-green-500' : 'text-red-500';

    const formattedAmount = `${signo}$${Math.abs(parseInt(amount, 10))}`;


    const resultAmount = (parseInt(amount, 10) === 0) ? '$0' : formattedAmount;

    return `<span class="${colorClass}">${resultAmount}</span>`;
};

const formatAmountGrayWithSign = (amount) => {
    const colorClass = 'text-gray-500';
    const signo = (amount < 0) ? '-' : '+';

    const formattedAmount = `${signo}$${Math.abs(parseInt(amount, 10))}`;

    const resultAmount = (parseInt(amount, 10) === 0) ? '$0' : formattedAmount;

    return `<span class="${colorClass}">${resultAmount}</span>`;
};

const getCategoryNameStyle = () => {
    return 'bg-[#d1fae5] text-[#00d1b2] px-4 rounded-md mr-2';
};


// obtener el resumen por categoría con mayor ganancia

const getCategoryWithMaxProfit = (operaciones) => {
    const categoriasGanancia = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'ganancia') {
            const { categoria, monto } = operacion;

            if (!categoriasGanancia[categoria]) {
                categoriasGanancia[categoria] = 0;
            }

            categoriasGanancia[categoria] += parseInt(monto);
        }
    }

    let maxProfitCategory = {};
    let maxProfit = 0;

    for (const categoria in categoriasGanancia) {
        const totalProfit = categoriasGanancia[categoria];

        if (totalProfit > maxProfit) {
            maxProfit = totalProfit;
            maxProfitCategory = categoria;
        }
    }

    const estiloNombreCategoria = getCategoryNameStyle();

    return maxProfitCategory
        ? { nombre: `<span class="${estiloNombreCategoria}">${maxProfitCategory}</span>`, monto: formatAmountWithColor(maxProfit, 'ganancia') }
        : null;
};


// obtener el resumen por categoría con mayor gasto

const getCategoryWithMaxExpense = (operaciones) => {
    const categoriasGasto = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'gasto') {
            const { categoria, monto } = operacion;

            if (!categoriasGasto[categoria]) {
                categoriasGasto[categoria] = 0;
            }

            categoriasGasto[categoria] += parseInt(monto);
        }
    }

    let maxExpenseCategory = {};
    let maxExpense = 0;

    for (const categoria in categoriasGasto) {
        const totalExpense = categoriasGasto[categoria];

        if (totalExpense > maxExpense) {
            maxExpense = totalExpense;
            maxExpenseCategory = categoria;
        }
    }

    const estiloNombreCategoria = getCategoryNameStyle();

    return maxExpenseCategory
        ? { nombre: `<span class="${estiloNombreCategoria}">${maxExpenseCategory}</span>`, monto: formatAmountWithColor(maxExpense, 'gasto') }
        : null;
};

// obtener el resumen por categoría con mayor balance positivo

const getCategoryWithMaxBalance = (operaciones) => {
    const categoriasBalances = {};

    for (const operacion of operaciones) {
        const balance = (operacion.tipo === 'ganancia') ? operacion.monto : -operacion.monto;

        if (!categoriasBalances[operacion.categoria]) {
            categoriasBalances[operacion.categoria] = 0;
        }

        categoriasBalances[operacion.categoria] += parseInt(balance);
    }

    let maxPositiveBalanceCategory = null;


    for (const categoria in categoriasBalances) {
        const balanceCategoria = categoriasBalances[categoria];
        if (balanceCategoria >= 0 && (!maxPositiveBalanceCategory || balanceCategoria > maxPositiveBalanceCategory.monto)) {
            maxPositiveBalanceCategory = { nombre: categoria, monto: balanceCategoria };
        }
    }

    if (maxPositiveBalanceCategory) {
        const estiloNombreCategoria = getCategoryNameStyle();
        return { nombre: `<span class="${estiloNombreCategoria}">${maxPositiveBalanceCategory.nombre}</span>`, monto: formatAmountGrayWithSign(maxPositiveBalanceCategory.monto, 'ganancia') };
    } else {
        const estiloNombreCategoria = getCategoryNameStyle();
        return { nombre: null, monto: formatAmountGrayWithSign(0, 'ganancia') };
    }
};

// obtener el resumen por mes con mayor ganancia

const getMonthWithMaxProfit = (operaciones) => {
    let maxProfitEntry = {};
    let maxProfit = 0;

    const profitByMonth = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'ganancia') {
            const balance = operacion.monto;
            const date = operacion.fecha;

            profitByMonth[date] = (profitByMonth[date] || 0) + parseInt(balance);

            if (profitByMonth[date] > maxProfit) {
                maxProfit = profitByMonth[date];
                maxProfitEntry = { fecha: date, monto: maxProfit };
            }
        }
    }

    return { fecha: maxProfitEntry.fecha, monto: formatAmountWithColor(maxProfitEntry.monto, 'ganancia') };

};

// obtener el resumen por mes con mayor gasto

const getMonthWithMaxExpense = (operaciones) => {
    let maxExpenseEntry = {};
    let maxExpense = 0;

    const expenseByMonth = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'gasto') {
            const expense = operacion.monto;
            const date = operacion.fecha;

            expenseByMonth[date] = (expenseByMonth[date] || 0) + parseInt(expense);

            if (expenseByMonth[date] > maxExpense) {
                maxExpense = expenseByMonth[date];
                maxExpenseEntry = { fecha: date, monto: maxExpense };
            }
        }
    }

    return { fecha: maxExpenseEntry.fecha, monto: formatAmountWithColor(maxExpenseEntry.monto, 'gasto') };

};

// obtener los totales por cada categoría

const getTotalsByCategory = (operaciones) => {
    const totalsByCategory = {};

    for (const operacion of operaciones) {
        const { categoria, tipo, monto } = operacion;

        if (!totalsByCategory[categoria]) {
            totalsByCategory[categoria] = { ganancia: 0, gasto: 0, balance: 0 };
        }

        if (tipo === 'ganancia') {
            totalsByCategory[categoria].ganancia += parseInt(monto);
        } else if (tipo === 'gasto') {
            totalsByCategory[categoria].gasto += parseInt(monto);
        }

        totalsByCategory[categoria].balance = totalsByCategory[categoria].ganancia - totalsByCategory[categoria].gasto;
    }

    return totalsByCategory;
};

// obtener los totales por cada mes

const getSummaryByMonth = (operaciones) => {
    const summaryByMonth = {};

    for (const operacion of operaciones) {
        const { fecha, tipo, monto } = operacion;
        const monthKey = fecha.slice(5, 7) + '/' + fecha.slice(0, 4);

        if (!summaryByMonth[monthKey]) {
            summaryByMonth[monthKey] = { ganancia: 0, gasto: 0, balance: 0 };
        }

        if (tipo === 'ganancia') {
            summaryByMonth[monthKey].ganancia += parseInt(monto, 10);
        } else if (tipo === 'gasto') {
            summaryByMonth[monthKey].gasto += parseInt(monto, 10);
        }

        summaryByMonth[monthKey].balance = summaryByMonth[monthKey].ganancia - summaryByMonth[monthKey].gasto;
    }

    return summaryByMonth;
};


//mostrar reportes si hay operaciones o si no hay

const mostrarReportes = (operaciones) => {
    const maxProfitCategory = getCategoryWithMaxProfit(operaciones);
    const maxExpenseCategory = getCategoryWithMaxExpense(operaciones);
    const maxBalanceCategory = getCategoryWithMaxBalance(operaciones);
    const maxProfitMonth = getMonthWithMaxProfit(operaciones);
    const maxExpenseMonth = getMonthWithMaxExpense(operaciones);
    const totalsByCategory = getTotalsByCategory(operaciones);
    const summaryByMonth = getSummaryByMonth(operaciones);

    const reportContainer = document.getElementById("report-container");
    const sinReportesContainer = document.getElementById("sin-reportes");
    const tablaCategoriasContainer = document.getElementById("tabla-categorias");

    if (operaciones.length > 0) {
        reportContainer.classList.remove("hidden");
        sinReportesContainer.classList.add("hidden");

        actualizarContenido(maxProfitCategory, maxExpenseCategory, maxBalanceCategory, maxProfitMonth, maxExpenseMonth, totalsByCategory);

        tablaCategoriasContainer.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2 text-left">Categorías</th>
                        <th class="px-4 py-2">Ganancias</th>
                        <th class="px-4 py-2">Gastos</th>
                        <th class="px-4 py-2">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(totalsByCategory).map(([categoria, { ganancia, gasto, balance }]) => `
                        <tr>
                            <td class="px-4 py-2 font-semibold text-left">${categoria}</td>
                            <td class="px-4 py-2 text-center">${formatAmountWithColor(ganancia, 'ganancia')}</td>
                            <td class="px-4 py-2 text-center">${formatAmountWithColor(gasto, 'gasto')}</td>
                            <td class="px-4 py-2 text-center">${formatAmountGrayWithSign(balance, 'ganancia')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        `;


        // mostrar el resumen por cada mes

        const resumenPorMesContainer = document.getElementById("resumen-por-mes");
        resumenPorMesContainer.innerHTML = `
<div class="overflow-x-auto">
    <table class="w-full table-auto ">
        <thead>
            <tr>
                <th class="px-4 py-2 text-left">Mes</th>
                <th class="px-4 py-2">Ganancia</th>
                <th class="px-4 py-2">Gasto</th>
                <th class="px-4 py-2">Balance</th>
            </tr>
        </thead>
        <tbody>
            ${Object.entries(summaryByMonth).map(([month, { ganancia, gasto, balance }]) => `
                <tr>
                    <td class="px-4 py-2 font-semibold text-left">${month}</td>
                    <td class="px-4 py-2 text-center">${formatAmountWithColor(ganancia, 'ganancia')}</td>
                    <td class="px-4 py-2 text-center">${formatAmountWithColor(gasto, 'gasto')}</td>
                    <td class="px-4 py-2 text-center">${formatAmountGrayWithSign(balance)}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
</div>
`;

    } else {

        sinReportesContainer.classList.remove("hidden");
        reportContainer.classList.add("hidden");
    }
};

// actualizar el contenido del resumen, reporte por categorías y reporte por mes
const actualizarContenido = (maxProfitCategory, maxExpenseCategory, maxBalanceCategory, maxProfitMonth, maxExpenseMonth, totalsByCategory) => {
    // nombres
    document.getElementById("max-profit-category").innerHTML = maxProfitCategory ? maxProfitCategory.nombre : 'N/A';
    document.getElementById("max-expense-category").innerHTML = maxExpenseCategory ? maxExpenseCategory.nombre : 'N/A';
    document.getElementById("max-balance-category").innerHTML = maxBalanceCategory ? maxBalanceCategory.nombre : 'N/A';
    document.getElementById("max-profit-month").innerHTML = maxProfitMonth ? maxProfitMonth.fecha : 'N/A';
    document.getElementById("max-expense-month").innerHTML = maxExpenseMonth ? maxExpenseMonth.fecha : 'N/A';

    // montos
    document.getElementById("max-profit-amount").innerHTML = maxProfitCategory ? `${maxProfitCategory.monto}` : 'N/A';
    document.getElementById("max-expense-amount").innerHTML = maxExpenseCategory ? `${maxExpenseCategory.monto}` : 'N/A';
    document.getElementById("max-balance-amount").innerHTML = maxBalanceCategory ? `${maxBalanceCategory.monto}` : 'N/A';
    document.getElementById("max-profit-month-amount").innerHTML = maxProfitMonth ? `${maxProfitMonth.monto}` : 'N/A';
    document.getElementById("max-expense-month-amount").innerHTML = maxExpenseMonth ? `${maxExpenseMonth.monto}` : 'N/A';

};

let loadOperaciones = loadFromLocalStorage()


/* document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    mostrarReportes(loadOperaciones.operaciones);
}); */

const inicializar = () => {
    loadFromLocalStorage();
    mostrarReportes(loadOperaciones.operaciones);
}
window.onload = inicializar()
window.addEventListener('Storage', function(event){
    console.log(event)
})