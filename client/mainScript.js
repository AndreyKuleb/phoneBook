import TableOfContacts from "./tableOfContacts.js";
import Sender from "./sender.js";

window.onload = () => {
    //находим кнопки
    let addBut = document.getElementById("addBut");
    let deleteBut = document.getElementById("deleteBut");
    //создаем таблицу данных
    let table = new TableOfContacts;
    //создаем отправителя
    let sender = new Sender;
    //let deleteForm = document.getElementById("deleteFrom");

    //получаем данные с сервера
    sender.getData('GET', '/contacts', table);

    //обработчик на кнопку добавления записи в таблицу
    addBut.onclick = (e) => {

        //находим форму
        let addForm = document.getElementById("addForm");
        e.preventDefault();

        //получаем данные из формы
        let data = $(addForm).serializeArray();

        //форматируем данные перед добавением в таблицу
        let newData = {};
        data.forEach(function(element) {
            this[element.name] = element.value; 
        }, newData);

        //добавляем запись в таблицу
        table.addNote(newData);
        table.rewrite();

        //отправляем запрос на сервер
        sender.sendData(JSON.stringify(table), 'PUT', '/contacts');
        //console.log(table);
    }

    //обработчик на кнопку удаления записи из таблицы
    deleteBut.onclick = (e) => {
        let deleteForm = document.getElementById("deleteForm");
        e.preventDefault();

        //получаем данные из формы
        let data = $(deleteForm).serializeArray();

        
        //форматируем данные перед удалением из таблицы
        let newData = {};
        newData.name = data[0].value; 
        table.deleteNote(newData);

        //отправляем запрос на сервер
        sender.sendData(JSON.stringify(table), 'PUT', '/contacts');
        table.rewrite();
    }
}