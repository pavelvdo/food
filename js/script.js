"use strict";

window.addEventListener('DOMContentLoaded', () => {
    
    //tabs

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

    //timer

    const deadline = '2022-01-25';

    //функция которая рассчитывает разницу дат
    function getTimeRemaining (endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              //получаем сколько дней осталось до даты t!!! msec
              days = Math.floor(t / (1000 * 60 * 60 * 24)), //округляет до ближайшего целого
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        //возвращаем объект! ключ значение

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //функция которая добавляет 0 когда часы или дни меньше 10
    function addZero (num) {
        if (num >= 0 && num < 10) {
            num = `0${num}`;
        }
        return num;
    }

    //функция которая будет устанавливать наш таймер на страничку

    function setTimer (selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
            //чтобы не мигала при обновлении верстка запускаем
        updateClock();

        //функция обновления часов каждую сек      
        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }


    }

    setTimer('.timer', deadline);

});