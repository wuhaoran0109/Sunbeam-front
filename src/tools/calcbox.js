export function getTextHeight(text, fontSize, fontFamily, width) {
    let el
    let innerText
    innerText = text.replace(/\u0020/g, '&nbsp;')
    el = document.createElement('div')
    el.style.cssText = `font-size:${fontSize}pt;
            font-family:${fontFamily};width:${width}px;
            word-break:break-word;position:absolute;visibility:hidden;`
    el.innerText = innerText
    document.body.appendChild(el)
    let style
    if (window.getComputedStyle) {
        style = window.getComputedStyle(el)
    } else {
        style = el.currentStyle
    }
    let result = style.height
    result = parseInt(result.substring(0, result.length - 2), 10)
    return result
}