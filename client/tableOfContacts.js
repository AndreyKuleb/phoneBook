export default class TableOfContacts{
    constructor(){
        //начальные значения таблицы
        this.table = [
            {
                name: "Vasya",
                telephone: "89161234567",
                city: "Moscow"
            },
            {
                name: "Kolya",
                telephone: "89091234567",
                city: "Saint-Petesburg"
            },
            {
                name: "Tanya",
                telephone: "89267654321",
                city: "Volgograd"
            }
        ]
    }
    setTable(data){
        this.table = data;
    }
    //добавление новой записи
    addNote(note){
        this.table.push(note);
    }

    //удаление записи
    deleteNote(note){
        this.table.forEach((item, i, arr) => {
            if (note.name === item.name) {
                arr.splice(i, 1);
            }
        }, note)
    }

    //перерисовка таблицы
    rewrite(){
        let table = document.getElementById('div_table');
        table.innerHTML = null;
        let tr = document.createElement('tr');
        tr.innerHTML = "<td>Имя</td><td>Телефон</td><td>Адрес</td>";
        table.appendChild(tr);
        this.table.forEach((elem) => {
            let tr = document.createElement('tr');
            tr.innerHTML = "<td>"+elem.name+"</td>"+"<td>"+elem.city+"</td>"+"<td>"+elem.telephone+"</td>";
            table.appendChild(tr);
        }, table)
    }
}

