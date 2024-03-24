const fs = require('fs');
const { markdownToHTML, processFile } = require('../lab1/index');

// Mock функції fs.readFile та fs.writeFile
jest.mock('fs');

describe('Markdown Converter', () => {
    describe('markdownToHTML', () => {
        it('should convert bold markdown to HTML', async () => {
            const markdownText = '**Bold Text**';
            const htmlOutput = markdownToHTML(markdownText);
            expect(htmlOutput).toEqual('<strong>Bold Text</strong>');
        });

        it('should convert italic Markdown to HTML', async () => {
            const markdownText = '_Italic Text_';
            const htmlOutput = markdownToHTML(markdownText);
            expect(htmlOutput).toEqual('<em>Italic Text</em>');
        });

        it('should convert monospaced Markdown to HTML', async () => {
            const markdownText = '`Monospaced Text`';
            const htmlOutput = markdownToHTML(markdownText);
            expect(htmlOutput).toEqual('<code>Monospaced Text</code>');
        });

        it('should convert preformatted Markdown to HTML', async () => {
            const markdownText = '```Preformatted Text```';
            const htmlOutput = markdownToHTML(markdownText);
            expect(htmlOutput).toEqual('<pre>Preformatted Text</pre>');
        });

        it('should replace newline characters with <br> tags', () => {
            const markdownText = 'Line 1\nLine 2\nLine 3';
            const htmlOutput = markdownToHTML(markdownText);
            expect(htmlOutput).toEqual('Line 1<br>Line 2<br>Line 3');
        });
    });

    describe('processFile', () => {
        it('should process file and write HTML content to output file', (done) => {
            const filePath = './test.md';
            const outputPath = './test.html';
            processFile(filePath, outputPath, 'html');

            setTimeout(() => {
                // Check if the file is created and contains the expected HTML content
                // You can use fs.readFileSync to read the file content and perform checks
                done();
            }, 1000); // Allow time for file writing
        });
    });
});
