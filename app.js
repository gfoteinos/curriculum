/*
* What is left to do 
* ---------------------
*  
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
    getModulesFromTaughtModules: function() {
      let modules;
      if(localStorage.getItem('taughtModules') === null) {
        modules = [];
      } else {
        modules = JSON.parse(localStorage.getItem('taughtModules'));
      }
      return modules;
    },
    deleteTaughtModule: function(id) {
      let modules = JSON.parse(localStorage.getItem('taughtModules'));
      
      modules.forEach(function(module, index) {
        if(id === module.id) {
          modules.splice(index, 1);
        }
      });

      localStorage.setItem('taughtModules', JSON.stringify(modules));
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
      courseworks: [
        {id:0, name: 'Statistics', DueDate: '3/4/2019'},
        {id:1, name: 'Computation', DueDate: '16/5/2019'}
      ]
    }

  // Public Methods 
  return {
    getTaughtModules: function() {
      return data.taughtModules;
    },
    getModules: function() {
      return data.modules;
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
    tabModulesTaughtModules: '#taughtModules tbody',
    tabModulesTaughtModulesCheckboxes: '#taughtModules tbody .custom-control-input',
    tabModulesTaughtModulesCheckboxAll: '#tmCheckAll',
    tabModulesAddModulesCollapse: '#addModulesCollapse',
    tabModulesAddModules: '#addModulesCollapse tbody',
    tabModulesAddModulesPlusBtn: '#addModules',
    tabModulesAddModulesCheckboxes: '#addModulesCollapse tbody .custom-control-input',
    tabModulesAddModulesCheckboxAll: '#amCheckAll', 
    // Tab Courseworks calendar
    tabCourseworks: '#courseworksCalendar tbody',
    tabCourseworksDeleteBtn: '#deleteCourseworks',
    tabCourseworksCheckboxes: '#courseworksCalendar tbody .custom-control-input', 
    tabCourseworksCheckboxAll: '#cwCheckAll'
  }

  // Public Methods 
  return {
    populateTaughtModuleList: function(modules) {
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
      document.querySelector(UISelectors.tabModulesTaughtModules).innerHTML = html;
    },
    populateModuleList: function(taughtModules, modules) {
      // Initialize html var 
      html='';
 
      // Built html code for general module list
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
      document.querySelector(UISelectors.tabModulesAddModules).innerHTML = html;
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
          <td>${coursework.DueDate}</td>
          <td>
            <button type="button" class="btn btn-sm btn-primary ">
              <i class="fas fa-pencil-alt"></i>
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

      // Built html code for HTML "select" element
        // Get "Taught Module" list to fill in the "select" html element 
        const taughtModules = StorageCtrl.getModulesFromTaughtModules(); 
        
        // Building html code
        html+= `
        <tr>
          <th scope="row">#</th>
          <td>
            <select class="custom-select">
              <option selected>Select Module</option>
        `
        taughtModules.forEach(function(module, index) {
          html+=`
            <option value="${index+1}">${module.name}</option>
          `
        });
        
        html+= ` 
            </select>
          </td>
          <td>
            <label for="courseworksDate" class="sr-only">Coursework Date</label>
            <input type="date" class="form-control" id="courseworksDate">
          </td>
          <td>
            <button type="button" class="btn btn-sm btn-primary">
              <i class="fas fa-plus"></i>
            </button>
          </td>
          <td>
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="cwNew" disabled>
              <label class="custom-control-label" for="cwNew"></label>
            </div>
          </td>
        </tr>`;
        
      
      // Insert html code 
      document.querySelector(UISelectors.tabCourseworks).innerHTML = html;
    },
    addModule: function(module) {
      // Get taught module list to use it's length as index in new module
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
        document.querySelector(UISelectors.tabModulesTaughtModules).insertAdjacentElement("beforeend", tr);
    },
    // deleteTaughtModule: function(id) {
    //   const module = document.querySelector(`#${id}`);
    //   module.parentNode.parentNode.parentNode.remove();
    // },
    getCheckBoxes: function(flag) {
      // Gather checkboxes
      const addModulesCheckboxes = document.querySelectorAll(UISelectors.tabModulesAddModulesCheckboxes);
      const taughtModulesCheckboxes = document.querySelectorAll(UISelectors.tabModulesTaughtModulesCheckboxes);
      const courseworksCheckboxes = document.querySelectorAll(UISelectors.tabCourseworksCheckboxes);
      
      if (flag === 'addModules') {
        return addModulesCheckboxes;
      } else if(flag === 'taughtModules') {
        return taughtModulesCheckboxes;
      } else if(flag === 'courseworks') {
        return courseworksCheckboxes;
      }
    },
    uncheckCheckboxAll_checkbox: function(flag) {
      const addModulesCheckboxAll = document.querySelector(UISelectors.tabModulesAddModulesCheckboxAll);
      const taughtModulesCheckboxAll = document.querySelector(UISelectors.tabModulesTaughtModulesCheckboxAll);
      const courseworksCheckboxAll = document.querySelector(UISelectors.tabCourseworksCheckboxAll);
   
      if(flag === 'addModules') {
        addModulesCheckboxAll.checked = false;
      } else if(flag === 'taughtModules') {
        taughtModulesCheckboxAll.checked = false;
      } else if(flag === 'courseworks') {
        courseworksCheckboxAll.checked = false;
      }
    },
    uncheckCheckboxes: function(flag) {
      // Gather all checkboxes of the page 
      let checkboxAll = document.querySelectorAll(UISelectors.pageCheckCheckboxAll); 
      // Gather all checkboxes of "Taught Modules" list
      let taughtModulesCheckboxes = document.querySelectorAll(UISelectors.tabModulesTaughtModulesCheckboxes); 
      // Gather all checkboxes of "Add Module" list 
      let addModulesCheckboxes = document.querySelectorAll(UISelectors.tabModulesAddModulesCheckboxes); 
      
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
      }
    },
    closeModuleList: function() {
      if(document.querySelector(UISelectors.tabModulesAddModulesCollapse).classList.contains('show')) {
        document.getElementById(UISelectors.tabModulesAddModuleBtn).click(function() {
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
        document.querySelector(UISelectors.tabModulesAddModulesPlusBtn).addEventListener('click', addModule);

        // Delete module event
        document.querySelector(UISelectors.tabModulesDeleteBtn).addEventListener('click', deleteModule);

        // Check/uncheck all from "Add Modules" list event
        document.querySelector(UISelectors.tabModulesAddModulesCheckboxAll).addEventListener('click', checkUncheckAllFromAddModules);

        // Check/uncheck all from "Taught Modules" list event
        document.querySelector(UISelectors.tabModulesTaughtModulesCheckboxAll).addEventListener('click', checkUncheckAllFromTaughtModules); 

      // Tab Courseworks calendar
        // Delete coursework event
        document.querySelector(UISelectors.tabCourseworksDeleteBtn).addEventListener('click', deleteCoursework);

         // Check/uncheck all from "Courseworks Calendar" list event
         document.querySelector(UISelectors.tabCourseworksCheckboxAll).addEventListener('click', checkUncheckAllCourseworks);
    }
    
    // Modules tabs
    const selectTabCourseworks = function(e) {
      // Close module list
      UICtrl.closeModuleList();

      e.preventDefault();
    }

    // Tab Module List  
      // Add module 
      const addModule = function(e) {

        // Add checked modules to "Taught Modules" list 
          // Gather "Add Modules" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('addModules');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Update UI lists flag
          let moduleAdded = false;

          // Loop through "Add Modules" list and add checked modules to "Taught Modules" list 
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

          // Uncheck checkboxes of "Add Module" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addModules');

          if(moduleAdded) {
            // Update "Add Modules" list
              // Fetch data from local Storage 
              const taughtModuleList = StorageCtrl.getModulesFromTaughtModules();
              const moduleList = ItemCtrl.getModules(); 
              
              // Populate data    
              UICtrl.populateModuleList(taughtModuleList, moduleList);
            
            // Uncheck checkboxes of "Taught Module" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('taughtModules');

              // Uncheck all checkboxes in case of "checkbox all" was checked
              UICtrl.uncheckCheckboxes('taughtModules');

            // Populate "Courseworks calendar" list
            const courseworks = ItemCtrl.getCourseworks(); 
            UICtrl.populateCourseworks(courseworks);

            // Close "Add Module" list
            UICtrl.closeModuleList();
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
            
            // // Update data structure (update faculty module table) 
            // ItemCtrl.deleteTaughtModule(id);

            // Delete module from "taughtModule" table in storage
            StorageCtrl.deleteTaughtModule(id); 
            
            // Populate data in UI 
            const modules = StorageCtrl.getModulesFromTaughtModules();
            UICtrl.populateTaughtModuleList(modules);

            // Update UI lists flag
            moduleRemoved = true;
            }
          });

          // Uncheck checkboxes of "Add Modules" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addModules');

            // Uncheck all checkboxes in case of "checkbox all" was checked
            UICtrl.uncheckCheckboxes('addModules');

          // Uncheck checkboxes of "Taught Modules" list
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('taughtModules');          
              
          if(moduleRemoved) {
            // Update "Add Modules" list
              // Fetch data from local storage 
              const taughtModuleList = StorageCtrl.getModulesFromTaughtModules();
              const moduleList = ItemCtrl.getModules(); 
              
              // Populate data   
              UICtrl.populateModuleList(taughtModuleList, moduleList);

              // Populate "Courseworks calendar" list
              const courseworks = ItemCtrl.getCourseworks(); 
              UICtrl.populateCourseworks(courseworks);
          }

          // Close "Add Module" list
          UICtrl.closeModuleList();

        e.preventDefault();
      }

      // Check/uncheck all modules from "Add Modules" list
      const checkUncheckAllFromAddModules = function(e) {

        // Gather all checkboxes from "Add Modules" list 
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
      const checkUncheckAllFromTaughtModules = function(e) {

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
      const deleteCoursework = function(e) {
        // Delete coursework from "Courseworks calendar" list
          // Gather "Courseworks calendar" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('courseworks');

          // Convert to Array 
          checkboxes = Array.from(checkboxes);

          // Loop through "Courseworks calendar" list and delete all checked courseworks. 
          checkboxes.forEach(function(checkbox) {
            if(checkbox.checked === true) {
            // Get checked "courseworks" id 
            let checkboxID = checkbox.id;
            checkboxID = checkboxID.split('-');
            let id = checkboxID[1];
            
            // Id to number 
            id = parseInt(id);
            
            // Update data structure (update courseworks module table) 
            ItemCtrl.deleteCoursework(id);
            
            // // Delete module from "taughtModule" table in storage
            // StorageCtrl.deleteTaughtModule(id); 
            
            // Populate data in UI 
            // const modules = StorageCtrl.getModulesFromTaughtModules();
            const courseworks = ItemCtrl.getCourseworks(); 
            UICtrl.populateCourseworks(courseworks);
            }

            // Uncheck checkboxes of "Courseworks calendar" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('courseworks');  

          });

        e.preventDefault();
      }
      // Add coursework 
      // Delete coursework 


      // Check/uncheck all modules from "Courseworks" list
      const checkUncheckAllCourseworks = function(e) {

        // Gather all checkboxes from "Add Modules" list 
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



  // Public Methods 
  return {
    init: function() {
      console.log('Initialize App...');

      // Fetch data from data structure 
      const taughtModules = ItemCtrl.getTaughtModules();      
      const modules = ItemCtrl.getModules();      
      const courseworks = ItemCtrl.getCourseworks();   
      
      // Populate data in UI 
        // Modules list 
        if(taughtModules.length > 0 || modules.length > 0) {
          UICtrl.populateTaughtModuleList(taughtModules);
          UICtrl.populateModuleList(taughtModules, modules);
        }
        // Courseworks calendar
        if(courseworks.length > 0) {
          UICtrl.populateCourseworks(courseworks);
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
