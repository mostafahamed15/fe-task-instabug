import FiltersComponent from '../../components/vue-components/filters.vue';
angular
  .module('appModule')
  .controller('homeController', homePageController)
  .value('FiltersComponent', FiltersComponent);

function homePageController(Employees) {
  const homePageVm = this;
  homePageVm.employees = [];
  homePageVm.currentPage = 1;
  homePageVm.totalPages = null;
  homePageVm.clicked = false;
  homePageVm.search = '';
  homePageVm.storeAllEmployForSearch = [];
  homePageVm.url = new URL(window.location);
  activate();

  function activate() {
    Employees.getEmployees().then(({ data }) => {
      homePageVm.employees = homePageVm.employees.concat(data.employees);
      homePageVm.storeAllEmployForSearch = homePageVm.employees;
      let urlParams = new URLSearchParams(window.location.search);
      let employee = urlParams.get('employee');
      if (employee) {
        homePageVm.search = employee;
        searchFunction(homePageVm.search);
      }
    });
  }
  function searchFunction(searchKeyword) {
    homePageVm.employees = homePageVm.storeAllEmployForSearch;
    homePageVm.employees = homePageVm.employees.filter((employee) => {
      return employee.profile.name
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });
  }

  homePageVm.handleSearch = function (search) {
    homePageVm.url.searchParams.set('employee', search);
    window.history.pushState({}, '', homePageVm.url);
    if (search) {
      homePageVm.search = search;
      searchFunction(homePageVm.search);
    }
  };
  homePageVm.handleClear = function () {
    homePageVm.search = '';
    homePageVm.employees = [];
    window.history.pushState({}, '', '');
    activate();
  };
  homePageVm.loader = () => {
    if (
      homePageVm.totalPages &&
      homePageVm.totalPages === homePageVm.currentPage
    ) {
      homePageVm.clicked = false;
    } else {
      homePageVm.clicked = true;
      homePageVm.currentPage++;
      Employees.loadMoreEmployees(homePageVm.currentPage).then(({ data }) => {
        homePageVm.clicked = false;
        homePageVm.employees = homePageVm.employees.concat(data.employees);
        homePageVm.totalPages = data.pages;
        homePageVm.storeAllEmployForSearch = homePageVm.employees;
        if (homePageVm.search) {
          searchFunction(homePageVm.search);
        }
      });
    }
  };
}
