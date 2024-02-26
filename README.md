# Markdown to HTML Converter

This is a simple console application that converts a subset of Markdown to HTML. It provides functionality to read Markdown content from a file, convert it to HTML, and either print the HTML to the console or write it to an output file.
## How to Use

1. **Installation**: Clone the repository to your local machine.

2. **Usage**:
    - Open your terminal or command prompt.
    - Navigate to the project directory.
    - Run the following command:
   ```
   node index.js path/to/input/file.md [path/to/output/file.html]
   ```
     Replace `path/to/input/file.md` with the path to your Markdown file and `path/to/output/file.html` (optional) with the desired output file path. If no output file path is provided, the HTML content will be printed to the console.
3. **Revert Commit**: You can find the corresponding commit in the commit history with the description indicating the revert.
4. ## Functionality

The application provides the following Markdown to HTML conversions:
- Bold text: `**text**` becomes `<strong>text</strong>`
- Italic text: `_text_` becomes `<em>text</em>`
- Monospaced text: \`text\` becomes `<code>text</code>`
- Preformatted text: \`\`\`text\`\`\` becomes `<pre>text</pre>`
- Newlines: Newlines are replaced with `<br>` tags for line breaks.
