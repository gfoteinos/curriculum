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
    }
  }
})();

// UI controler 
const UICtrl = (function () {
  // Private var & methods 
  const UISelectors = {
    facultyModuleList: '#taughtModules tbody',
    moduleList: '#addModulesCollapse tbody',
    addModuleBtn: '#add-module-btn',
    moduleListCheckBoxes: '#addModulesCollapse .custom-control-input'
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
              <input type="checkbox" class="custom-control-input" id="${module.id}">
              <label class="custom-control-label" for="${module.id}"></label>
            </div>
          </td>
        </tr>`;
        }); 
      
      // Insert module list 
      document.querySelector(UISelectors.facultyModuleList).innerHTML = htmlModules;
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
      document.querySelector(UISelectors.moduleList).innerHTML = htmlModules;
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
            <input type="checkbox" class="custom-control-input" id="${module.id}">
            <label class="custom-control-label" for="${module.id}"></label>
          </div>
        </td>`;

      // Insert li element to UI 
        document.querySelector(UISelectors.facultyModuleList).insertAdjacentElement("beforeend", tr);
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
   
      // Add module event
      document.querySelector(UISelectors.addModuleBtn).addEventListener('click', addModule);
    }
    
    // Add module 
    const addModule = function(e) {
      // Add checked modules to faculty module list 
        // Gather all modules 
        let modules = document.querySelectorAll('#addModulesCollapse .custom-control-input');

        // Convert to Array 
        modules = Array.from(modules);

        // Loop through modules and add checked modules to faculty module list 
        modules.forEach(function(module) {
          if(module.checked == true) {
          // Get checked module id 
          let moduleID = module.id;
          moduleID = moduleID.split('-');
          const id = parseInt(moduleID[1]);

          // Get module from data structure (from module table)
          moduleToAdd = ItemCtrl.getModuleByID(id);

          // Update data structure (update faculty module table) 
          const newModule = ItemCtrl.addModule(moduleToAdd.id, moduleToAdd.name, moduleToAdd.course, moduleToAdd.level);

          // Update UI faculty module list 
          UICtrl.addModule(newModule);
          }
        });

      // Update UI module list in new state
        // Fetch data from data structure 
        const facultyModuleList = ItemCtrl.getFacultyModules();      
        const moduleList = ItemCtrl.getModules(); 
        
        // Populate data in UI module list    
        UICtrl.populateModuleList(facultyModuleList, moduleList);

        // Close module list table
        document.getElementById('addModule').click(function() {
          $('.collapse').collapse('hide');
        });

      e.preventDefault();
    };

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

      // Load event listeners 
      loadEventListeners();

    }
  }
})(ItemCtrl, UICtrl);

// Initialize app 
App.init();
