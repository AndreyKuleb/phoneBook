/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tableOfContacts = __webpack_require__(1);

var _tableOfContacts2 = _interopRequireDefault(_tableOfContacts);

var _sender = __webpack_require__(2);

var _sender2 = _interopRequireDefault(_sender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
        //находим кнопки
        var addBut = document.getElementById("addBut");
        var deleteBut = document.getElementById("deleteBut");
        //создаем таблицу данных
        var table = new _tableOfContacts2.default();
        //создаем отправителя
        var sender = new _sender2.default();
        //let deleteForm = document.getElementById("deleteFrom");

        //получаем данные с сервера
        sender.getData('GET', '/contacts', table);

        //обработчик на кнопку добавления записи в таблицу
        addBut.onclick = function (e) {

                //находим форму
                var addForm = document.getElementById("addForm");
                e.preventDefault();

                //получаем данные из формы
                var data = $(addForm).serializeArray();

                //форматируем данные перед добавением в таблицу
                var newData = {};
                data.forEach(function (element) {
                        this[element.name] = element.value;
                }, newData);

                //добавляем запись в таблицу
                table.addNote(newData);
                table.rewrite();

                //отправляем запрос на сервер
                sender.sendData(JSON.stringify(table), 'PUT', '/contacts');
                //console.log(table);
        };

        //обработчик на кнопку удаления записи из таблицы
        deleteBut.onclick = function (e) {
                var deleteForm = document.getElementById("deleteForm");
                e.preventDefault();

                //получаем данные из формы
                var data = $(deleteForm).serializeArray();

                //форматируем данные перед удалением из таблицы
                var newData = {};
                newData.name = data[0].value;
                table.deleteNote(newData);

                //отправляем запрос на сервер
                sender.sendData(JSON.stringify(table), 'PUT', '/contacts');
                table.rewrite();
        };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableOfContacts = function () {
    function TableOfContacts() {
        _classCallCheck(this, TableOfContacts);

        //начальные значения таблицы
        this.table = [{
            name: "Vasya",
            telephone: "89161234567",
            city: "Moscow"
        }, {
            name: "Kolya",
            telephone: "89091234567",
            city: "Saint-Petesburg"
        }, {
            name: "Tanya",
            telephone: "89267654321",
            city: "Volgograd"
        }];
    }

    _createClass(TableOfContacts, [{
        key: "setTable",
        value: function setTable(data) {
            this.table = data;
        }
        //добавление новой записи

    }, {
        key: "addNote",
        value: function addNote(note) {
            this.table.push(note);
        }

        //удаление записи

    }, {
        key: "deleteNote",
        value: function deleteNote(note) {
            this.table.forEach(function (item, i, arr) {
                if (note.name === item.name) {
                    arr.splice(i, 1);
                }
            }, note);
        }

        //перерисовка таблицы

    }, {
        key: "rewrite",
        value: function rewrite() {
            var table = document.getElementById('div_table');
            table.innerHTML = null;
            var tr = document.createElement('tr');
            tr.innerHTML = "<td>Имя</td><td>Телефон</td><td>Адрес</td>";
            table.appendChild(tr);
            this.table.forEach(function (elem) {
                var tr = document.createElement('tr');
                tr.innerHTML = "<td>" + elem.name + "</td>" + "<td>" + elem.city + "</td>" + "<td>" + elem.telephone + "</td>";
                table.appendChild(tr);
            }, table);
        }
    }]);

    return TableOfContacts;
}();

exports.default = TableOfContacts;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sender = function () {
    function Sender() {
        _classCallCheck(this, Sender);
    }

    _createClass(Sender, [{
        key: "sendData",
        value: function sendData(data, method, url, table) {
            $.ajax({
                url: url, // указываем URL и
                method: method,
                dataType: "json", // тип загружаемых данных
                data: data,
                success: function success(data, textStatus) {// вешаем свой обработчик на функцию success

                }
            });
        }
    }, {
        key: "getData",
        value: function getData(method, url, table) {
            $.ajax({
                url: url, // указываем URL и
                method: method,
                dataType: "json", // тип загружаемых данных
                data: {},
                statusCode: {
                    //не найдена страница - перерисовываем таблицу с теми данными, что есть
                    404: function _() {
                        table.rewrite();
                    },
                    500: function _() {}
                    // success: function (data, textStatus) { // вешаем свой обработчик на функцию success
                    //     console.log(data);
                    //     console.log(textStatus);
                    //     if (textStatus === "500"){
                    //         table.setTable(data);
                    //     }
                    //     else{
                    //         //перерисовываем таблицу
                    //         table.rewrite();
                    //     }
                    // } 
                } });
        }
    }]);

    return Sender;
}();

exports.default = Sender;

/***/ })
/******/ ]);