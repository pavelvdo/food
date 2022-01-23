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
        
        //функция которая добавляет 0 когда часы или дни меньше 10
        function addZero (num) {
            if (num >= 0 && num < 10) {
                num = `0${num}`;
            }
            return num;
        }

    }

    setTimer('.timer', deadline);

    //добавляем модальное окно

    const btnModal = document.querySelectorAll('[data-modal]'),
          btnClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    btnModal.forEach((btn) => {

        btn.addEventListener ('click', openModal);
    });
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //отключение прокрутки при модальном окне
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnClose.addEventListener ('click', closeModal);
            
    //делаем закрытие окна при нажатии на подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
         
    //закрытие на клавишу esc
    document.addEventListener('keydown', (e) => {
        //console.log(e.code);
        if(e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //открытие модального окна через промежуток времени
    // const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll() {
        //window.pageYOffset - прокрученная часть
        //document.documentElement.clientHeight - высота видимой части в данный момент!
        //document.documentElement.scrollHeight - полная высота прокрутки
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Используем классы для карточек
    //Это сделал сам!
    // class MenuCard {
    //     constructor(menuName, text, price) {
    //         this.menuName = menuName;
    //         this.text = text;
    //         this.price = price;
    //     }
    // }

    // const vegy = new MenuCard ('Меню "Фитнес"', 'Капуста Брюссельская - отвратительная - 500 гр.', 500),
    //       elite = new MenuCard ('Меню “Премиум”', 'Микс: икра красная + икра черная - 100гр.', 5000),
    //       post = new MenuCard ('Меню "Постное"', 'Щи безвкусные - 500 гр.', 300);

    // menuEdit(vegy);
    // menuEdit(elite);
    // menuEdit(post);

    // //Функция измениния карточек меню на странице
    // function menuEdit(menuId) {
    //     const menu = document.querySelectorAll('.menu__item');
        
    //     menu.forEach((item) => { 
    //         const menuName = item.querySelector('.menu__item-subtitle'),
    //               text = item.querySelector('.menu__item-descr'),
    //               price = item.querySelector('.menu__item-total');
            
    //         if (menuName.textContent === menuId.menuName){
    //             //console.log(menuName.textContent);
    //             text.textContent = menuId.text;
    //             price.innerHTML = `<span>${menuId.price}</span> грн/день`;
    //         }
    //     });
    // }

    //из уроков
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 80;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price =  this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
                        `;
            this.parent.append(element);
        }
    }

    
    new MenuCard(
        'img/tabs/hamburger.jpg',
        'hamburger',
        'Меню: "Гамбургер"',
        "Супер большой гамбургер подается с картошкой фри и большим стаканом колы",
        5,
        '.menu .container',
        'menu__item',
        'big'
    ).render();
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню: "Веган"',
        "Супер большой лист салата подается с ничем и большим стаканом воды",
        1,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню: "Премиум"',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        100,
        '.menu .container',
        'menu__item'
    ).render();
    
});