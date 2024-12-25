// Функция для получения данных с сервера
async function fetchAccordionData() {
    try {
        const response = await fetch("get_accordion.php");
        const data = await response.json();
        renderAccordion(data);
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }
}

// Функция для рендеринга аккордеона
function renderAccordion(data) {
    const container = document.getElementById("accordionContainer");
    container.innerHTML = ""; // Очищаем контейнер перед перерисовкой

    data.forEach((item, index) => {
        // Создаем элементы аккордеона
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        const header = document.createElement("div");
        header.className = "accordion-header";
        header.textContent = item.title;

        const body = document.createElement("div");
        body.className = "accordion-body";
        body.textContent = item.content;

        // Добавляем функциональность без JS-фреймворков
        header.addEventListener("click", () => {
            body.classList.toggle("active");
        });

        accordionItem.appendChild(header);
        accordionItem.appendChild(body);
        container.appendChild(accordionItem);
    });
}

// Периодическое обновление данных
setInterval(fetchAccordionData, 5000); // Проверяем изменения каждые 5 секунд

// Загрузка данных при загрузке страницы
fetchAccordionData();
