//modals
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, priceContent) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.getElementById(modalSelector),
              close = document.querySelectorAll(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              price = document.querySelectorAll('.popup__calls')

              

              


            trigger.forEach(item => {
                item.addEventListener('click', (e) => {
                    if(priceContent == 'Choose suplies' || priceContent == 'Try it - then pay!') {
                        price.forEach(item => {
                            item.textContent = priceContent
                        })
                    } else {
                        price.forEach(item => {
                        item.textContent = `The price of the product - ${priceContent}$`
                    })
                    }
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
            });
        });
        document.querySelectorAll('.popup__close').forEach(item => {
            item.addEventListener('click', () => {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = "none";
                document.body.style.overflow = "";
            })
        })

        close.forEach(item => {
            item.addEventListener('click', () => {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
    
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
            });
        })

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                // document.body.classList.remove('modal-open');
            }
        });
        
    }

    // function showModalByTime(selector, time) {
    //     setTimeout(function() {
    //         document.querySelector(selector).style.display = 'block';
    //         document.body.style.overflow = "hidden";
    //     }, time);
    // }
    bindModal('.promo__link', 'popup__buy', '.popup__area', false, 'Choose suplies');
    bindModal('#autors__link_first', 'popup__buy', '.popup__area', false, '13,84');
    bindModal('#autors__link_second', 'popup__buy', '.popup__area', false, '86,11');
    bindModal('.get__link', 'popup__buy', '.popup__area', false, 'Choose suplies');
    bindModal('.knowledge__href', 'popup__buy', '.popup__area', false, 'Try it - then pay!');
    bindModal('.promo__linkk', 'popup__buy', '.popup__area', false, '15,92');
    bindModal('.popup__button', 'popup__price', '.popup__area', false);
    bindModal('.popup__href_two', 'popup__error', '.popup__area', false);
    bindModal('.footer__item', 'popup__none', '.popup__area', false);

    document.querySelector('.popup__href_two').addEventListener('click', () => {
        setTimeout(() => {
            document.getElementById('popup__error').style.display = 'none';
            document.body.style.overflow = "";
        }, 3000)
    })

    if (window.matchMedia("(min-width: 577px)").matches) {
        // ... ваша логика
        // которая не станет выполняться
        // если размер больше 540px
        bindModal('.promo__href', 'popup__carousel', '.popup__area', false);
        bindModal('#number', 'popup__carousel_num', '.popup__area', false);
        bindModal('#have', 'popup__carousel_have', '.popup__area', false);
        bindModal('#words', 'popup__carousel_words', '.popup__area', false);
        bindModal('#promo__cart', 'popup__cart', '.popup__area', false);
    
        
      }
    // showModalByTime('.popup', 60000);
};
modals();

// const slides = document.querySelectorAll('.popup__carousel'),
//             prev = document.querySelector('.popup__carousel_prev'),
//             next = document.querySelector('.popup__carousel_next'),
//             total = document.querySelector('#total'),
//             current = document.querySelector('#current');

//carousel
const carousel = (slidesSelector, prevSelector, nextSelector, totalSelector,currentSelector) => {
    let slideIndex = 1;
        const slides = document.querySelectorAll(slidesSelector),
            prev = document.querySelector(prevSelector),
            next = document.querySelector(nextSelector),
            total = document.querySelector(totalSelector),
            current = document.querySelector(currentSelector);
    
        showSlides(slideIndex);
    
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
        } else {
            total.textContent = slides.length;
        }
    
        function showSlides(n) {
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
    
            slides.forEach((item) => item.style.display = 'none');
    
            slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
            
            if (slides.length < 10) {
                current.textContent =  `0${slideIndex}`;
            } else {
                current.textContent =  slideIndex;
            }
        }
    
        function plusSlides (n) {
            showSlides(slideIndex += n);
            slides.forEach(item => {
                item.classList.add('fade');
            });
        }
    
        prev.addEventListener('click', function(){
            plusSlides(-1);
        });
    
        next.addEventListener('click', function(){
            plusSlides(1);
        });
}
carousel('.popup__carousel', '.popup__carousel_prev', '.popup__carousel_next', '#total', '#current');
carousel('.popup__carousel_number', '.popup__carousel_prev_number', '.popup__carousel_next_number', '#total_number', '#current_number');
carousel('.popup__carousel_have', '.popup__carousel_prev_have', '.popup__carousel_next_have', '#total_have', '#current_have');
carousel('.popup__carousel_words', '.popup__carousel_prev_words', '.popup__carousel_next_words', '#total_words', '#current_words');






    //forms
    const checkNumInputs = (selector) => {
        const numInputs = document.querySelectorAll(selector);
    
        numInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');  
            });
        });
    };
    

    const forms = (state) => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input');
    
        checkNumInputs('input[name="user_phone"]');
        
        const message = {
            loading: 'loading...',
            success: 'your data has been sent',
            failure: 'error'
        };
    
        const postData = async (url, data) => {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
    
            return await res.text();
        };
    
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };
    
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);
    
                const formData = new FormData(item);
                if (item.getAttribute('data-calc') === "end") {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    }
                }
    
                postData('../server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                        document.querySelector('.popup__button').style.display = 'block'
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    };
    forms();
    
    // price
    // const priceLinks = document.querySelectorAll('.popup__link');

    // priceLinks.forEach(item => {
    //     item.addEventListener('click', () => {
    //         item.style.border = '1px solid blue';
    //     })
    // })





    const tabs = (headerSelector, tabSelector, activeClass) => {
        const header = document.querySelector(headerSelector),
              tab = document.querySelectorAll(tabSelector)
    
        function hideTabContent() {
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
    
        function showTabContent(i = 0) {
            tab[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
    
        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    };
    tabs('.popup__hrefs', '.popup__link','popup__active_href');