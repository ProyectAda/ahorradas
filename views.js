// Cargar vistas


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtnHome = document.getElementById('toggleBtnHome');
    const toggleBtnCategory = document.getElementById('toggleBtnCategory');
    const toggleBtnReport = document.getElementById('toggleBtnReport');
    const seccionBalances = document.getElementById('seccionBalances');
    const categoryView = document.getElementById('category-view');
    const reportView = document.getElementById('report-view');
    const reportViewLittle = document.getElementById('toggleBtnReportLittle');
    const categoryViewLittle = document.getElementById('toggleBtnCategoryLittle');
    const seccionBalancesLittle = document.getElementById('toggleBtnHomeLittle');

    toggleBtnHome.addEventListener('click', () => {
        seccionBalances.classList.remove('hidden');
        seccionAgregarOperacion.classList.add('hidden')
        categoryView.classList.add('hidden');
        reportView.classList.add('hidden');
      
    });

  
    toggleBtnCategory.addEventListener('click', () => {
        seccionBalances.classList.add('hidden');
        categoryView.classList.remove('hidden');
        reportView.classList.add('hidden');
        seccionAgregarOperacion.classList.add('hidden')

    });

    toggleBtnReport.addEventListener('click', () => {
        seccionBalances.classList.add('hidden');
        categoryView.classList.add('hidden');
        reportView.classList.remove('hidden');
        seccionAgregarOperacion.classList.add('hidden')
        

    });

    seccionBalancesLittle.addEventListener('click', () => {
        seccionBalances.classList.remove('hidden');
        categoryView.classList.add('hidden');
        reportView.classList.add('hidden');
        seccionAgregarOperacion.classList.add('hidden')
        
    });

    categoryViewLittle.addEventListener('click', () => {
        seccionBalances.classList.add('hidden');
        categoryView.classList.remove('hidden');
        reportView.classList.add('hidden');
        seccionAgregarOperacion.classList.add('hidden')
        
    });

    reportViewLittle.addEventListener('click', () => {
        seccionBalances.classList.add('hidden');
        categoryView.classList.add('hidden');
        reportView.classList.remove('hidden');
        seccionAgregarOperacion.classList.add('hidden')
        
    });
});

