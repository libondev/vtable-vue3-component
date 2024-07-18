import { h, render } from 'vue'
import type { IEditor, RectProps, EditContext } from '@visactor/vtable-editors'
import CustomInput from './CustomInput.vue'

export interface InputEditorConfig {
  readonly?: boolean;
}

export class InputEditor implements IEditor {
  editorType: string = 'Input';
  editorConfig?: InputEditorConfig;
  container!: HTMLElement | null;
  rootEl!: HTMLElement | null;
  exposed: any
  value = '';

  constructor(editorConfig?: InputEditorConfig) {
    this.editorConfig = editorConfig;
  }

  _createElement() {

    const div = Object.assign(document.createElement('div'), {
      className: 'absolute',
    })

    /**
     * vue2 渲染组件:
      const CompConstructor = Vue.extend(CustomInput) // CustomInput 是一个 Vue 组件
      const instance = new CompConstructor({ el: document.createElement('div') })

      // 或者用 new Vue() 的形式创建

      instance.$slots.default = [vnode]
      target.appendChild(instance.$el)
     */

    const updateView = () => {
      const vn = h(CustomInput, {
        modelValue: this.value,
        'onUpdate:modelValue': (newModelValue) => {
          this.value = newModelValue
          updateView()
        }
      })

      render(vn, div)
    }

    updateView()

    this.rootEl = div
    // @ts-expect-error This attribute will be added inside vue
    this.exposed = div._vnode.component.exposed
    this.container!.appendChild(div)
  }

  _adjustPosition(rect: RectProps) {
    this.rootEl!.style.cssText += `
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
    `
  }

  // 获取编辑器当前值。将在 `onEnd` 调用后调用
  getValue() {
    return this.value
  }

  setValue(value: string) {
    this.value = value
  }

  //  校验输入新值是否合法, 退出前调用
  validateValue() {
    return !!this.value
  }

  // 判断是否需要取消编辑模式
  isEditorElement(target: HTMLElement) {
    return this.rootEl!.contains(target);
  }

  // 单元格进入编辑状态时调用
  onStart({ value, referencePosition, container }: EditContext<string>) {
    this.container = container;

    this.setValue(value);

    // 如果还没创建则创建
    if (!this.rootEl) {
      this._createElement();

      // 如果有参考位置，则调整元素展示的位置
      if (referencePosition?.rect) {
        this._adjustPosition(referencePosition.rect);
      }
    }

    // 拿到组件内部暴露的方法
    this.exposed.inputRef.value.focus()
  }

  // 单元格退出编辑状态时调用
  onEnd() {
    this.container!.removeChild(this.rootEl!);
    this.container = null
    this.exposed = null
    this.rootEl = null;
  }
}
