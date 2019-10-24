/*
* What is left to do 
* ---------------------
* on line 87 it has to change on UISelectors the 
* ": '#'" id 
*/

// Controllers

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
      // Hardcoded data 
      facultyModules: [
          {id:0, name: 'Statistics', course: 'Mathematics', level: 'Bachelor'},
          {id:7, name: 'Computation', course: 'Artificial Inteligence', level: 'Master'},
          {id:2, name: 'Data Structures', course: 'Computing', level: 'Bachelor'},
          {id:1, name: 'Data Mining', course: 'Computing', level: 'Master'},
          {id:6, name: 'Multivariate calculus and mathematical models', course: 'Mathematics', level: 'Bachelor'}
      ],
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
      ]
    }

  // Public Methods 
  return {
    getFacultyModules: function() {
      return data.facultyModules;
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
    addModule: function(id, name, course, level) {
      // Create new Module 
      newModule = new Module(id, name, course, level)

      // Add module to faculty module array 
      data.facultyModules.push(newModule);

      return newModule;
    },
    deleteTaughtModule: function(id) {
      // Get the modules ids from data
      let ids = data.facultyModules.map(function(module) {
        return module.id;
      });

    // Find the index of deleted item
      let index = ids.indexOf(id)

    // Remove the item from data using the index above
      data.facultyModules.splice(index, 1);
    }
  }
})();

// UI controler 
const UICtrl = (function () {
  // Private var & methods 
  const UISelectors = {
    // All Page 
    pageCheckCheckboxAll: '.checkThemAll .custom-control-input',
    // Tab Modules List 
    tabModulesTaughtModules: '#taughtModules tbody',
    tabModulesTaughtModulesCheckboxes: '#taughtModules tbody .custom-control-input',
    tabModulesTaughtModulesCheckboxAll: '#taughtModulesCheckAll',
    tabModulesAddModulesCollapes: '#addModulesCollapse',
    tabModulesAddModules: '#addModulesCollapse tbody',
    tabModulesAddModuleBtn: 'addModuleCollapseBtn',
    tabModulesDeleteBtn: '#deleteModule',
    tabModulesAddModulesPlusBtn: '#add-module-btn',
    tabModulesAddModulesCheckboxes: '#addModulesCollapse tbody .custom-control-input',
    tabModulesAddModulesCheckboxAll: '#addModulesCheckAll', 
    // Tab Courseworks calendar 
    modulesTabs: '#modulesTabs'
  }

  // Public Methods 
  return {
    populateFacultyModuleList: function(modules) {
      // Initialize "HMTL" vars 
      htmlModules='';

      // Fill in the "HTML" vars with the module list 
        // Built html code for faculty module list
        modules.forEach(function(module, index) {
          // Building html code 
          htmlModules+=`<tr>
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
      
      // Insert module list 
      document.querySelector(UISelectors.tabModulesTaughtModules).innerHTML = htmlModules;
    },
    populateModuleList: function(facultyModules, modules) {
      // Initialize "HMTL" vars 
      htmlModules='';

      // Fill in the "HTML" vars with the module list 
        // Built html code for general module list
          // Get the faculty module ids  
          const facultyIDs = facultyModules.map(function(item) {
            return item.id;
          });

          modules.forEach(function(module, index) {
            // Chech if the current module is a member of faculty module list
            const foundID = facultyIDs.indexOf(module.id);

            // If it is a member then add html code with class "muted" else add without class
            if(foundID >= 0) {
              // Building html code 
              htmlModules+=`
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
              htmlModules+=`
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

      // Insert module list 
      document.querySelector(UISelectors.tabModulesAddModules).innerHTML = htmlModules;
    },
    addModule: function(module) {
      // Get faculty module list to use it's length as index in new module
      const facultyModules = ItemCtrl.getFacultyModules();

      // Build tr element
        // Create tr 
        const tr = document.createElement('tr');
        // Add HTML 
        tr.innerHTML = `
        <th scope="row">${facultyModules.length}</th>
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
    deleteTaughtModule: function(id) {
      const module = document.querySelector(`#${id}`);
      module.parentNode.parentNode.parentNode.remove();
    },
    getCheckBoxes: function(flag) {
      const addModulesCheckBoxes = document.querySelectorAll(UISelectors.tabModulesAddModulesCheckboxes);
      const taughtModulesCheckBoxes = document.querySelectorAll(UISelectors.tabModulesTaughtModulesCheckboxes);
      
      if (flag === 'addModules') {
        return addModulesCheckBoxes;
      } else if(flag === 'taughtModules') {
        return taughtModulesCheckBoxes;
      }
    },
    uncheckCheckboxAll_checkbox: function(flag) {
      const addModulesCheckboxAll = document.querySelector(UISelectors.tabModulesAddModulesCheckboxAll);
      const taughtModulesCheckboxAll = document.querySelector(UISelectors.tabModulesTaughtModulesCheckboxAll);
   
      if(flag === 'addModules') {
        addModulesCheckboxAll.checked = false;
      } else if(flag === 'taughtModules') {
        taughtModulesCheckboxAll.checked = false;
      }
    },
    uncheckCheckboxes: function(flag) {
      // Gather all checkboxes of the page 
      let checkboxAll = document.querySelectorAll(UISelectors.pageCheckCheckboxAll); 
      // Gather all checkboxes of taught modules 
      let taughtModulesCheckboxes = document.querySelectorAll(UISelectors.tabModulesTaughtModulesCheckboxes); 
      // Gather all checkboxes of module list 
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
      if(document.querySelector(UISelectors.tabModulesAddModulesCollapes).classList.contains('show')) {
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
const App = (function (ItemCtrl, UICtrl) {
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

        // Check/uncheck all modules to add event
        document.querySelector(UISelectors.tabModulesAddModulesCheckboxAll).addEventListener('click', checkUncheckAllModulesToAdd);

        // Check/uncheck all modules to delete event
        document.querySelector(UISelectors.tabModulesTaughtModulesCheckboxAll).addEventListener('click', checkUncheckAllModulesToDelete);  
    }
    
    // Add module 
    const addModule = function(e) {

      // Get UISelectors 
      const UISelectors = UICtrl.getUISelectors();

      // Add checked modules to faculty module list 
        // Gather all modules checkboxes from UI 
        let checkboxes = UICtrl.getCheckBoxes('addModules');
        
        // Convert to Array 
        checkboxes = Array.from(checkboxes);
        
        // Update UI lists 
        let moduleAdded = false;

        // Loop through module's checkboxes and add checked modules to faculty module list 
        checkboxes.forEach(function(checkbox) {
          if(checkbox.checked === true) {
          // Get checked module id 
          let checkboxID = checkbox.id;
          checkboxID = checkboxID.split('-');
          const id = parseInt(checkboxID[1]);

          // Get module from data structure (from module table)
          moduleToAdd = ItemCtrl.getModuleByID(id);

          // Update data structure (update faculty module table) 
          const newModule = ItemCtrl.addModule(moduleToAdd.id, moduleToAdd.name, moduleToAdd.course, moduleToAdd.level);

          // Update UI faculty module list 
          UICtrl.addModule(newModule);

          // Update UI lists 
          moduleAdded = true;
          }
        });

        // Uncheck checkboxes of module list 
          // Uncheck checkbox all in case of it was checked
          UICtrl.uncheckCheckboxAll_checkbox('addModules');

        if(moduleAdded) {
          // Update UI module list
            // Fetch data from data structure 
            const tabModulesTaughtModules = ItemCtrl.getFacultyModules();      
            const moduleList = ItemCtrl.getModules(); 
            
            // Populate data in UI module list    
            UICtrl.populateModuleList(tabModulesTaughtModules, moduleList);
          
          // Uncheck checkboxes of taught module list
            // Uncheck checkbox all in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('taughtModules');

            // Uncheck all checkboxes in case of "checkbox all" was checked
            UICtrl.uncheckCheckboxes('taughtModules');

          // Close module list
          UICtrl.closeModuleList();
        }
      e.preventDefault();
    };

    const deleteModule = function(e) {

      // Add checked modules to module list
        // Gather all modules checkboxes from UI 
        let checkboxes = UICtrl.getCheckBoxes('taughtModules');
        
        // Convert to Array 
        checkboxes = Array.from(checkboxes);
        
        // Update UI lists 
        let moduleRemoved = false;

        // Loop through taught modules checkboxes. When a checkbox is checked then enable the corresponding module row. 
        checkboxes.forEach(function(checkbox) {
          if(checkbox.checked === true) {
          // Get checked taught module id 
          let checkboxID = checkbox.id;
          checkboxID = checkboxID.split('-');
          let id = checkboxID[1];
          
          // Id to number 
          id = parseInt(id);
          
          // Update data structure (update faculty module table) 
          ItemCtrl.deleteTaughtModule(id);

          // Update UI faculty module list 
          UICtrl.deleteTaughtModule(checkbox.id);

          // Update UI lists 
          moduleRemoved = true;
          }
        });

        // Uncheck checkboxes of module list 
          // Uncheck checkbox all in case of it was checked
          UICtrl.uncheckCheckboxAll_checkbox('addModules');

          // Uncheck all checkboxes in case of "checkbox all" was checked
          UICtrl.uncheckCheckboxes('addModules');

        // Uncheck checkboxes of taught module list
          // Uncheck checkbox all in case of it was checked
          UICtrl.uncheckCheckboxAll_checkbox('taughtModules');          
        
        if(moduleRemoved) {
          // Update UI module list
            // Fetch data from data structure 
            const tabModulesTaughtModules = ItemCtrl.getFacultyModules();      
            const moduleList = ItemCtrl.getModules(); 

            // Populate data in UI module list    
            UICtrl.populateModuleList(tabModulesTaughtModules, moduleList);
        }

        // Close module list
        UICtrl.closeModuleList();

      e.preventDefault();
    }

    // Check/uncheck all modules to add
    const checkUncheckAllModulesToAdd = function(e) {

      // Gather all modules checkboxes from UI 
      const checkBoxes = UICtrl.getCheckBoxes('addModules');

      if(e.target.checked) {
        checkBoxes.forEach(function(module) {
          if(module.disabled === false) {
            module.checked = true;
          }
        }); 
      } else {
        checkBoxes.forEach(function(module) {
          module.checked = false;
        }); 
      }
    } 

    // Check/uncheck all modules to delete
    const checkUncheckAllModulesToDelete = function(e) {

      // Gather all modules checkboxes from UI 
      const checkBoxes = UICtrl.getCheckBoxes('taughtModules');
      
      if(e.target.checked) {
        checkBoxes.forEach(function(module) {
          if(module.disabled === false) {
            module.checked = true;
          }
        }); 
      } else {
        checkBoxes.forEach(function(module) {
          module.checked = false;
        }); 
      }
    } 

    const selectTabCourseworks = function(e) {
      // Close module list
      UICtrl.closeModuleList();

      e.preventDefault();
    }

  // Public Methods 
  return {
    init: function() {
      console.log('Initialize App...');

      // Fetch data from data structure 
      const facultyModules = ItemCtrl.getFacultyModules();      
      const modules = ItemCtrl.getModules();      

      // Populate data in UI 
      if(facultyModules.length > 0 || modules.length > 0) {
        UICtrl.populateFacultyModuleList(facultyModules);
        UICtrl.populateModuleList(facultyModules, modules);
      }

      // Uncheck checkboxesAll
      UICtrl.uncheckCheckboxes('all');

      // Load event listeners 
      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl);

// Initialize app 
App.init();
