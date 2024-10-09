// sanitizePdf.js
const { PDFDocument, rgb } = require('pdf-lib');

/**
 * 从 PDF 文件中移除敏感文本
 * @param {Buffer} inputBuffer - 输入 PDF 文件的 Buffer
 * @param {Array} options - 参数数组，每个元素是一个对象
 * @param {number} options[].textX - 文本的 X 坐标
 * @param {number} options[].textY - 文本的 Y 坐标（相对于页面的高度）
 * @param {number} options[].textHeight - 文本的高度
 * @param {number} options[].textWidth - 文本的宽度
 * @param {Object} options[].color - 绘制矩形的颜色，格式为 { r: number, g: number, b: number }
 * @param {Array<number>} options[].pageNumbers - 可选页码数组，指定要处理的页码（从 1 开始）
 * @returns {Uint8Array} - 输出 PDF 文件的 Uint8Array
 */
async function sanitizePdf(inputBuffer, options) {
  try {
    const pdfDoc = await PDFDocument.load(inputBuffer);
    const pages = pdfDoc.getPages();

    // 获取所有页面的索引
    const totalPages = pages.length;

    options.forEach(option => {
      const {
        textX,
        textY,
        textHeight,
        textWidth,
        color = { r: 1, g: 1, b: 1 }, // 默认颜色为白色
        pageNumbers = [] // 默认空数组
      } = option;

      // 如果没有指定页码，则处理所有页面
      const pagesToProcess = pageNumbers.length > 0 ? pageNumbers.map(num => num - 1) : Array.from({ length: totalPages }, (_, i) => i);

      pagesToProcess.forEach(pageIndex => {
        if (pageIndex >= 0 && pageIndex < totalPages) {
          const page = pages[pageIndex];
          const { height } = page.getSize();
          const adjustedY = height - textY; 

          page.drawRectangle({
            x: textX,
            y: adjustedY - textHeight,
            width: textWidth,
            height: textHeight,
            color: rgb(color.r, color.g, color.b), // 使用传入的颜色
          });
        }
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes; // 直接返回 Uint8Array
  } catch (err) {
    console.error('处理出错:', err);
    throw err; // 重新抛出错误，供调用者处理
  }
}

module.exports = sanitizePdf;
