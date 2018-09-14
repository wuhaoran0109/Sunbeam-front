export default {
    isFrozen(state) {
        return function() {
            let frozen = state.list[0].frozen
            return (frozen.col.length > 0 || frozen.row.length > 0) ?
                true : false
        }
    },
    loaded(state) {
        return state.loaded
    },
    loadedIdxByAlias(state) {
        return function({
            alias,
            type
        }) {
            let loads = state.loaded[type.toLowerCase()]
            for (let i = 0, len = loads.length; i < len; i++) {
                let item = loads[i]
                if (alias === item) {
                    return i
                }
            }
            return -1
        }
    },
    max(state) {
        return state.max
    },
    offsetWidth(state) {
        return state.el.offsetWidth
    },
    offsetHeight(state) {
        return state.el.offsetHeight
    }
}