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

//revert commit