/*
* What is left to do 
* ---------------------
*  
* Populate exams at init ok. Continue with saving exams date.
*/

// Controllers
// Storage Controler 
const StorageCtrl = (function() {
  // Private & var methods 
  
  // Public methods 
  return {
    storeTaughtModules: function(module) {
      let modules;

      if(localStorage.getItem('taughtModules') === null) {
        modules = [];
        modules.push(module);
        localStorage.setItem('taughtModules', JSON.stringify(modules));
      } else {
        modules = JSON.parse(localStorage.getItem('taughtModules'));
        modules.push(module);
        localStorage.setItem('taughtModules', JSON.stringify(modules));
      }
    },
    storeCoursework: function(coursework) {
      let courseworks;

      if(localStorage.getItem('courseworks') === null) {
        courseworks = [];
        courseworks.push(coursework);
        localStorage.setItem('courseworks', JSON.stringify(courseworks));
      } else {
        courseworks = JSON.parse(localStorage.getItem('courseworks'));
        courseworks.push(coursework);
        localStorage.setItem('courseworks', JSON.stringify(courseworks));
      }
    },
    storeExams: function(exam) {
      let exams;

      if(localStorage.getItem('exams') === null) {
        exams = [];
        exams.push(exam);
        localStorage.setItem('exams', JSON.stringify(exams));
      } else {
        exams = JSON.parse(localStorage.getItem('exams'));
        exams.push(exam);
        localStorage.setItem('exams', JSON.stringify(exams));
      }
    },
    getModulesFromTaughtModules: function() {
      let modules;
      if(localStorage.getItem('taughtModules') === null) {
        modules = [];
      } else {
        modules = JSON.parse(localStorage.getItem('taughtModules'));
      }
      return modules;
    },
    getCourseworks: function() {
      let courseworks;
      if(localStorage.getItem('courseworks') === null) {
        courseworks = [];
      } else {
        courseworks = JSON.parse(localStorage.getItem('courseworks'));
      }
      return courseworks;
    },
    deleteTaughtModule: function(id) {
      let modules = JSON.parse(localStorage.getItem('taughtModules'));
      
      modules.forEach(function(module, index) {
        if(id === module.id) {
          modules.splice(index, 1);
        }
      });

      localStorage.setItem('taughtModules', JSON.stringify(modules));
    },
    deleteCoursework: function(id) {
      let courseworks = JSON.parse(localStorage.getItem('courseworks'));
      
      courseworks.forEach(function(coursework, index) {
        if(id === coursework.id) {
          courseworks.splice(index, 1);
        }
      });

      localStorage.setItem('courseworks', JSON.stringify(courseworks));
    },
    updateCoursework: function(dueDate, id) {
      let courseworks = JSON.parse(localStorage.getItem('courseworks'));

      courseworks.forEach(function(coursework, index) {
        if(id === coursework.id) {
          coursework.dueDate = dueDate;
        }
      });
      
      localStorage.setItem('courseworks', JSON.stringify(courseworks));
    }
  }
})();

// Item controler 
const ItemCtrl = (function () {
  // Private var & methods 
    // Module Constructor
    const Module = function(id, name, course, level) {
      this.id = id;
      this.name = name;
      this.course = course;
      this.level = level;
    } 

    // Coursework Constructor
    const Coursework = function(id, name, dueDate) {
      this.id = id;
      this.name = name;
      this.dueDate = dueDate;
    } 

    // Data Structure
    const data = {
      // // Hardcoded data 
      // facultyModules: [
      //     {id:0, name: 'Statistics', course: 'Mathematics', level: 'Bachelor'},
      //     {id:7, name: 'Computation', course: 'Artificial Inteligence', level: 'Master'},
      //     {id:2, name: 'Data Structures', course: 'Computing', level: 'Bachelor'},
      //     {id:1, name: 'Data Mining', course: 'Computing', level: 'Master'},
      //     {id:6, name: 'Multivariate calculus and mathematical models', course: 'Mathematics', level: 'Bachelor'}
      // ],
      taughtModules: StorageCtrl.getModulesFromTaughtModules(),
      modules: [
          {id:0, name: 'Statistics', course: 'Mathematics', level: 'Bachelor'},
          {id:1, name: 'Data Mining', course: 'Computing', level: 'Master'},
          {id:2, name: 'Data Structures', course: 'Computing', level: 'Bachelor'},
          {id:3, name: 'Geometry', course: 'Mathematics', level: 'Bachelor'},
          {id:4, name: 'Databases', course: 'Computing', level: 'Bachelor'},
          {id:5, name: 'Analysis', course: 'Mathematics', level: 'Bachelor'},
          {id:6, name: 'Multivariate calculus and mathematical models', course: 'Mathematics', level: 'Bachelor'},
          {id:7, name: 'Computation', course: 'Artificial Inteligence', level: 'Master'},
          {id:8, name: 'Introduction to Object-Oriented Programming', course: 'Computing', level: 'Bachelor'},
          {id:9, name: 'Databases and the Web', course: 'Computing', level: 'Master'}
      ],
      // courseworks: [
      //   {id:0, name: 'Statistics', dueDate: '3/4/2019'},
      //   {id:7, name: 'Computation', dueDate: '16/5/2019'}
      // ]
      courseworks: StorageCtrl.getCourseworks()
    }

  // Public Methods 
  return {
    getTaughtModules: function() {
      return data.taughtModules;
    },
    getModules: function() {
      return data.modules;
    },
    getTaughtModuleByID: function(id) {
      let found = null;

      data.taughtModules.forEach(function(module) {
        if(module.id === id) {
          found = module;
        } 
      });

      return found;
    },
    getModuleByID: function(id) {
      let found = null;

      data.modules.forEach(function(module) {
        if(module.id === id) {
          found = module;
        } 
      });

      return found;
    },
    createModule: function(id, name, course, level) {
      // Create new Module 
      newModule = new Module(id, name, course, level)

      return newModule;
    },
    // addModule: function(module) {
    //   // Add module to faculty module array 
    //   data.facultyModules.push(newModule);
    // },
    // deleteTaughtModule: function(id) {
    //   // Get the modules ids from data
    //   let ids = data.facultyModules.map(function(module) {
    //     return module.id;
    //   });

    // // Find the index of deleted item
    //   let index = ids.indexOf(id)

    // // Remove the item from data using the index above
    //   data.facultyModules.splice(index, 1);
    // }
    createCoursework: function(id, name, dueDate) {
      // Create new Coursework 
      newCoursework = new Coursework(id, name, dueDate);

      return newCoursework;
    },
    addCoursework: function(coursework) {
      // Add coursework to "courseworks" table 
      data.courseworks.push(coursework);
    },
    deleteCoursework: function(id) {
      // Get the courseworks ids from data
      let ids = data.courseworks.map(function(coursework) {
        return coursework.id;
      });

    // Find the index of deleted item
      let index = ids.indexOf(id)

    // Remove the item from data using the index above
      data.courseworks.splice(index, 1);
    },
    updateCoursework: function(dueDate, id) {
      data.courseworks.forEach(function(coursework) {
        if(coursework.id === id) {
          coursework.dueDate = dueDate;
        } 
      });

      return data.courseworks;
    },
    getCourseworks: function() {
      return data.courseworks;
    }
  }
})();

// UI controler 
const UICtrl = (function () {
  // Private var & methods 
  const UISelectors = {
    // All Page 
      pageCheckCheckboxAll: '.checkThemAll .custom-control-input',
    // All Modules Tabs 
      modulesTabs: '#modulesTabs',
    // Tab Modules List 
      tabModulesAddModuleBtn: 'addModuleCollapseBtn',
      tabModulesDeleteBtn: '#deleteModules',
      taughtModulesTable: '#taughtModules tbody',
      taughtModulesCheckboxes: '#taughtModules tbody .custom-control-input',
      taughtModulesCheckboxAll: '#tmCheckAll',
      addModulesCollapse: '#addModulesCollapse',
      addModulesTable: '#addModulesCollapse tbody',
      allModulesCheckboxAll: '#amCheckAll', 
      addModulesCheckboxes: '#addModulesCollapse tbody .custom-control-input',
      addModulesPlusBtn: '#addModulesBtn',
    // Tab Courseworks calendar
      tabCourseworksAddCourseworkBtn: 'addCourseworksCollapseBtn',
      tabCourseworksDeleteBtn: '#deleteCourseworks',
      courseworksTable: '#courseworksTbl tbody',
      courseworksEdit: '.cwEdit',
      courseworksCheckboxAll: '#cwCheckAll',
      courseworksCheckboxes: '#courseworksTbl tbody .custom-control-input', 
      addCourseworksCollapse: '#addCourseworksCollapse',
      addCourseworksTable: '#addCourseworksTbl tbody',
      addCourseworksCheckboxAll: '#acwCheckAll',
      addCourseworksCheckboxes: '#addCourseworksTbl tbody .custom-control-input',
      addCourseworksPlusBtn: '#addCourseworksBtn',

      tabCourseworksNameInput: 'cw-name',
    // Tab Exams calendar 
      examsTable: '#examsTbl tbody',  

  }

  // Public Methods 
  return {
    populateTaughtModules: function(modules) {
      // Initialize html var 
      html='';
 
      // Built html code for "Taught Modules" list
      modules.forEach(function(module, index) {
        // Building html code 
        html+=`<tr>
        <th scope="row">${index+1}</th>
        <td>${module.name}</td>
        <td>${module.course}</td>
        <td>${module.level}</td>
        <td>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="tm-${module.id}">
            <label class="custom-control-label" for="tm-${module.id}"></label>
          </div>
        </td>
      </tr>`;
      }); 
      
      // Insert html code 
      document.querySelector(UISelectors.taughtModulesTable).innerHTML = html;
    },
    populateAllModules: function(taughtModules, modules) {
      // Initialize html var 
      html='';
 
      // Built html code for "All Modules" list
        // Get "Taught Modules" list ids  
        const taughtModulesIDs = taughtModules.map(function(item) {
          return item.id;
        });

        modules.forEach(function(module, index) {
          // Check if the current module is a member of "Taught Modules" list
          const foundID = taughtModulesIDs.indexOf(module.id);

          // If it is a member then add html code with class "muted" else add without class
          if(foundID >= 0) {
            // Building html code 
            html+=`
            <tr class="text-muted">
              <th scope="row">${index+1}</th>
              <td>${module.name}</td>
              <td>${module.course}</td>
              <td>${module.level}</td>
              <td>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="item-${module.id}" disabled>
                  <label class="custom-control-label" for="item-${module.id}"></label>
                </div>
              </td>
            </tr>`;
          } else {
            // Building html code 
            html+=`
            <tr>
              <th scope="row">${index+1}</th>
              <td>${module.name}</td>
              <td>${module.course}</td>
              <td>${module.level}</td>
              <td>
                <div class="custom-control custom-checkbox">
                  <input type="checkbox" class="custom-control-input" id="item-${module.id}">
                  <label class="custom-control-label" for="item-${module.id}"></label>
                </div>
              </td>
            </tr>`;
            }
        });

      // Insert html code 
      document.querySelector(UISelectors.addModulesTable).innerHTML = html;
    },
    populateCourseworks: function(courseworks) {
      // Initialize html var 
      html='';
 
      // Built html code for "Courseworks calendar" list
      courseworks.forEach(function(coursework, index) {
        // Building html code 
        html+=`
        <tr>
          <th scope="row">${index+1}</th>
          <td>${coursework.name}</td>
          <td>
            <label for="cwDate-${coursework.id}" class="sr-only">Coursework Date</label>
            <input style="display: none" type="date" class="form-control" id="cwDate-${coursework.id}">
            ${coursework.dueDate}
          </td>
          <td>
            <button id="cwEdit-${coursework.id}" type="button" class="btn btn-sm btn-primary">
              <i class="fas fa-pencil-alt cwEdit"></i>
            </button>
            <button style="display: none" type="button" class="btn btn-sm btn-success">
              <i class="fas fa-save cwSave"></i>
            </button>
          </td>
          <td>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cw-${coursework.id}">
              <label class="custom-control-label" for="cw-${coursework.id}"></label>
            </div>
          </td>
        </tr>`;
      }); 
      
      // Insert html code 
      document.querySelector(UISelectors.courseworksTable).innerHTML = html;
    },
    populateAddCourseworks: function(courseworks, taughtModules) {
      // Initialize html var 
      html='';

      // Built html code for "Add Courseworks" list
      // Get "Taught Modules" list ids  
      const courseworksIDs = courseworks.map(function(item) {
        return item.id;
      });

      taughtModules.forEach(function(module, index) {
        // Check if the current coursework is a member of "Taught Modules" list
        const foundID = courseworksIDs.indexOf(module.id);

        // If it is a member then add html code with class "muted" else add without class
        if(foundID >= 0) {
          // Building html code 
          html+=`
          <tr class="text-muted">
            <th scope="row">${index+1}</th>
            <td>${module.name}</td>
            <td>
              <label for="acwDate-${module.id}" class="sr-only">Coursework Date</label>
              <input type="date" class="form-control" id="acwDate-${module.id}" disabled>
            </td>
            <td>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="acw-${module.id}" disabled>
                <label class="custom-control-label" for="acw-${module.id}"></label>
              </div>
            </td>
          </tr>`;
        } else {
          // Building html code 
          html+=`
          <tr>
            <th scope="row">${index+1}</th>
            <td>${module.name}</td>
            <td>
              <label for="acwDate-${module.id}" class="sr-only">Coursework Date</label>
              <input type="date" class="form-control" id="acwDate-${module.id}">
            </td>
            <td>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="acw-${module.id}">
                <label class="custom-control-label" for="acw-${module.id}"></label>
              </div>
            </td>
          </tr>`;
          }
      });

      // Insert html code
      document.querySelector(UISelectors.addCourseworksTable).innerHTML = html;
    },
    populateExams: function(modules) {
      // Initialize html var 
      html='';

      // Built html code for "Exams calendar" list
      modules.forEach(function(module, index) {
        // Building html code 
        html+=`
        <tr>
          <th scope="row">${index+1}</th>
          <td>${module.name}</td>
          <td>
            <label for="examDate-${module.id}" class="sr-only">Coursework Date</label>
            <input type="date" class="form-control short-width" id="examDate-${module.id}">
          </td>
          <td>
            <label for="examTime-${module.id}" class="sr-only">Time</label>
            <input type="time" name="" id="examTime-${module.id}" class="form-control" min="09:00" max="18:00" size="10">
            <small class="form-text text-muted" id="examTimeHelp">9am to 6pm</small>
          </td>
          <td>
            <label for="examClass-${module.id}" class="sr-only">Class</label>
            <input type="text" name="" id="examClass-${module.id}" class="form-control short-width" maxlength="5">
            <small class="form-text text-muted" id="examClassHelp">e.g. AB12D</small>
          </td>
          <td>
            <button style="display: none" id="examEdit-${module.id}" type="button" class="btn btn-sm btn-primary">
              <i class="fas fa-pencil-alt examEdit"></i>
            </button>
            <button type="button" class="btn btn-sm btn-success">
              <i class="fas fa-save examSave"></i>
            </button>
          </td>
        </tr>`;
      });

      // Insert html code 
      document.querySelector(UISelectors.examsTable).innerHTML = html;
    },
    getCourseworkInput: function() {
      return {
        moduleID: document.getElementById(UISelectors.tabCourseworksNameInput).value
      }
    },
    addModule: function(module) {
      // Get "Taught modules" list to use it's length as index in new module
      const rowNumber = StorageCtrl.getModulesFromTaughtModules().length;

      // Build tr element
        // Create tr 
        const tr = document.createElement('tr');
        // Add HTML 
        tr.innerHTML = `
        <th scope="row">${rowNumber}</th>
        <td>${module.name}</td>
        <td>${module.course}</td>
        <td>${module.level}</td>
        <td>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="tm-${module.id}">
            <label class="custom-control-label" for="tm-${module.id}"></label>
          </div>
        </td>`;

      // Insert li element to UI 
        document.querySelector(UISelectors.taughtModulesTable).insertAdjacentElement("beforeend", tr);
    },
    // deleteTaughtModule: function(id) {
    //   const module = document.querySelector(`#${id}`);
    //   module.parentNode.parentNode.parentNode.remove();
    // },
    addCoursework: function(coursework) {
      // Get "Courseworks" list to use it's length as index in new module
      const rowNumber = ItemCtrl.getCourseworks().length;
      
      // Build tr element
        // Create tr 
        const tr = document.createElement('tr');
        // Add HTML 
        tr.innerHTML = `
        <th scope="row">${rowNumber}</th>
        <td>${coursework.name}</td>
        <td>
          <label for="cwDate-${coursework.id}" class="sr-only">Coursework Date</label>
          <input style="display: none" type="date" class="form-control" id="cwDate-${coursework.id}">
          ${coursework.dueDate}
        </td>
        <td>
          <button id="cwEdit-${coursework.id}" type="button" class="btn btn-sm btn-primary">
            <i class="fas fa-pencil-alt cwEdit"></i>
          </button>
          <button style="display: none" type="button" class="btn btn-sm btn-success">
            <i class="fas fa-save cwSave"></i>
          </button>
        </td>
        <td>
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="cw-${coursework.id}">
            <label class="custom-control-label" for="cw-${coursework.id}"></label>
          </div>
        </td>`;

      // Insert li element to UI 
        document.querySelector(UISelectors.courseworksTable).insertAdjacentElement("beforeend", tr);
    },
    // updateCoursework: function(dueDate, id) {
    //   courseworks = ItemCtrl.getCourseworks();
    //   console.log(dueDate, id);
    //   Update
    //   courseworks.forEach(function(coursework) {
    //     if(coursework.id === id) {
    //       coursework.dueDate === dueDate;
    //     } 
    //   });
    // },
    getCheckBoxes: function(flag) {
      // Gather checkboxes
      const addModulesCheckboxes = document.querySelectorAll(UISelectors.addModulesCheckboxes);
      const taughtModulesCheckboxes = document.querySelectorAll(UISelectors.taughtModulesCheckboxes);
      const courseworksCheckboxes = document.querySelectorAll(UISelectors.courseworksCheckboxes);
      const AddCourseworksCheckboxes = document.querySelectorAll(UISelectors.addCourseworksCheckboxes);
      
      if (flag === 'addModules') {
        return addModulesCheckboxes;
      } else if(flag === 'taughtModules') {
        return taughtModulesCheckboxes;
      } else if(flag === 'courseworks') {
        return courseworksCheckboxes;
      } else if(flag === 'addCourseworks') {
        return AddCourseworksCheckboxes;
      }
    },
    uncheckCheckboxAll_checkbox: function(flag) {
      const allModulesCheckboxAll = document.querySelector(UISelectors.allModulesCheckboxAll);
      const taughtModulesCheckboxAll = document.querySelector(UISelectors.taughtModulesCheckboxAll);
      const courseworksCheckboxAll = document.querySelector(UISelectors.courseworksCheckboxAll);
      const addCourseworksCheckboxAll = document.querySelector(UISelectors.addCourseworksCheckboxAll);
   
      if(flag === 'addModules') {
        allModulesCheckboxAll.checked = false;
      } else if(flag === 'taughtModules') {
        taughtModulesCheckboxAll.checked = false;
      } else if(flag === 'courseworks') {
        courseworksCheckboxAll.checked = false;
      } else if(flag === 'addCourseworks') {
        addCourseworksCheckboxAll.checked = false;
      }
    },
    uncheckCheckboxes: function(flag) {
      // Gather all checkboxes of the page 
      let checkboxAll = document.querySelectorAll(UISelectors.pageCheckCheckboxAll); 
      // Gather all checkboxes of "Taught Modules" list
      let taughtModulesCheckboxes = document.querySelectorAll(UISelectors.taughtModulesCheckboxes); 
      // Gather all checkboxes of "Add Module" list 
      let addModulesCheckboxes = document.querySelectorAll(UISelectors.addModulesCheckboxes); 
      // Gather all checkboxes of "Courseworks" list 
      let courseworksCheckboxes = document.querySelectorAll(UISelectors.courseworksCheckboxes); 
      // Gather all checkboxes of "Add Courseworks" list 
      let addCourseworksCheckboxes = document.querySelectorAll(UISelectors.addCourseworksCheckboxes); 
      
      if(flag === 'all') {
        // Convert to array 
        checkboxAll = Array.from(checkboxAll);
        
        // Loop through array to unchek all checkboxes
        checkboxAll.forEach(function(checkbox) {
          checkbox.checked = false;
        });
      } else if(flag === 'taughtModules') {
        // Convert to array 
        taughtModulesCheckboxes = Array.from(taughtModulesCheckboxes);
        
        // Loop through array to unchek all checkboxes
        taughtModulesCheckboxes.forEach(function(checkbox) {
          checkbox.checked = false;
        });
      } else if(flag === 'addModules') {
        // Convert to array 
        addModulesCheckboxes = Array.from(addModulesCheckboxes);
        
        // Loop through array to unchek all checkboxes
        addModulesCheckboxes.forEach(function(checkbox) {
          checkbox.checked = false;
        });
      } else if(flag === 'courseworks') {
        // Convert to array 
        courseworksCheckboxes = Array.from(courseworksCheckboxes);
        
        // Loop through array to unchek all checkboxes
        courseworksCheckboxes.forEach(function(checkbox) {
          checkbox.checked = false;
        });
      } else if(flag === 'addCourseworks') {
        // Convert to array 
        addCourseworksCheckboxes = Array.from(addCourseworksCheckboxes);
        
        // Loop through array to unchek all checkboxes
        addCourseworksCheckboxes.forEach(function(checkbox) {
          checkbox.checked = false;
        });
      }
    },
    closeCollapseCard: function() {
      if(document.querySelector(UISelectors.addModulesCollapse).classList.contains('show')) {
        document.getElementById(UISelectors.tabModulesAddModuleBtn).click(function() {
          $('.collapse').collapse('hide');
        });
      } else if(document.querySelector(UISelectors.addCourseworksCollapse).classList.contains('show')) {
        document.getElementById(UISelectors.tabCourseworksAddCourseworkBtn).click(function() {
          $('.collapse').collapse('hide');
        });
      }
    },
    getUISelectors: function() {
      return UISelectors;
    }
  }
})();

// Application controler 
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // Private var & methods 
    // Load event listeners 
    const loadEventListeners = function() {
      // Get UISelectors 
      const UISelectors = UICtrl.getUISelectors();
      
      // Modules tabs 
        // Select any of module tabs event 
        document.querySelector(UISelectors.modulesTabs).addEventListener('click', selectTabCourseworks);

      // Tab Module List  
        // Add module event
        document.querySelector(UISelectors.addModulesPlusBtn).addEventListener('click', addModule);

        // Delete module event
        document.querySelector(UISelectors.tabModulesDeleteBtn).addEventListener('click', deleteModule);

        // Check/uncheck all from "All Modules" list event
        document.querySelector(UISelectors.allModulesCheckboxAll).addEventListener('click', checkUncheckAllFromAllModules);

        // Check/uncheck all from "Taught Modules" list event
        document.querySelector(UISelectors.taughtModulesCheckboxAll).addEventListener('click', checkUncheckAllTaughtModules); 

      // Tab Courseworks calendar
        // Add coursework event 
        document.querySelector(UISelectors.addCourseworksPlusBtn).addEventListener('click', addCoursework);

        // Delete coursework event
        document.querySelector(UISelectors.tabCourseworksDeleteBtn).addEventListener('click', deleteCoursework);
        
        // Edit coursework event
        document.querySelector(UISelectors.courseworksTable).addEventListener('click', editCoursework);

        // Save coursework event 
        document.querySelector(UISelectors.courseworksTable).addEventListener('click', saveCoursework); 

        // Check/uncheck all from "Courseworks" list event
        document.querySelector(UISelectors.courseworksCheckboxAll).addEventListener('click', checkUncheckAllCourseworks);

        // Check/uncheck all from "Taught Modules" list event
        document.querySelector(UISelectors.addCourseworksCheckboxAll).addEventListener('click', checkUncheckAllAddCourseworks);
    }
    
    // Modules tabs
    const selectTabCourseworks = function(e) {

      // Update UI "Courseworks" list 
      const courseworks = StorageCtrl.getCourseworks();
      UICtrl.populateCourseworks(courseworks);

      // Close module list
      UICtrl.closeCollapseCard();

      e.preventDefault();
    }

    // Tab Module List  
      // Add module 
      const addModule = function(e) {

        // Add checked modules to "Taught Modules" list 
          // Gather "All Modules" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('addModules');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Update UI lists flag
          let moduleAdded = false;

          // Loop through "All Modules" list and add checked modules to "Taught Modules" list 
          checkboxes.forEach(function(checkbox) {
            if(checkbox.checked === true) {
            // Get checked module id 
            let checkboxID = checkbox.id;
            checkboxID = checkboxID.split('-');
            const id = parseInt(checkboxID[1]);

            // Get module from data structure (from module table)
            moduleToAdd = ItemCtrl.getModuleByID(id);

            // Create new module 
            const newModule = ItemCtrl.createModule(moduleToAdd.id, moduleToAdd.name, moduleToAdd.course, moduleToAdd.level);

            // // Update data structure (hardcoded data: faculty module table) 
            // ItemCtrl.addModule(newModule);

            // Store module to local storage (in "taughtModules" table) 
            StorageCtrl.storeTaughtModules(newModule);

            // Update UI "Taught Modules" list 
            UICtrl.addModule(newModule);

            // Update UI list flag
            moduleAdded = true;
            }
          });

          // Uncheck checkboxes of "All Modules" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addModules');

          if(moduleAdded) {
            // Update in tab "Modules" "All Modules" list and in tab          "Courseworks" "Taught Modules" list
              // Fetch data from local Storage 
              const taughtModules = StorageCtrl.getModulesFromTaughtModules();
              const allModules = ItemCtrl.getModules(); 
              const courseworks = StorageCtrl.getCourseworks();
              
              // Populate data    
              UICtrl.populateAllModules(taughtModules, allModules);
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
            
            // Uncheck checkboxes of "Taught Module" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('taughtModules');

              // Uncheck all checkboxes in case of "checkbox all" was checked
              UICtrl.uncheckCheckboxes('taughtModules');

            // Close "Add Module" list
            UICtrl.closeCollapseCard();
          }
        e.preventDefault();
      };

      // Delete module 
      const deleteModule = function(e) {

        // Delete module from "Taught Modules" list
          // Gather "Taught Modules" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('taughtModules');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Update UI list flag
          let moduleRemoved = false;

          // Loop through "Taught Modules" list and delete all checked modules. 
          checkboxes.forEach(function(checkbox) {
            if(checkbox.checked === true) {
            // Get checked "taught module" id 
            let checkboxID = checkbox.id;
            checkboxID = checkboxID.split('-');
            let id = checkboxID[1];
            
            // Id to number 
            id = parseInt(id);
            
            // // Delete module from data structure (taughtModule table) 
            // ItemCtrl.deleteTaughtModule(id);

            // Delete module from "taughtModule" table in storage
            StorageCtrl.deleteTaughtModule(id); 

            // Delete module from "courseworks" table in storage
            StorageCtrl.deleteCoursework(id); 
            
            // Populate data in UI 
            const modules = StorageCtrl.getModulesFromTaughtModules();
            UICtrl.populateTaughtModules(modules);

            // Update UI lists flag
            moduleRemoved = true;
            }
          });

          // Uncheck checkboxes of "All Modules" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addModules');

            // Uncheck all checkboxes in case of "checkbox all" was checked
            UICtrl.uncheckCheckboxes('addModules');

          // Uncheck checkboxes of "Taught Modules" list
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('taughtModules');          
              
          if(moduleRemoved) {
            // Update in tab "Modules" "All Modules" list and in tab          "Courseworks" "Taught Modules" list
              // Fetch data from local storage 
              const taughtModules = StorageCtrl.getModulesFromTaughtModules();
              const allModules = ItemCtrl.getModules(); 
              const courseworks = StorageCtrl.getCourseworks();

              // Populate data   
              UICtrl.populateAllModules(taughtModules, allModules);
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
          }

        // Close "All Modules" list
        UICtrl.closeCollapseCard();

        e.preventDefault();
      }

      // Check/uncheck all modules from "All Modules" list
      const checkUncheckAllFromAllModules = function(e) {

        // Gather all checkboxes from "All Modules" list 
        const checkboxes = UICtrl.getCheckBoxes('addModules');

        if(e.target.checked) {
          checkboxes.forEach(function(checkbox) {
            if(checkbox.disabled === false) {
              checkbox.checked = true;
            }
          }); 
        } else {
          checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
          }); 
        }
      } 

      // Check/uncheck all modules from "Taught Modules" list
      const checkUncheckAllTaughtModules = function(e) {

        // Gather all modules checkboxes from UI 
        const checkboxes = UICtrl.getCheckBoxes('taughtModules');
        
        if(e.target.checked) {
          checkboxes.forEach(function(checkbox) {
            if(checkbox.disabled === false) {
              checkbox.checked = true;
            }
          }); 
        } else {
          checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
          }); 
        }
      }
      
    // Tab Courseworks calendar 
      // Add coursework 
      const addCoursework = function(e) {
        // Add checked "taught modules" to "courseworks" list
          // Gather "Add Courseworks" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('addCourseworks');

          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Update UI lists flag
          let addCourseworks;

          // Check if one or more checked rows of "Add Courseworks" list has no "Due Date"  
          for(let i=0; i<checkboxes.length; i++) {
            // Get checked module id 
            let checkboxID = checkboxes[i].id;
            checkboxID = checkboxID.split('-');
            const id = parseInt(checkboxID[1]);

            // Get "Due Date" from "Add Courseworks" list 
            const courseworkDueDate = document.querySelector(`#acwDate-${id}`).value;

            if(checkboxes[i].checked === true && courseworkDueDate === '') {
              addCourseworks = false;
              break;
            }
          }
          
          // If it has no "Due Date" stop adding and inform user else add coursework 
          if(addCourseworks === false) {
            console.log('It is trying to added one or more courseworks without "Due Date". Please fill in the "Due Dates" that are missing.');
          } else {
            // Loop through "Add Courseworks" list and add checked modules to "Courseworks" list 
            checkboxes.forEach(function(checkbox) {
              if(checkbox.checked === true) {
              // Get checked module id 
              let checkboxID = checkbox.id;
              checkboxID = checkboxID.split('-');
              const id = parseInt(checkboxID[1]);
                
              // Get "taught module" id & name from data structure (from "taughtModules" table)
              courseworkID = ItemCtrl.getModuleByID(id).id;
              courseworkName = ItemCtrl.getModuleByID(id).name;
              
              // Get "Due Date" from "Add Courseworks" list 
              let courseworkDueDate = document.querySelector(`#acwDate-${id}`).value;
              
              // Convert date value to English UK short format 
              const options = { day: 'numeric',  month: 'numeric', year: 'numeric'  };
              courseworkDueDate = new Date(courseworkDueDate).toLocaleString('en-GB', options);
             
              // Create new coursework 
              const newCoursework = ItemCtrl.createCoursework(courseworkID, courseworkName, courseworkDueDate);

              // Add "coursework" to  data structure (hardcoded data: courseworks table) 
              ItemCtrl.addCoursework(newCoursework);

              // Store module to local storage (in "courseworks" table) 
              StorageCtrl.storeCoursework(newCoursework);

              // Update UI "Courseworks" list 
              const courseworks = StorageCtrl.getCourseworks();
              UICtrl.populateCourseworks(courseworks);

              // Update UI lists flag
              addCourseworks = true;
              }
            });
          }
          
          // Uncheck checkboxes of "Add Courseworks" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addCourseworks');
            
          if(addCourseworks) {
            // Update "Taught Modules" list in tab "Courseworks"
              // Fetch data from local Storage 
              const taughtModules = StorageCtrl.getModulesFromTaughtModules();
              const courseworks = StorageCtrl.getCourseworks();
              // const courseworks = ItemCtrl.getCourseworks();
            
              // Populate data    
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
            
            // Uncheck checkboxes of "Courseworks" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('courseworks');

              // Uncheck all checkboxes in case of "checkbox all" was checked
              UICtrl.uncheckCheckboxes('courseworks');
            
            // Close "Add Module" list
            UICtrl.closeCollapseCard();
          }

        e.preventDefault();
      }

      // Delete coursework 
      const deleteCoursework = function(e) {
        // Delete coursework from "Courseworks calendar" list
          // Gather "Courseworks calendar" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('courseworks');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);

          // Update UI list flag
          let courseworkRemoved = false;

          // Loop through "Courseworks calendar" list and delete all checked courseworks. 
          checkboxes.forEach(function(checkbox) {
            if(checkbox.checked === true) {
            // Get checked "courseworks" id 
            let checkboxID = checkbox.id;
            checkboxID = checkboxID.split('-');
            let id = checkboxID[1];
            
            // Id to number 
            id = parseInt(id);
            
            // // Delete coursework from data structure (courseworks table) 
            // ItemCtrl.deleteCoursework(id);

            // Delete coursework from "coursework" table in storage
            StorageCtrl.deleteCoursework(id); 

            // Populate data in UI 
            const courseworks = StorageCtrl.getCourseworks();
            // const courseworks = ItemCtrl.getCourseworks();
            UICtrl.populateCourseworks(courseworks);

            // Update UI lists flag
            courseworkRemoved = true;
            }
          });
        
        // Uncheck checkboxes of "Add Courseworks" list 
          // Uncheck "checkbox all" in case of it was checked
          UICtrl.uncheckCheckboxAll_checkbox('addCourseworks');

          // Uncheck all checkboxes in case of "checkbox all" was checked
          UICtrl.uncheckCheckboxes('addCourseworks');

        // Uncheck checkboxes of "Courseworks calendar" list
          // Uncheck "checkbox all" in case of it was checked
          UICtrl.uncheckCheckboxAll_checkbox('courseworks');  

        if(courseworkRemoved) {
          // Update "Taught Modules" list in tab "Courseworks"
            // Fetch data from local storage 
            const courseworks = StorageCtrl.getCourseworks(); 
            const taughtModules = StorageCtrl.getModulesFromTaughtModules();
            // const courseworks = ItemCtrl.getCourseworks(); 

            // Populate data
            UICtrl.populateAddCourseworks(courseworks, taughtModules);
        }
    
        // Close "Add Courseworks" list
        UICtrl.closeCollapseCard();

        e.preventDefault();
      }

      // Edit coursework 
      const editCoursework = function(e) {
        if(e.target.classList.contains('cwEdit')) {
          // Make changes in UI at "Courseworks" list 
            // Gather the UI elements
            const tableCell = e.target.parentNode.parentNode.previousSibling.previousSibling; 
            const textDate = e.target.parentNode.parentNode.previousSibling.previousSibling.lastChild;
            const datePicker = e.target.parentNode.parentNode.previousSibling.previousSibling.lastElementChild;
            const saveBtn = e.target.parentNode.parentNode.previousSibling.previousSibling.nextElementSibling.lastElementChild;
          
          // Remove text Date 
          tableCell.removeChild(textDate);

          // Remove edit button 
          e.target.parentNode.setAttribute('style', 'display: none');
          
          // Display date picker 
          datePicker.setAttribute('style', 'display: block');

          // Display save button 
          saveBtn.setAttribute('style', 'display: block');
        }
        
        // e.preventDefault();
      }

      // Save coursework 
      const saveCoursework = function(e) {
        if(e.target.classList.contains('cwSave')) {
          const element = e.target.parentNode.parentNode.previousSibling.previousSibling
          
          // Get "id" & "Due Date" from coursework  
            // Get id  
            let cwID = e.target.parentNode.parentNode.previousSibling.previousSibling.lastElementChild.id;
            const cwIDArr = cwID.split('-');
            const id = parseInt(cwIDArr[1]);

            // Get "Due Date" 
            let courseworkDueDate = document.querySelector(`#${cwID}`).value;

            // Convert date value to English UK short format 
            const options = { day: 'numeric',  month: 'numeric', year: 'numeric'  };
            dueDate = new Date(courseworkDueDate).toLocaleString('en-GB', options);
          
          if(dueDate === '' || dueDate ==='Invalid Date') {
            console.log('It is trying to update coursework without "Due Date". Please fill in the "Due Dates".');
          } else {
            // Update coursework in data structure 
            StorageCtrl.updateCoursework(dueDate, id);
            // Get courseworks from local storage 
            const courseworks = StorageCtrl.getCourseworks();
            // Populate courseworks 
            UICtrl.populateCourseworks(courseworks);
          }
        }

        // e.preventDefault();
      }

      // Check/uncheck all modules from "Courseworks" list
      const checkUncheckAllCourseworks = function(e) {

        // Gather all checkboxes from "All Modules" list 
        const checkboxes = UICtrl.getCheckBoxes('courseworks');
        
        if(e.target.checked) {
          checkboxes.forEach(function(checkbox) {
            if(checkbox.disabled === false) {
              checkbox.checked = true;
            }
          }); 
        } else {
          checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
          }); 
        }
      } 

      // Check/uncheck all modules from "Add Courseworks" list
      const checkUncheckAllAddCourseworks = function(e) {

        // Gather all checkboxes from "Add Courseworks" list 
        const checkboxes = UICtrl.getCheckBoxes('addCourseworks');
        
        if(e.target.checked) {
          checkboxes.forEach(function(checkbox) {
            if(checkbox.disabled === false) {
              checkbox.checked = true;
            }
          }); 
        } else {
          checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
          }); 
        }
      } 

  // Public Methods 
  return {
    init: function() {
      console.log('Initialize App...');

      // Fetch data from data structure 
      const taughtModules = ItemCtrl.getTaughtModules();      
      const allModules = ItemCtrl.getModules();      
      const courseworks = ItemCtrl.getCourseworks();   
      
      // Populate data in UI 
        // Modules list 
        if(taughtModules.length > 0 || allModules.length > 0) {
          UICtrl.populateTaughtModules(taughtModules);
          UICtrl.populateAllModules(taughtModules, allModules);
          UICtrl.populateExams(taughtModules);
        }
        // Courseworks calendar
        if(courseworks.length > 0 || taughtModules.length > 0) {
          UICtrl.populateCourseworks(courseworks);
          UICtrl.populateAddCourseworks(courseworks, taughtModules);
        }
        // Exams calendar

        // Modules grades 

      // Uncheck checkboxesAll
      UICtrl.uncheckCheckboxes('all');

      // Load event listeners 
      loadEventListeners();
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize app 
App.init();
