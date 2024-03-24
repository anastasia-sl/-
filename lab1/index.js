const fs = require('fs');

// Функція для перетворення тексту Markdown в HTML
function markdownToHTML(markdownText, format = 'ansi') {
    function escapeHTML(text) {
        return text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Обгортка для блоків передформатованого тексту
    const preformattedRegex = /```([\s\S]+?)```/g;
    markdownText = markdownText.replace(preformattedRegex, format === 'ansi' ? '<pre>$1</pre>' : '<pre>$1</pre>');

    // Заміна символу нового рядка на тег <br> для збереження переносу рядків
    markdownText = markdownText.replace(/\n/g, '<br>');

    // Обгортка для жирного тексту
    const boldRegex = /\*\*(.*?)\*\*/g;
    markdownText = markdownText.replace(boldRegex, format === 'ansi' ? '<strong>$1</strong>' : '<strong>$1</strong>');

    // Обгортка для курсивного тексту
    const italicRegex = /_(.*?)_/g;
    markdownText = markdownText.replace(italicRegex, format === 'ansi' ? '<em>$1</em>' : '<em>$1</em>');

    // Обгортка для моноширинного тексту
    const monospacedRegex = /`([^`]+)`/g;
    markdownText = markdownText.replace(monospacedRegex, format === 'ansi' ? '<code>$1</code>' : '<code>$1</code>');

    return markdownText;
}

// Функція для зчитування файлу та обробки його змісту
function processFile(filePath, outputPath, format) {
    // Зчитування вмісту файлу
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Помилка зчитування файлу:', err);
            process.exit(1); // Завершення з помилкою
        }

        // Перетворення Markdown в HTML з вибором формату
        const htmlContent = markdownToHTML(data, format);

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

// Отримання аргументів командного рядка
const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];
let format = 'ansi'; // Значення за замовчуванням

// Перевірка прапорця --format у командному рядку
const formatIndex = args.indexOf('--format');
if (formatIndex !== -1 && args[formatIndex + 1]) {
    format = args[formatIndex + 1].toLowerCase();
    if (!['ansi', 'html'].includes(format)) {
        console.error('Недопустиме значення для формату. Використовуйте "ansi" або "html".');
        process.exit(1); // Завершення з помилкою
    }
}

// Перевірка, чи був переданий шлях до вхідного файлу
// if (!inputFile) {
//     console.error('Вкажіть шлях до вхідного файлу.');
//     process.exit(1); // Завершення з помилкою
// }

// Обробка вхідного файлу з вибором формату виводу
processFile(inputFile, outputFile, format);

module.exports = { markdownToHTML, processFile };
