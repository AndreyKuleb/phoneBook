export default class Sender{
    constructor(){}
    sendData(data, method, url, table){
        $.ajax({
            url: url,             // указываем URL и
            method: method,
            dataType : "json",                     // тип загружаемых данных
            data: data,
            success: function (data, textStatus) { // вешаем свой обработчик на функцию success

            } 
        });
    }
    getData(method, url, table){
        $.ajax({
            url: url,             // указываем URL и
            method: method,
            dataType : "json",                     // тип загружаемых данных
            data: {},
            statusCode: {
                //не найдена страница - перерисовываем таблицу с теми данными, что есть
                404: function() {
                    table.rewrite();
                },
                500: function(){
                }
              }
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
        });
    }
}