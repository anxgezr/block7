import '../scss/style.scss'

// Swiper
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
Swiper.use([Pagination])

window.addEventListener('DOMContentLoaded', () => {
  const resizableSwiper = (
    breakpointStr,
    containerSelector,
    settings,
    callback
  ) => {
    let swiper
    const breakpoint = window.matchMedia(breakpointStr)

    const enableSwiper = () => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      swiper = new Swiper(containerSelector, settings)
      if (callback) callback(swiper)
    }

    const disableSwiper = () => {
      if (swiper) {
        swiper.destroy(true, true)
        swiper = null
      }
    }

    const checker = () => {
      breakpoint.matches ? enableSwiper() : disableSwiper()
    }

    breakpoint.addEventListener('change', checker)
    checker()
  }

  const onSlideChange = (instance) => {
    if (!instance) return
    instance.on('slideChange', () => {
      console.log('active index:', instance.activeIndex)
    })
  }

  const swipers = [
    { selector: '#SwiperFirst' },
    { selector: '#SwiperSecond' },
    { selector: '#SwiperThird' }
  ]

  swipers.forEach((swiperData) => {
    resizableSwiper(
      '(max-width: 767px)',
      swiperData.selector,
      {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        pagination: {
          el: `${swiperData.selector} .swiper-pagination`,
          clickable: true
        }
      },
      onSlideChange
    )
  })

  // Чтение далее
  var infoContent = document.querySelector('.info__content')
  var readMoreButton = null
  var infoText = null

  if (infoContent) {
    readMoreButton = infoContent.querySelector('#readMoreButton')
    infoText = infoContent.querySelector('.info__text')
  }

  if (readMoreButton && infoText) {
    function getCollapsedHeight() {
      if (window.innerWidth >= 768) {
        return 142
      } else {
        return 75
      }
    }

    infoText.style.maxHeight = getCollapsedHeight() + 'px'
    infoText.style.overflow = 'hidden'
    infoText.style.transition = 'max-height 0.3s ease'

    readMoreButton.addEventListener('click', function () {
      var isExpanded = false
      if (infoText.classList.contains('expanded')) {
        isExpanded = true
      }

      if (isExpanded) {
        infoText.style.maxHeight = getCollapsedHeight() + 'px'
        readMoreButton.textContent = 'Читать далее'
      } else {
        infoText.style.maxHeight = infoText.scrollHeight + 'px'
        readMoreButton.textContent = 'Скрыть'
      }

      if (infoText.classList.contains('expanded')) {
        infoText.classList.remove('expanded')
      } else {
        infoText.classList.add('expanded')
      }

      if (readMoreButton.classList.contains('rotated')) {
        readMoreButton.classList.remove('rotated')
      } else {
        readMoreButton.classList.add('rotated')
      }
    })

    window.addEventListener('resize', function () {
      if (!infoText.classList.contains('expanded')) {
        infoText.style.maxHeight = getCollapsedHeight() + 'px'
      }
    })
  }

  // Всплывающие элементы
  const body = document.body
  const overlay = document.getElementById('menuOverlay')

  // Кнопки открытия
  const burgerBtns = document.querySelectorAll('.button-round--burger')
  const callBtns = document.querySelectorAll('.button-round--call')
  const feedbackBtns = document.querySelectorAll('.button-round--chat')

  // Кнопки закрытия
  const closeCallBtn = document.getElementById('closeCallMenu')
  const closeFeedbackBtn = document.getElementById('closeFeedbackMenu')
  const closeBurgerBtn = document.getElementById('closeBurgerMenu')

  // Функции открытия/закрытия меню
  const toggleMenu = {
    burger: () => body.classList.add('menu-open'),
    closeBurger: () => body.classList.remove('menu-open'),
    call: () => {
      body.classList.remove('feedback-open')
      body.classList.add('call-open')
    },
    closeCall: () => body.classList.remove('call-open'),
    feedback: () => {
      body.classList.remove('call-open')
      body.classList.add('feedback-open')
    },
    closeFeedback: () => body.classList.remove('feedback-open')
  }

  // Закрытие по клику на overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (body.classList.contains('feedback-open')) toggleMenu.closeFeedback()
      else if (body.classList.contains('call-open')) toggleMenu.closeCall()
      else if (body.classList.contains('menu-open')) toggleMenu.closeBurger()
    })
  }

  // Навешиваем обработчики на кнопки открытия меню
  burgerBtns.forEach((btn) => btn.addEventListener('click', toggleMenu.burger))
  callBtns.forEach((btn) => btn.addEventListener('click', toggleMenu.call))
  feedbackBtns.forEach((btn) =>
    btn.addEventListener('click', toggleMenu.feedback)
  )

  // Навешиваем обработчики на кнопки закрытия меню
  if (closeCallBtn) closeCallBtn.addEventListener('click', toggleMenu.closeCall)
  if (closeFeedbackBtn)
    closeFeedbackBtn.addEventListener('click', toggleMenu.closeFeedback)
  if (closeBurgerBtn)
    closeBurgerBtn.addEventListener('click', toggleMenu.closeBurger)
})

// Бренды
var moreButton = document.getElementById('hidebuttonfirst')
var brandsList = document.querySelector('.brands-list')

if (moreButton && brandsList) {
  moreButton.addEventListener('click', function () {
    if (brandsList.classList.contains('expanded')) {
      brandsList.classList.remove('expanded')
      moreButton.classList.remove('rotated')
      moreButton.textContent = 'Показать всё'
    } else {
      brandsList.classList.add('expanded')
      moreButton.classList.add('rotated')
      moreButton.textContent = 'Скрыть'
    }
  })
}

// Виды техники
var moreButtonSecond = document.getElementById('hidebuttonSecond')
var typesList = document.querySelector('.types-list')

if (moreButtonSecond && typesList) {
  moreButtonSecond.addEventListener('click', function () {
    if (typesList.classList.contains('expanded')) {
      typesList.classList.remove('expanded')
      moreButtonSecond.classList.remove('rotated')
      moreButtonSecond.textContent = 'Показать всё'
    } else {
      typesList.classList.add('expanded')
      moreButtonSecond.classList.add('rotated')
      moreButtonSecond.textContent = 'Скрыть'
    }
  })
}
