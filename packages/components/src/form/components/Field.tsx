import type { App, ComponentPublicInstance, CSSProperties, ExtractPropTypes, PropType, SlotsType } from 'vue'
import { defineComponent, unref } from 'vue'
import { Form } from 'ant-design-vue'
import type { BaseSlot, NamePath } from '@site-pro/utils'
import { namePathToString, toPx } from '@site-pro/utils'
import { has, isArray, isNumber, isString, merge, omit, pick } from 'lodash-es'
import type { ColWrapperProps } from '../../base-form'
import { ColWrapper, useFormInstance } from '../../base-form'
import { genFormItemFixStyle } from '../../share-utils'
import type { BaseFieldFormItemProps, BaseFieldProps } from '../../base-field'
import { BaseField, baseFieldProps } from '../../base-field'

const SIZE_ENUM: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
    xs: 104,
    sm: 216,
    md: 328,
    lg: 440,
    xl: 552
}

export type FieldSizeType = Extract<keyof typeof SIZE_ENUM, any> | number;

export type FieldSlots = SlotsType<{
    default?: BaseSlot;
    extra?: BaseSlot;
    help?: BaseSlot;
    label?: BaseSlot;
    tooltip?: BaseSlot;
}>

export const fieldProps = () => ({
    ...baseFieldProps(),
    width: {
        type: [String, Number] as PropType<FieldSizeType>,
        default: undefined
    },
    labelWidth: {
        type: [String, Number] as PropType<'auto' | number>,
        default: 'auto'
    },
    hidden: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    colProps: {
        type: Object as PropType<ColWrapperProps>,
        default: () => ({})
    }
})

export type FieldProps = Partial<ExtractPropTypes<ReturnType<typeof fieldProps>>>;
export type FieldInstance = ComponentPublicInstance<FieldProps>;

function fieldStyle (
    style: CSSProperties | undefined,
    fieldWidth: FieldSizeType,
    sizeEnum: Record<string, number>
): CSSProperties {
    const { maxWidth, minWidth, width, ...restStyle } = style || {}
    const fieldSize: string | undefined = isNumber(fieldWidth)
        ? toPx(fieldWidth)
        : toPx(sizeEnum[fieldWidth])

    return {
        ...restStyle,
        maxWidth: maxWidth || '100%',
        minWidth: minWidth || toPx(sizeEnum['xs']),
        width: width || fieldSize || '100%'
    }
}

const Field = defineComponent({
    inheritAttrs: false,
    name: 'ProField',
    props: fieldProps(),
    slots: Object as FieldSlots,
    setup (props, { slots }) {
        const SLOTS_KEYS: string[] = ['extra', 'help', 'label', 'tooltip']

        const { model, formProps, setModelValue } = useFormInstance()

        // 初始化值 防止 form 报错
        const { name: fieldNamePath } = props.formItemProps
        fieldNamePath && setDefaultValue(fieldNamePath)

        function setDefaultValue (namePath: NamePath): void {
            const hasValue = has(unref(model), namePath)
            !hasValue && onUpdateValue(namePath, undefined)
        }

        function onUpdateValue (namePath: NamePath, value: any): void {
            if (isString(namePath) || isArray(namePath)) {
                setModelValue && setModelValue(namePath, value)
            }
        }

        return () => {
            const { fieldProps, formItemProps, width: fieldWidth, labelWidth, hidden, colProps } = props
            const { layout, grid } = unref(formProps) || {}

            const extraFormItemProps: any = genFormItemFixStyle(labelWidth, layout || 'vertical')
            const key: string = namePathToString(formItemProps.name!)

            const needFieldProps: any = {
                ...fieldProps,
                style: fieldStyle(fieldProps.style, fieldWidth!, SIZE_ENUM),
                ['onUpdate:value']: onUpdateValue.bind(null, formItemProps.name!)
            }

            const needFormItemProps: BaseFieldFormItemProps = merge({
                ...formItemProps,
                key: key,
                model: unref(model)
            }, extraFormItemProps)

            const needBaseFieldProps: BaseFieldProps = {
                ...(pick(props, Object.keys(BaseField.props)) as BaseFieldProps),
                fieldProps: needFieldProps,
                formItemProps: needFormItemProps
            }

            const needColWrapProps: ColWrapperProps = {
                ...colProps,
                hidden: hidden,
                grid: grid,
            }

            const formItemSlots = pick(slots, SLOTS_KEYS)
            const baseFieldSlots = omit(slots, SLOTS_KEYS)

            return (
                <ColWrapper {...needColWrapProps} key={key}>
                    <Form.Item {...needFormItemProps} v-slots={formItemSlots}>
                        <BaseField {...needBaseFieldProps} v-slots={baseFieldSlots}/>
                    </Form.Item>
                </ColWrapper>
            )
        }
    }
})

Field.install = function (app: App): App {
    app.component(Field.name as string, Field)
    return app
}

export default Field
