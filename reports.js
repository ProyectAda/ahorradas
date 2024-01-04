// Función para cargar datos desde localStorage
const loadFromLocalStorage = () => {
    categories = JSON.parse(localStorage.getItem('categories')) || [];
    operaciones = JSON.parse(localStorage.getItem('operaciones')) || [];

};

// Función para obtener la categoría con mayor ganancia
const getCategoryWithMaxProfit = (operaciones) => {
    let maxProfitCategory = null;
    let maxProfit = 0;

    for (const operacion of operaciones) {
        if (operacion.tipo === 'ganancia') {
            const balance = operacion.monto;

            if (balance > maxProfit) {
                maxProfit = balance;
                maxProfitCategory = { nombre: operacion.categoria, monto: balance };
            }
        }
    }
    return maxProfitCategory;
};

// Función para obtener la categoría con mayor gasto
const getCategoryWithMaxExpense = (operaciones) => {
    let maxExpenseCategory = null;
    let maxExpense = 0;

    for (const operacion of operaciones) {
        if (operacion.tipo === 'gasto') {
            const expense = operacion.monto;

            if (expense > maxExpense) {
                maxExpense = expense;
                maxExpenseCategory = { nombre: operacion.categoria, monto: maxExpense };
            }
        }
    }

    return maxExpenseCategory;
};

// Función para obtener la categoría con mayor balance
const getCategoryWithMaxBalance = (operaciones) => {
    let maxBalanceCategory = null;
    let maxBalance = 0;

    for (const operacion of operaciones) {
        const balance = (operacion.tipo === 'ganancia') ? operacion.monto : -operacion.monto;

        if (balance > maxBalance) {
            maxBalance = balance;
            maxBalanceCategory = { nombre: operacion.categoria, monto: balance };
        }
    }

    return maxBalanceCategory;
};

// Función para obtener el mes con mayor ganancia
const getMonthWithMaxProfit = (operaciones) => {
    let maxProfitEntry = null;
    let maxProfit = 0;

    const profitByMonth = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'ganancia') {
            const balance = operacion.monto;
            const date = operacion.fecha;

            profitByMonth[date] = (profitByMonth[date] || 0) + balance;

            if (profitByMonth[date] > maxProfit) {
                maxProfit = profitByMonth[date];
                maxProfitEntry = { fecha: date, monto: maxProfit };
            }
        }
    }

    console.log("Fecha con mayor ganancia y monto:", maxProfitEntry);
    return maxProfitEntry;
};

// Función para obtener el mes con mayor gasto
const getMonthWithMaxExpense = (operaciones) => {
    let maxExpenseEntry = null;
    let maxExpense = 0;

    const expenseByMonth = {};

    for (const operacion of operaciones) {
        if (operacion.tipo === 'gasto') {
            const expense = operacion.monto;
            const date = operacion.fecha;

            expenseByMonth[date] = (expenseByMonth[date] || 0) + expense;

            if (expenseByMonth[date] > maxExpense) {
                maxExpense = expenseByMonth[date];
                maxExpenseEntry = { fecha: date, monto: maxExpense };
            }
        }
    }

    console.log("Fecha con mayor gasto y monto:", maxExpenseEntry);
    return maxExpenseEntry;
};
// Función para obtener los totales por categoría
const getTotalsByCategory = (operaciones) => {
    const totalsByCategory = {};

    for (const operacion of operaciones) {
        const { categoria, tipo, monto } = operacion;

        // Inicializa la categoría si no existe en totalsByCategory
        if (!totalsByCategory[categoria]) {
            totalsByCategory[categoria] = { ganancia: 0, gasto: 0, balance: 0 };
        }

        // Actualiza los totales según el tipo de operación
        if (tipo === 'ganancia') {
            totalsByCategory[categoria].ganancia += monto;
        } else if (tipo === 'gasto') {
            totalsByCategory[categoria].gasto += monto;
        }

        // Actualiza el balance
        totalsByCategory[categoria].balance = totalsByCategory[categoria].ganancia - totalsByCategory[categoria].gasto;
    }

    return totalsByCategory;
};



// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Llama a la función para cargar datos desde localStorage
    loadFromLocalStorage();

    // Llama a las funciones relacionadas con categorías después de cargar desde localStorage
    const maxProfitCategory = getCategoryWithMaxProfit(operaciones);
    const maxExpenseCategory = getCategoryWithMaxExpense(operaciones);
    const maxBalanceCategory = getCategoryWithMaxBalance(operaciones);
    const maxProfitMonth = getMonthWithMaxProfit(operaciones);
    const maxExpenseMonth = getMonthWithMaxExpense(operaciones);
    const totalsByCategory = getTotalsByCategory(operaciones);

    // Log de resultados
    console.log("Categoría con mayor ganancia:", maxProfitCategory);
    console.log("Categoría con mayor gasto:", maxExpenseCategory);
    console.log("Categoría con mayor balance:", maxBalanceCategory);
    console.log("Mes con mayor ganancia:", maxProfitMonth);
    console.log("Mes con mayor gasto:", maxExpenseMonth);
    console.log("Totales por categoría:", totalsByCategory);
});
