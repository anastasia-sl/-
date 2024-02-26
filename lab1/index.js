const fs = require('fs');

// Функція для перетворення тексту Markdown в HTML
function markdownToHTML(markdownText) {
    function escapeHTML(text) {
        return text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Обгортка для жирного тексту
    const boldRegex = /\*\*(.*?)\*\*/g;
    markdownText = markdownText.replace(boldRegex, '<strong>$1</strong>');

    // Обгортка для курсивного тексту
    const italicRegex = /_(.*?)_/g;
    markdownText = markdownText.replace(italicRegex, '<em>$1</em>');

    // Обгортка для моноширинного тексту
    const monospacedRegex = /`([^`]+)`/g;
    markdownText = markdownText.replace(monospacedRegex, '<code>$1</code>');

    // Обгортка для блоків передформатованого тексту
    const preformattedRegex = /```([^`]+)```/g;
    markdownText = markdownText.replace(preformattedRegex, '<pre>$1</pre>');

    // Заміна символу нового рядка на тег <br> для збереження переносу рядків
    markdownText = markdownText.replace(/\n/g, '<br>');

    return markdownText;
}

// Функція для зчитування файлу та обробки його змісту
function processFile(filePath, outputPath) {
    // Зчитування вмісту файлу
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка зчитування файлу:', err);
            process.exit(1); // Завершення з помилкою
        }

        // Перетворення Markdown в HTML
        const htmlContent = markdownToHTML(data);

        // Виведення HTML в консоль або запис у вихідний файл
        if (outputPath) {
            fs.writeFile(outputPath, htmlContent, 'utf8', (err) => {
                if (err) {
                    console.error('Помилка запису у вихідний файл:', err);
                    process.exit(1); // Завершення з помилкою
                }
                console.log(`HTML успішно записано у файл: ${outputPath}`);
            });
        } else {
            console.log(htmlContent);
        }
    });
}