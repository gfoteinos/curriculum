/*
* What is left to do 
* ---------------------
* It has to be added message for update coursework
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
    storeExam: function(exam) {
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
    getTaughtModules: function() {
      let modules;
      if(localStorage.getItem('taughtModules') === null) {
        modules = [];
      } else {
        modules = JSON.parse(localStorage.getItem('taughtModules'));
      }
      return modules;
    },
    getTaughtModuleByID: function(id) {
      let found = null;
      const taughtModules = JSON.parse(localStorage.getItem('taughtModules'));
      
      taughtModules.forEach(function(module) {
        if(module.id === id) {
          found = module;
        } 
      });

      return found;
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
    getExams: function() {
      let exams;
      if(localStorage.getItem('exams') === null) {
        exams = [];
      } else {
        exams = JSON.parse(localStorage.getItem('exams'));
      }
      return exams;
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
    deleteExam: function(id) {
      let exams = JSON.parse(localStorage.getItem('exams'));
      
      exams.forEach(function(exam, index) {
        if(id === exam.id) {
          exams.splice(index, 1);
        }
      });

      localStorage.setItem('exams', JSON.stringify(exams));
    },
    updateCoursework: function(dueDate, id) {
      let courseworks = JSON.parse(localStorage.getItem('courseworks'));

      courseworks.forEach(function(coursework, index) {
        if(id === coursework.id) {
          coursework.dueDate = dueDate;
        }
      });
      
      localStorage.setItem('courseworks', JSON.stringify(courseworks));
    },
    updateExam: function(date, time, classroom, id) {
      let exams = JSON.parse(localStorage.getItem('exams'));

      exams.forEach(function(exam, index) {
        if(id === exam.id) {
          exam.date = date;
          exam.time = time;
          exam.classroom = classroom;
        }
      });
      
      localStorage.setItem('exams', JSON.stringify(exams));
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

    // Exam Constructor
    const Exam = function(id, name, date, time, classroom) {
      this.id = id;
      this.name = name;
      this.date = date;
      this.time = time;
      this.classroom = classroom;
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
      taughtModules: StorageCtrl.getTaughtModules(),
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
      courseworks: StorageCtrl.getCourseworks(),
      exams: StorageCtrl.getExams()
    }

  // Public Methods 
  return {
    createModule: function(id, name, course, level) {
      // Create new Module 
      newModule = new Module(id, name, course, level)

      return newModule;
    },
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
    },
    createExam: function(id, name, date, time, classroom) {
      // Create new Exam 
      newExam = new Exam(id, name, date, time, classroom,);

      return newExam;
    },
    getExams: function() {
      return data.exams;
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
      tabTaughtModules: '#taughtModules',
      tabModulesAddModuleBtn: 'addModuleCollapseBtn',
      tabModulesDeleteBtn: '#deleteModules',
      tabTaughtModulesResponsiveTable: '#taughtModules > .table-responsive',
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
      tabCourseworks: '#courseworksCalendar',
      tabCourseworksResponsiveTable: '#courseworksCalendar > .table-responsive',
      courseworksTable: '#courseworksTbl tbody',
      courseworksCheckboxAll: '#cwCheckAll',
      courseworksCheckboxes: '#courseworksTbl tbody .custom-control-input', 
      addCourseworksCollapse: '#addCourseworksCollapse',
      addCourseworksCollapseCard: '#addCourseworksCollapse > .card',
      addCourseworksTable: '#addCourseworksTbl tbody',
      addCourseworksCheckboxAll: '#acwCheckAll',
      addCourseworksCheckboxes: '#addCourseworksTbl tbody .custom-control-input',
      addCourseworksPlusBtn: '#addCourseworksBtn',

      tabCourseworksNameInput: 'cw-name',
    // Tab Exams calendar 
      examsCalendar: '#examsCalendar',
      examsCalendarTable: '#examsCalendar > .table-responsive',
      examsTable: '#examsTbl tbody'

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
    populateExams: function(exams, taughtModules) {
      // Initialize html var 
      html='';

      // Built html code for "Exams" list
        // Populate exams (that has already set)
        exams.forEach(function(exam, index) {
          // Building html code 
          html+=`
          <tr>
            <th scope="row">${index+1}</th>
            <td>${exam.name}</td>
            <td>
              <label for="examDate-${exam.id}" class="sr-only">Coursework Date</label>
              <input type="date" class="form-control short-width" id="examDate-${exam.id}">
              <spam id="examDateText-${exam.id}">${exam.date}</spam>
            </td>
            <td>
              <label for="examTime-${exam.id}" class="sr-only">Time</label>
              <input type="time" name="" id="examTime-${exam.id}" class="form-control" min="09:00" max="18:00" size="10">
              <small class="form-text text-muted" id="examTimeHelp-${exam.id}">9am to 6pm</small>
              <spam id="examTimeText-${exam.id}">${exam.time}</spam>
            </td>
            <td>
              <label for="examClass-${exam.id}" class="sr-only">Class</label>
              <input type="text" name="" id="examClass-${exam.id}" class="form-control short-width" maxlength="5">
              <small class="form-text text-muted" id="examClassHelp-${exam.id}">e.g. AB12D</small>
              <spam id="examClassText-${exam.id}">${exam.classroom}</spam>
            </td>
            <td>
              <button id="examAddBtn-${exam.id}" type="button" class="btn btn-sm btn-primary">
                <i class="fas fa-plus examAdd"></i>
              </button>
              <button id="examEditBtn-${exam.id}" type="button" class="btn btn-sm btn-primary">
                <i class="fas fa-pencil-alt examEdit"></i>
              </button>
              <button id="examSaveBtn-${exam.id}" type="button" class="btn btn-sm btn-success">
                <i class="fas fa-save examSave"></i>
              </button>
            </td>
          </tr>`;
        });

        // Populate exams (that has to be set)
          // Get "Exams" list ids  
          const examsIDs = exams.map(function(item) {
            return item.id;
          });
  
          taughtModules.forEach(function(module, index) {
            // Check if the current module is a member of "Exams" list
            const foundID = examsIDs.indexOf(module.id);

            // If it is not a member then add html code to fill in data 
            if(foundID < 0) {
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
                  <small class="form-text text-muted" id="examTimeHelp-${module.id}">9am to 6pm</small>
                </td>
                <td>
                  <label for="examClass-${module.id}" class="sr-only">Class</label>
                  <input type="text" name="" id="examClass-${module.id}" class="form-control short-width" maxlength="5">
                  <small class="form-text text-muted" id="examClassHelp-${module.id}">e.g. AB12D</small>
                </td>
                <td>
                  <button id="examAddBtn-${module.id}" type="button" class="btn btn-sm btn-primary">
                    <i class="fas fa-plus examAdd"></i>
                  </button>
                  <button id="examEditBtn-${module.id}" type="button" class="btn btn-sm btn-primary">
                    <i class="fas fa-pencil-alt examEdit"></i>
                  </button>
                  <button id="examSaveBtn-${module.id}" type="button" class="btn btn-sm btn-success">
                    <i class="fas fa-save examSave"></i>
                  </button>
                </td>
              </tr>`;
            } 
          });

      // Insert html code 
      document.querySelector(UISelectors.examsTable).innerHTML = html;

      // Reshort "Exams" list 
        // Get "Exams" list rows
        let examsRows = document.querySelectorAll('#examsTbl tbody > tr'); 

        // Convert to array 
        examsRows = Array.from(examsRows);
        
        // Loop through "Exams" list and reshort 
        examsRows.forEach(function(exam, index) {
          exam.firstElementChild.innerHTML = index+1;
        });

      //Show/hide HTML elements according to "already set" or "to be set" state 
        taughtModules.forEach(function(module) {
          // Check if the current module is a member of "Exams" list
          const foundID = examsIDs.indexOf(module.id);
          
          // If it is a member it means it is on "already set" state thus hide all elements that needs for fill in input data & all buttons ecxept edit" button. Else means that it is on "to be set" state thus show "plus" button and hide the others.
          if(foundID >= 0) {
            // Hide input elements 
            document.querySelector(`#examDate-${module.id}`).style.display = 'none';
            document.querySelector(`#examTime-${module.id}`).style.display = 'none';
            document.querySelector(`#examTimeHelp-${module.id}`).style.display = 'none';
            document.querySelector(`#examClass-${module.id}`).style.display = 'none';
            document.querySelector(`#examClassHelp-${module.id}`).style.display = 'none';
            document.querySelector(`#examAddBtn-${module.id}`).style.display = 'none';
            document.querySelector(`#examSaveBtn-${module.id}`).style.display = 'none';
          } else {
            document.querySelector(`#examAddBtn-${module.id}`).style.display = 'block';
            document.querySelector(`#examSaveBtn-${module.id}`).style.display = 'none';
            document.querySelector(`#examEditBtn-${module.id}`).style.display = 'none';
          }
        });
    },
    getCourseworkInput: function() {
      return {
        moduleID: document.getElementById(UISelectors.tabCourseworksNameInput).value
      }
    },
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
    },
    showAlert: function(message, className, position) {
      // Add in UI
        // Create alert
          // Create <div> element
          const div = document.createElement('div');
          // Add classes to <div>
          div.className = `alert alert-${className}`;
          // Add text to <div>
          // div.appendChild(document.createTextNode(message));
          div.innerHTML = message;

        // Initialize position vars  
        let parent = '';
        let sibling = '';
        // Put the "alert" in spesific position
        if(position === 'exams calendar') {
          // Get the parent element <div>
          parent = document.querySelector(UISelectors.examsCalendar);
          // Get the sibling element <form>
          sibling = document.querySelector(UISelectors.examsCalendarTable);
        } else if(position === 'courseworks calendar' && message === "It is trying to added one or more courseworks without <b>Due Date</b>. Please fill in the <b>Due Dates</b> that are missing.") {
          // Get the parent element <div>
          parent = document.querySelector(UISelectors.addCourseworksCollapse);
          // Get the sibling element <form>
          sibling = document.querySelector(UISelectors.addCourseworksCollapseCard);
        } else if(position === 'courseworks calendar') {
          // Get the parent element <div>
          parent = document.querySelector(UISelectors.tabCourseworks);
          // Get the sibling element <form>
          sibling = document.querySelector(UISelectors.tabCourseworksResponsiveTable);
        } else if(position === 'modules list') {
          // Get the parent element <div>
          parent = document.querySelector(UISelectors.tabTaughtModules);
          // Get the sibling element <form>
          sibling = document.querySelector(UISelectors.tabTaughtModulesResponsiveTable);
        } 

        //Put the alert above <sibling> inside of parent
        parent.insertBefore(div, sibling);
  
      // Alert timeout
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 5000);
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

        // Delete module trigger modal event
        document.querySelector(UISelectors.tabModulesDeleteBtn).addEventListener('click', deleteModuleTriggerModal);
        
        // Cancel delete module trigger modal event
        document.querySelector('#cancelDeleteModulesModalBtn').addEventListener('click', cancelDeleteModuleTriggerModal);

        // Delete modules event
        document.querySelector('#deleteModulesModalBtn').addEventListener('click', deleteModules);

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

      // Tab Exams 
        //Add exam event
        document.querySelector(UISelectors.examsTable).addEventListener('click', addExam);

        //Edit exam event
        document.querySelector(UISelectors.examsTable).addEventListener('click', editExam);
        
        //Edit exam event
        document.querySelector(UISelectors.examsTable).addEventListener('click', updateExam);

    }
    
    // Modules tabs
      const selectTabCourseworks = function(e) {

        // Update "Courseworks" list in UI 
          // Get data from local storage 
          const courseworks = StorageCtrl.getCourseworks();
          // Populate data 
          UICtrl.populateCourseworks(courseworks);

        // Update "Exams" list in UI
          // Get data from local storage 
          const taughtModules = StorageCtrl.getTaughtModules();
          const exams = StorageCtrl.getExams();
          // Populate data
          UICtrl.populateExams(exams, taughtModules);

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

            // Update UI list flag
            moduleAdded = true;
            }
          });

          // Uncheck checkboxes of "All Modules" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addModules');

          if(moduleAdded) {
            /* Update UI Lists 
            * -----------------
            *  in tab "Modules"     : "Taught Modules" & "All Modules" list
            *  in tab "Courseworks" : "Taught Modules" list
            *  in tab "Exams"       : "Exams" list */

            // Update in tab "Modules" "All Modules" list and in tab          "Courseworks" "Taught Modules" list
              // Fetch data from local Storage 
              const taughtModules = StorageCtrl.getTaughtModules();
              const allModules = ItemCtrl.getModules(); 
              const courseworks = StorageCtrl.getCourseworks();
              const exams = StorageCtrl.getExams();

              // Populate data
              UICtrl.populateTaughtModules(taughtModules);    
              UICtrl.populateAllModules(taughtModules, allModules);
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
              UICtrl.populateExams(exams, taughtModules);

            // Uncheck checkboxes of "Taught Module" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('taughtModules');

              // Uncheck all checkboxes in case of "checkbox all" was checked
              UICtrl.uncheckCheckboxes('taughtModules');

            // Close "Add Module" list
            UICtrl.closeCollapseCard();

            // Show 'success' alert 
              const message = "One or more modules <b>added</b> successfully"
              const className = 'success'
              const position = 'modules list'
              UICtrl.showAlert(message, className, position);
          }
        e.preventDefault();
      };

      // Delete module Trigger Modal
      const deleteModuleTriggerModal = function(e) {

        // Check if a module is checked for deletion & trigger modal respectively
          // Gather "Taught Modules" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('taughtModules');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Initialize remove flag 
          let removeModule = false;
          for(let i=0; i<checkboxes.length; i++) {
            if(checkboxes[i].checked === true) {
              // Fire remove flag 
              removeModule = true;
            }
          }
          
        if(removeModule) {
          $('#deleteModulesModal').modal('show');
        } else {
          // Close "All Modules" list
          UICtrl.closeCollapseCard();
        }

        e.preventDefault();
      }

      // Cancel delete module Trigger Modal
      const cancelDeleteModuleTriggerModal = function(e) {
        
        // Uncheck all modules 
        checkUncheckAllTaughtModules(e);

        // Close "All Modules" list
        UICtrl.closeCollapseCard();

        e.preventDefault();
      }

      // Delete modules 
      const deleteModules = function(e) {

        // Delete module from "Taught Modules" list
          // Gather "Taught Modules" list checkboxes from UI 
          let checkboxes = UICtrl.getCheckBoxes('taughtModules');
          
          // Convert to Array 
          checkboxes = Array.from(checkboxes);
          
          // Update UI list flag
          let moduleRemoved = false;

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

            // Delete coursework from "courseworks" table in storage
              // Fetch courseworks from local storage  
              const courseworks = StorageCtrl.getCourseworks();
              if(courseworks.length > 0) {
                StorageCtrl.deleteCoursework(id); 
              }

            // Delete exam from "exams" table in storage
              // Fetch exams from local storage  
              const exams = StorageCtrl.getExams();
              if(exams.length > 0) {
                StorageCtrl.deleteExam(id); 
              }
            
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
            /* Update UI Lists 
            * -----------------
            *  in tab "Modules"     : "Taught Modules" & "All Modules" list
            *  in tab "Courseworks" : "Courseworks" & "Taught Modules" list
            *  in tab "Exams"       : "Exams" list */

              // Fetch data from local storage 
              const taughtModules = StorageCtrl.getTaughtModules();
              const allModules = ItemCtrl.getModules(); 
              const courseworks = StorageCtrl.getCourseworks();
              const exams = StorageCtrl.getExams();
              
              // Populate data   
              UICtrl.populateTaughtModules(taughtModules);
              UICtrl.populateAllModules(taughtModules, allModules);
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
              UICtrl.populateExams(exams, taughtModules);
            
            // Show 'success' alert 
              const message = "One or more modules <b>deleted</b> successfully"
              const className = 'success'
              const position = 'modules list'
              UICtrl.showAlert(message, className, position);
          }

        // Close "All Modules" list
        UICtrl.closeCollapseCard();
        
        // Hide modal 
        $('#deleteModulesModal').modal('toggle');

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

          // Check if one or more checked rows of "Taught Modules" list has no "Due Date"  
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
            // Show 'warning' alert 
              const message = "It is trying to added one or more courseworks without <b>Due Date</b>. Please fill in the <b>Due Dates</b> that are missing."
              const className = 'warning'
              const position = 'courseworks calendar'
              UICtrl.showAlert(message, className, position);
          } else {
          // Add coursework 
            // Loop through "Taught Modules" list and add checked modules to "Courseworks" list 
            checkboxes.forEach(function(checkbox) {
              if(checkbox.checked === true) {
              // Get checked module id 
              let checkboxID = checkbox.id;
              checkboxID = checkboxID.split('-');
              const id = parseInt(checkboxID[1]);
                
              // Get "taught module" id & name from data structure (from "taughtModules" table)
              courseworkID = ItemCtrl.getModuleByID(id).id;
              courseworkName = ItemCtrl.getModuleByID(id).name;
              
              // Get "Due Date" from "Taught Modules" list 
              let courseworkDueDate = document.querySelector(`#acwDate-${id}`).value;
              
              // Convert date value to English UK short format 
              const options = { day: 'numeric',  month: 'numeric', year: 'numeric'  };
              courseworkDueDate = new Date(courseworkDueDate).toLocaleString('en-GB', options);
             
              // Create new coursework 
              const newCoursework = ItemCtrl.createCoursework(courseworkID, courseworkName, courseworkDueDate);

              // Add "coursework" to  data structure (hardcoded data: courseworks table) 
              // ItemCtrl.addCoursework(newCoursework);

              // Store module to local storage (in "courseworks" table) 
              StorageCtrl.storeCoursework(newCoursework);

              // Update UI lists flag
              addCourseworks = true;
              }
            });
          }
          
          // Uncheck checkboxes of "Add Courseworks" list 
            // Uncheck "checkbox all" in case of it was checked
            UICtrl.uncheckCheckboxAll_checkbox('addCourseworks');
            
          if(addCourseworks) {
            /* Update UI Lists 
            * -----------------
            *  in tab "Courseworks" : "Courseworks" & "Taught Modules" list */

              // Fetch data from local Storage 
              const taughtModules = StorageCtrl.getTaughtModules();
              const courseworks = StorageCtrl.getCourseworks();
            
              // Populate data 
              UICtrl.populateCourseworks(courseworks);   
              UICtrl.populateAddCourseworks(courseworks, taughtModules);
            
            // Uncheck checkboxes of "Courseworks" list
              // Uncheck "checkbox all" in case of it was checked
              UICtrl.uncheckCheckboxAll_checkbox('courseworks');

              // Uncheck all checkboxes in case of "checkbox all" was checked
              UICtrl.uncheckCheckboxes('courseworks');
            
            // Close "Add Module" list
            UICtrl.closeCollapseCard();

            // Show 'success' alert 
              const message = "One or more courseworks <b>added</b> successfully"
              const className = 'success'
              const position = 'courseworks calendar'
              UICtrl.showAlert(message, className, position);
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
            const taughtModules = StorageCtrl.getTaughtModules();
            // const courseworks = ItemCtrl.getCourseworks(); 

            // Populate data
            UICtrl.populateAddCourseworks(courseworks, taughtModules);

          // Show 'success' alert 
            const message = "One or more courseworks <b>deleted</b> successfully"
            const className = 'success'
            const position = 'courseworks calendar'
            UICtrl.showAlert(message, className, position);
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
          // Get "id" & "Due Date" from coursework  
            // Get "date picker" id  
            let cwID = e.target.parentNode.parentNode.previousSibling.previousSibling.lastElementChild.id;
            const cwIDArr = cwID.split('-');
            const id = parseInt(cwIDArr[1]);
            
            // Get "Due Date" 
            let courseworkDueDate = document.querySelector(`#${cwID}`).value;

            // Convert date value to English UK short format 
            const options = { day: 'numeric',  month: 'numeric', year: 'numeric'  };
            dueDate = new Date(courseworkDueDate).toLocaleString('en-GB', options);
          
          if(dueDate === '' || dueDate ==='Invalid Date') {
            // Show 'warning' alert 
              const message = "It is trying to update coursework without <b>Due Date</b>. Please fill in a <b>Due Date</b>."
              const className = 'warning'
              const position = 'courseworks calendar'
              UICtrl.showAlert(message, className, position);
          } else {
            // Update coursework in local storage 
            StorageCtrl.updateCoursework(dueDate, id);

            // Update coursework in UI 
              // Get courseworks from local storage 
              const courseworks = StorageCtrl.getCourseworks();
              // Populate courseworks 
              UICtrl.populateCourseworks(courseworks);
            
            // Show 'success' alert 
              const message = "Coursework <b>updated</b> successfully."
              const className = 'success'
              const position = 'courseworks calendar'
              UICtrl.showAlert(message, className, position);
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

    // Tab exams calendar
      const addExam = function(e) {
        if(e.target.classList.contains('examAdd')) {
          // Get button id which is the same with module id
          const addBtnID = e.target.parentNode.id;
          const idArr = addBtnID.split('-');
          const id = parseInt(idArr[1]);

          // Get values from input elements 
            // Get Date 
            const dateID = e.target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.lastElementChild.id;
            let examDate = document.querySelector(`#${dateID}`).value;

            // Convert date value to English UK short format 
            const options = {day: 'numeric',  month: 'numeric', year: 'numeric'};
            examDate = new Date(examDate).toLocaleString('en-GB', options);

            // Get Time 
            const timeID = e.target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstElementChild.nextElementSibling.id;
            const examTime = document.querySelector(`#${timeID}`).value;

            // Get Class 
            const classID = e.target.parentNode.parentNode.previousSibling.previousSibling.firstElementChild.nextElementSibling.id;
            const examClass = document.querySelector(`#${classID}`).value;
 
          // Check if one or more inputs are empty. If empty inform the user
          // else add exam 
          if(examDate === '' || examDate === 'Invalid Date' || examTime === '' || examClass === '') {
            // Show 'warning' alert 
              const message = "It's seems <b>one or more inputs are empty</b>. Please fill in all inputs elements."
              const className = 'warning'
              const position = 'exams calendar'
              UICtrl.showAlert(message, className, position);
          } else {
          // Add exam 
            // Get "exam" id & "exam" name from "taught module" in local storage (Both of them has the same id & name) 
              examID = StorageCtrl.getTaughtModuleByID(id).id;
              examName = StorageCtrl.getTaughtModuleByID(id).name;
            
            // Create new exam
            const newExam = ItemCtrl.createExam(examID, examName, examDate, examTime, examClass);

            // Store exam to local storage (in "exams" table) 
            StorageCtrl.storeExam(newExam);

            // Update UI "Exams" list
              // Get data from local storage 
              const exams = StorageCtrl.getExams();
              const taughModules = StorageCtrl.getTaughtModules();
              // Populate data 
              UICtrl.populateExams(exams, taughModules);
            
            // Show 'Success' alert 
              const message = "Exam <b>added</b> successfully"
              const className = 'success'
              const position = 'exams calendar'
              UICtrl.showAlert(message, className, position);
          }
        }
      }

      const editExam = function(e) {
        if(e.target.classList.contains('examEdit')) {
          // Get button id which is the same with module id 
          const editBtnID = e.target.parentNode.id;
          const idArr = editBtnID.split('-');
          const id = parseInt(idArr[1]);

          // Hide "already set" state HTML elements & buttons
          document.querySelector(`#examDateText-${id}`).style.display = 'none';
          document.querySelector(`#examTimeText-${id}`).style.display = 'none';
          document.querySelector(`#examClassText-${id}`).style.display = 'none';
          document.querySelector(`#examEditBtn-${id}`).style.display = 'none';
          
          // Show "to be set" state input HTML elements & save button
          document.querySelector(`#examDate-${id}`).style.display = 'block';
          document.querySelector(`#examTime-${id}`).style.display = 'block';
          document.querySelector(`#examTimeHelp-${id}`).style.display = 'block';
          document.querySelector(`#examClass-${id}`).style.display = 'block';
          document.querySelector(`#examClassHelp-${id}`).style.display = 'block';
          document.querySelector(`#examSaveBtn-${id}`).style.display = 'block';
        }
      }

      const updateExam = function(e) {
        if(e.target.classList.contains('examSave')) {
          // Get button id which is the same with exam id
          const saveBtn = e.target.parentNode.id;
          const idArr = saveBtn.split('-');
          const id = parseInt(idArr[1]);

          // Get values from input elements
            // Get Date 
            const dateID = e.target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.firstElementChild.nextElementSibling.id;
            let examDate = document.querySelector(`#${dateID}`).value;
            
            // Convert date value to English UK short format 
            const options = {day: 'numeric',  month: 'numeric', year: 'numeric'};
            examDate = new Date(examDate).toLocaleString('en-GB', options);

            // Get Time 
            const timeID = e.target.parentNode.parentNode.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.id;
            const examTime = document.querySelector(`#${timeID}`).value;
            
            // Get Class 
            const classID = e.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.id;
            const examClass = document.querySelector(`#${classID}`).value;

          // Check if one or more inputs are empty. If empty inform the user
          // else update exam 
          if(examDate === '' || examDate === 'Invalid Date' || examTime === '' || examClass === '') {
            // Show 'warning' alert 
              const message = "It's seems <b>one or more inputs are empty</b>. Please fill in all inputs elements."
              const className = 'warning'
              const position = 'exams calendar'
              UICtrl.showAlert(message, className, position);
          } else {
          // Update exam 
            // Update exam in local storage 
            StorageCtrl.updateExam(examDate, examTime, examClass, id);
            // Update exam in UI 
              // Get data from local storage 
              const exams = StorageCtrl.getExams();
              const taughtModules = StorageCtrl.getTaughtModules();
              // Populate exams 
              UICtrl.populateExams(exams, taughtModules);
            // Show 'success' alert 
              const message = "Exam <b>updated</b> successfully"
              const className = 'success'
              const position = 'exams calendar'
              UICtrl.showAlert(message, className, position);
          }
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
        if(taughtModules.length > 0 || allModules.length > 0) {
          // Module tab 
          UICtrl.populateTaughtModules(taughtModules);
          UICtrl.populateAllModules(taughtModules, allModules);
          // Exams tab 
            // Fetch exams from data structure 
            const exams = ItemCtrl.getExams();
            UICtrl.populateExams(exams, taughtModules);
        }
        if(courseworks.length > 0 || taughtModules.length > 0) {
          // Couresworks tab 
          UICtrl.populateCourseworks(courseworks);
          UICtrl.populateAddCourseworks(courseworks, taughtModules);
        }

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
