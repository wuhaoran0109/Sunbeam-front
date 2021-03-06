let viewTypes = {
    mainRule: 'mainView',
    leftRule: 'leftView',
    topRule: 'topView',
    cornerRule: 'cornerView'
}

export default {
    frozenState(state, getters, rootState) {
        let alias = rootState.currentSheet
        let list = state.list
        let sheet
        for (let i = 0, len = list.length; i < len; i++) {
            if (list[i].alias === alias) {
                sheet = list[i]
                break
            }
        }
        return sheet.frozenState
    },
    getEditViewOccupy(state, getters, rootState) {
        return function(type) {
            let alias = rootState.currentSheet
            let list = state.list
            let sheet

            for (let i = 0, len = list.length; i < len; i++) {
                if (list[i].alias === alias) {
                    sheet = list[i]
                    break
                }
            }
            if (type == null) {
                return sheet.editViewOccupy
            } else {
                return sheet.editViewOccupy[viewTypes[type]]
            }
        }
    }
}