import type { VNodeChild } from 'vue'
import { createVNode, isVNode } from 'vue'
import { Badge as AntBadge, Space as AntSpace } from 'ant-design-vue'
import { compact, isArray, isNumber, isObject, isString, map, reduce, set } from 'lodash-es'
import type { BaseEnumType, BaseFieldNames, BaseOptionType } from './types'
import { isEmpty } from './is'

export function enumToOptions (valueEnum?: BaseEnumType): BaseOptionType[] {
    const result: (BaseOptionType | undefined)[] = map(valueEnum || {} as BaseEnumType, (item, key) => {
        if (isEmpty(item)) return undefined
        if (isObject(item) && item.text) {
            const { text, disabled } = item
            return { value: key, label: text, disabled }
        }
        return { value: key, label: item }
    })
    return compact(result)
}

export function optionsToEnum (options?: BaseOptionType[], fieldNames?: BaseFieldNames): BaseEnumType {
    const { value = 'value', label = 'label', children = 'children' } = fieldNames || {}

    const traverseOptions = (values: BaseOptionType[] = [], result: BaseEnumType) => {
        return reduce(values, (_, option) => {
            const key = option[value], text = option[label]
            if (!(isEmpty(key) || isEmpty(text))) {
                set(result, key, text)
            }
            const curChildren = option[children]
            if (isArray(curChildren) && curChildren.length !== 0) {
                traverseOptions(curChildren, result)
            }
            return result
        }, result)
    }

    return traverseOptions(options || [], {} as BaseEnumType)
}

export function enumToText (text: BaseOptionType | VNodeChild, valueEnum: BaseEnumType): VNodeChild {
    if (isEmpty(text) || isVNode(text)) return text
    if (isObject(text) && (text as BaseOptionType).label) return (text as BaseOptionType).label
    if (isArray(text)) {
        const children: VNodeChild[] = compact(text).map((value) => {
            return enumToText(value, valueEnum)
        })
        return createVNode(AntSpace, { size: 2, wrap: true }, {
            default: () => children,
            split: () => ','
        })
    }
    if (isString(text) || isNumber(text)) {
        const plain: string | number | BaseEnumType = valueEnum[text]
        if (plain && isObject(plain)) {
            return createVNode(AntBadge, { ...plain })
        }
        return isEmpty(plain) ? text : plain
    }
    return text as VNodeChild
}
