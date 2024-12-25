document.getElementById("createAccordion").addEventListener("click", function () {
    // Отримуємо дані з форми
    const count = parseInt(document.getElementById("accordionCount").value);
    const contents = document.getElementById("accordionContent").value.split(",");
  
    // Контейнер для акордеону
    const container = document.getElementById("accordionContainer");
    container.innerHTML = ""; // Очищуємо попередній контент
  
    // Перевірка: кількість контенту має відповідати кількості секцій
    if (contents.length !== count) {
      alert("Кількість секцій і контенту має співпадати!");
      return;
    }
  
    // Масив для збереження даних акордеону
    const accordionData = [];
  
    // Створюємо акордеон
    for (let i = 0; i < count; i++) {
      const item = {
        title: `Секція ${i + 1}`,
        content: contents[i].trim()
      };
  
      // Додаємо дані до масиву
      accordionData.push(item);
  
      // Відображення акордеону на сторінці
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
  
      const header = document.createElement("h2");
      header.className = "accordion-header";
  
      const button = document.createElement("button");
      button.className = "accordion-button collapsed";
      button.type = "button";
      button.setAttribute("data-bs-toggle", "collapse");
      button.setAttribute("data-bs-target", `#collapse${i}`);
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", `collapse${i}`);
      button.textContent = item.title;
  
      const collapse = document.createElement("div");
      collapse.className = "accordion-collapse collapse";
      collapse.id = `collapse${i}`;
      collapse.setAttribute("aria-labelledby", `heading${i}`);
      collapse.setAttribute("data-bs-parent", "#accordionContainer");
  
      const body = document.createElement("div");
      body.className = "accordion-body";
      body.textContent = item.content;
  
      // Збираємо елементи акордеону
      collapse.appendChild(body);
      header.appendChild(button);
      accordionItem.appendChild(header);
      accordionItem.appendChild(collapse);
      container.appendChild(accordionItem);
    }
  
    // Збереження даних на сервері
    saveAccordionData(accordionData);
  });
  
  // Функція для асинхронного збереження даних на сервері
  async function saveAccordionData(data) {
    try {
      const response = await fetch("save.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      if (result.status === "success") {
        alert("Дані успішно збережено на сервері!");
      } else {
        alert("Помилка збереження даних: " + result.message);
      }
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося зберегти дані на сервері.");
    }
  }
  