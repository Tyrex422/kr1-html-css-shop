// ===============================
// Модальное окно заказа
// ===============================

const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const closeDialogIcon = document.getElementById('close-order-dialog-icon');
const selectedProductInput = document.getElementById('selected-product');
const productLabel = document.getElementById('order-dialog-product');
const productName = document.getElementById('order-dialog-product-name');
const firstField = document.getElementById('order-name');

// Открытие по кнопкам «Заказать»
if (orderDialog && orderButtons.length && selectedProductInput) {
  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.product;

      selectedProductInput.value = name;

      if (productLabel && productName) {
        productName.textContent = name;
        productLabel.hidden = !name;
      }

      orderDialog.showModal();

      // Фокус на первом поле
      if (firstField) firstField.focus();
    });
  });
}

// Закрытие: кнопки и клик по фону
function closeDialog() {
  if (orderDialog?.open) orderDialog.close();
}

[closeDialogButton, closeDialogIcon].forEach((btn) => {
  if (btn) btn.addEventListener('click', closeDialog);
});

// Клик по backdrop (фону)
if (orderDialog) {
  orderDialog.addEventListener('click', (event) => {
    // Если клик пришёлся на сам <dialog> (не на внутренний контент)
    if (event.target === orderDialog) {
      closeDialog();
    }
  });
}


// ===============================
// Форма заявки
// ===============================

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm && successMessage) {
  orderForm.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку — backend пока не подключён
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);

    // Сбрасываем предыдущие признаки ошибок
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    // Проверяем встроенные HTML-ограничения формы
    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });

      orderForm.reportValidity();
      return;
    }

    // Успешная отправка
    successMessage.hidden = false;
    orderForm.reset();

    if (orderDialog) {
      orderDialog.close();
    }
  });
}

// ===============================
// Кнопка «Наверх»
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;

  const SHOW_AFTER = 100;

  const toggleButton = () => {
    scrollTopBtn.hidden = window.scrollY <= SHOW_AFTER;
  };

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', toggleButton, { passive: true });
  toggleButton();
});