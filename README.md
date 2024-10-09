# pdf-sanitizer

`pdf-sanitizer` 是一个用于处理 PDF 文件的 JavaScript 库，能够从 PDF 文件中移除敏感文本。通过绘制矩形覆盖指定位置的文本，从而确保敏感信息不会被泄露。

`pdf-sanitizer` is a JavaScript library for processing PDF files that can remove sensitive text from PDF documents. It covers specified text locations with rectangles to ensure sensitive information is not exposed.

## 特性 / Features

可以指定文本位置、大小、颜色以及处理的页码。 / Specify text position, size, color, and pages to process.

## 安装 / Installation

使用 npm 安装 / Install via npm:

```bash
npm install pdf-sanitizer
```

## 使用 / Usage


以下是一个简单的示例，展示如何使用 `sanitizePdf` 函数：

Here’s a simple example demonstrating how to use the `sanitizePdf` function:

```javascript
const fs = require('fs');
const sanitizePdf = require('sanitize-pdf');

(async () => {
  const inputBuffer = fs.readFileSync('input.pdf');
  
  const options = [
    {
      textX: 50,
      textY: 100,
      textHeight: 20,
      textWidth: 200,
      color: { r: 1, g: 1, b: 1 },
      pageNumbers: [1] // 处理第一页
    }
  ];

  const outputBuffer = await sanitizePdf(inputBuffer, options);
  fs.writeFileSync('output.pdf', outputBuffer);
})();
```

## API

### `sanitizePdf(inputBuffer, options)`

- **参数 / Parameters**:
- `inputBuffer`: Buffer - 输入的 PDF 文件的 Buffer。/ The input PDF file as a Buffer.
- `options`: Array - 参数数组，每个元素是一个对象，包含以下属性：/ An array of options, each being an object with the following properties:
  - `textX`: number - 文本的 X 坐标。/ The X coordinate of the text.
  - `textY`: number - 文本的 Y 坐标（相对于页面的高度）。/ The Y coordinate of the text (relative to the height of the page).
  - `textHeight`: number - 文本的高度。/ The height of the text.
  - `textWidth`: number - 文本的宽度。/  The width of the text.
  - `color`: Object - 绘制矩形的颜色，格式为 `{ r: number, g: number, b: number }`（默认值为白色）。/ The color of the rectangle to draw, formatted as `{ r: number, g: number, b: number }` (default is white).
  - `pageNumbers`: Array<number> - 可选页码数组，指定要处理的页码（从 1 开始）。/ An optional array of page numbers specifying which pages to process (starting from 1).

- **返回值 / Return Value**: Uint8Array - 输出处理后的 PDF 文件的 Uint8Array。/ The output processed PDF file as a Uint8Array.


### 示例

以下是一个简单的示例，展示如何使用 `sanitizePdf` 函数：

Here’s a simple example demonstrating how to use the `sanitizePdf` function:

```javascript
const fs = require('fs');
const sanitizePdf = require('sanitize-pdf');

(async () => {
  const inputBuffer = fs.readFileSync('input.pdf');
  
  const options = [
    {
      textX: 50,
      textY: 100,
      textHeight: 20,
      textWidth: 200,
      color: { r: 1, g: 1, b: 1 },
      pageNumbers: [1] // 处理第一页
    }
  ];

  const outputBuffer = await sanitizePdf(inputBuffer, options);
  fs.writeFileSync('output.pdf', outputBuffer);
})();
```

## 贡献 / Contributing

欢迎任何形式的贡献！请提交问题或拉取请求。/ Contributions are welcome! Please submit issues or pull requests.

## 许可证 / License

MIT 许可证。请查看 [LICENSE](LICENSE) 文件以获取更多信息。/ MIT License. Please see the [LICENSE](LICENSE) file for more information.
## 联系 / Contact

如有问题，欢迎通过 [GitHub Issues](https://github.com/louyongjiu/pdf-sanitizer/issues) 联系我。/ If you have any questions, feel free to reach out via [GitHub Issues](https://github.com/louyongjiu/pdf-sanitizer/issues).

---

如需了解更多信息，请查看 [项目主页](https://github.com/louyongjiu/pdf-sanitizer)。/ For more information, please visit the [project homepage](https://github.com/louyongjiu/pdf-sanitizer).