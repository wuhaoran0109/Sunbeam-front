import * as actionTypes from '../../action-types'
import {
    isDate, formatText,
    isNum, parseExpress,
} from '../../../tools/format'
// import send from '../../../util/send'
// import config from '../../../config'
export default {
    [actionTypes.EDIT_SHOW]({
        state,
        rootState,
        getters,
        commit
    }, {
        type,
        value
    }) {
        // 获取当前选中的单元格
        // 算出选中个的位置、宽高信息
        // 设置该模型覆盖其位置
        let activeCell = getters.activeCell()
        let propStruct = {}
        // 编辑单元格内容
        if (type === 'EDIT') {
            if (activeCell != null) {
                let content = activeCell.content
                let physicsBox = activeCell.physicsBox
                propStruct = {
                    physical: {
                        left: physicsBox.left,
                        top: physicsBox.top,
                        width: physicsBox.width,
                        height: physicsBox.height,
                        texts: content.texts,
                        size: content.size,
                        family: content.family,
                        color: content.color,
                        weight: content.weight,
                        italic: content.italic,
                        edit: 'texts'
                    },
                    assist: {
                        colAlias: activeCell.occupy.col[0],
                        rowAlias: activeCell.occupy.row[0],
                        endcolAlias: activeCell.occupy.col[0],
                        endrowAlias: activeCell.occupy.row[0],
                        status: true
                    }
                }
            } else {
                let select = getters.selectByType('SELECT')
                let colAlias = select.wholePosi.startColAlias
                let rowAlias = select.wholePosi.startRowAlias
                let endcolAlias = select.wholePosi.endColAlias
                let endrowAlias = select.wholePosi.endRowAlias
                let colIndex = getters.colIndexByAlias(colAlias)
                let rowIndex = getters.rowIndexByAlias(rowAlias)
                let cols = getters.allCols
                let rows = getters.allRows
                let colItem = cols[colIndex]
                let rowItem = rows[rowIndex]
                propStruct = {
                    physical: {
                        left: colItem.left,
                        top: rowItem.top,
                        width: colItem.width,
                        height: rowItem.height,
                        edit: 'texts'
                    },
                    assist: {
                        colAlias,
                        rowAlias,
                        endcolAlias,
                        endrowAlias
                    }
                }
            }
            // 有传入值时，更新输入框的值
            if (typeof value !== 'undefined') {
                propStruct.physical.texts = value
            }
            // 批注
        } else if (type === 'COMMENT') {
            let select = getters.selectByType('SELECT')
            let colAlias = select.wholePosi.startColAlias
            let rowAlias = select.wholePosi.startRowAlias
            let endcolAlias = select.wholePosi.endColAlias
            let endrowAlias = select.wholePosi.endRowAlias
            if (activeCell != null) {
                let content = activeCell.content
                let customProp = activeCell.customProp
                let physicsBox = activeCell.physicsBox
                propStruct = {
                    physical: {
                        left: physicsBox.left + select.physicsBox.width + 5,
                        top: physicsBox.top,
                        width: 150,
                        height: 150,
                        texts: customProp.comment,
                        size: 11,
                        family: content.family,
                        color: content.color,
                        weight: content.weight,
                        italic: content.italic,
                        edit: 'comment'
                    },
                    assist: {
                        colAlias,
                        rowAlias,
                        endcolAlias,
                        endrowAlias,
                        status: true
                    }
                }
            } else {
                let colIndex = getters.colIndexByAlias(colAlias)
                let rowIndex = getters.rowIndexByAlias(rowAlias)
                let cols = getters.allCols
                let rows = getters.allRows
                let colItem = cols[colIndex]
                let rowItem = rows[rowIndex]
                propStruct = {
                    physical: {
                        left: colItem.left + select.physicsBox.width + 5,
                        top: rowItem.top,
                        width: 150,
                        height: 150,
                        edit: 'comment'
                    },
                    assist: {
                        colAlias,
                        rowAlias,
                        endcolAlias,
                        endrowAlias
                    }
                }
            }
        }
        commit('M_INPUT_UPDATE_PROPS', propStruct)
    },
    async A_INPUT_EDITDONE({
        getters,
        dispatch,
        commit
    }, {
        texts, status
    }) {
        let props = getters.inputProps
        let colAlias = props.assist.colAlias
        let rowAlias = props.assist.rowAlias
        let endcolAlias = props.assist.endcolAlias
        let endrowAlias = props.assist.endrowAlias
        if (colAlias == null || rowAlias == null) {
            return
        }
        let colIndex = getters.colIndexByAlias(colAlias)
        let rowIndex = getters.rowIndexByAlias(rowAlias)
        let cell = getters.cellsByVertical({
            startColIndex: colIndex,
            startRowIndex: rowIndex,
            endColIndex: colIndex,
            endRowIndex: rowIndex
        })[0]
        let rules
        let date
        let propStruct
        if (status === 'texts') {
            propStruct = {
                content: {
                    texts
                }
            }
            if (cell) {
                let express = cell.content.express
                rules = parseExpress(express)
                date = cell.content.express === 'yyyy/mm/dd' || cell.content.express === 'yyyy年m月d日' ? true : false
                propStruct.content.displayTexts = parseText(texts)
            } else {
                propStruct.content.displayTexts = texts
            }
            if (isNum(texts)) {
                propStruct.content.alignRow = 'right'
                // send({
                //     url: config.url.alignRow,
                //     body: JSON.stringify(sendArgs)
                // })
            }
        }
        if (status === 'comment') {
            propStruct = {
                customProp: {
                    comment: texts
                }
            }
        }
        await dispatch('A_CELLS_UPDATE', {
            propName: status,
            propStruct,
            coordinate: {
                startColAlias: colAlias,
                endColAlias: endcolAlias,
                startRowAlias: rowAlias,
                endRowAlias: endrowAlias,
            }
        })
        // 恢复到初始状态
        commit('M_INPUT_RESET')
        // 将单元格显示内容格式化
        function parseText(texts) {
            let text = texts
            if (date && isDate(text)) {
                text = formatText(rules, text)
            } else if (!date && isNum(text)) {
                text = formatText(rules, parseFloat(text, 10))
            }
            return text
        }
    }
}