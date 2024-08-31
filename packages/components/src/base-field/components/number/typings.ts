import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'
import type { BaseSlot } from '@site-pro/utils'
import type { BaseFieldFieldProps } from '../../typings'
import { baseFieldProps } from '../../typings'

export type FieldNumberFieldProps = BaseFieldFieldProps<'number'>;

export const fieldNumberProps = () => ({
    ...baseFieldProps(),
    fieldProps: {
        type: Object as PropType<FieldNumberFieldProps>,
        default: () => ({})
    }
})

export interface FieldNumberSlots {
    addonAfter?: any;
    addonBefore?: any;
    prefix?: any;
    upIcon?: any;
    downIcon?: any;
}

export type FieldNumberProps = Partial<ExtractPropTypes<ReturnType<typeof fieldNumberProps>>>;
export type FieldNumberInstance = ComponentPublicInstance<FieldNumberProps>;
