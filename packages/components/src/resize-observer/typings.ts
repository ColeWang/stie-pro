import type { ComponentPublicInstance, ExtractPropTypes, PropType } from 'vue'

export interface ResizeObserverRectSize extends Partial<DOMRectReadOnly> {
    width: number;
    height: number;
}

export interface ResizeObserverOnResize {
    (size: ResizeObserverRectSize): void;
}

export const resizeObserverProps = () => ({
    debounce: {
        type: Number as PropType<number>,
        default: 100
    },
    onResize: {
        type: Function as PropType<ResizeObserverOnResize>,
        default: undefined
    }
})

export interface ResizeObserverSlots {
    default?: any;
}

export type ResizeObserverProps = Partial<ExtractPropTypes<ReturnType<typeof resizeObserverProps>>>;
export type ResizeObserverInstance = ComponentPublicInstance<ResizeObserverProps>;
