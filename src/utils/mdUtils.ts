// index는 number 아니면 object(null) 입니다.
export const existIndex = (index: number) => {
    return typeof index === 'number' && index !== 0
}

export const parseFile = (slug: string) => {
    const slugs = slug.split('__')
    return {
        index: slugs.length > 1 ? Number(slugs[0]) : 0,
        filename: slugs.length > 1 ? slugs[1] : slugs[0],
    }
}

export const sortByIndexAndLabel = items => {
    return items.sort(function(a, b) {
        if (a.index < b.index) return -1
        if (a.index > b.index) return 1
        if (a.label < b.label) return -1
        if (a.label > b.label) return 1
        return 0
    })
}
