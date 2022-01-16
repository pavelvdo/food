"use strict";

window.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    //функция которая скрывает все табы
    function hideTabContent() {
        tabsContent.forEach(item => {
            //это inline стиль, лучше добавить в css класс и работать с классом
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //функция которая показывает нам табы. i - номер который мы будем передавать (i=0 параметры по умолчанию
    //появились в es6? т.е. если не передается никакой элемент i=0)
    function showTabContent(i = 0) {
        //тоже самое, вместо inline используем классы
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //с помощью делегирования событий добавляем обработчики на кнопки

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});