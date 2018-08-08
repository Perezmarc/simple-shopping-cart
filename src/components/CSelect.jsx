import Vue from 'vue';

export const CSelect = Vue.extend({
  functional: false,
  render (h) {
    const classes = 
      `${this.classes} ${this.type} ${this.disabled ? 'disabled ' : '' }`;

    return (
      <select
        class={'c-select ' + classes}
        on-input={($event) => this.$emit('input', $event.target.value)} 
      >
        {this.$slots.default}
      </select>
    )

  },
  props: {
    value: {
      type: String | Number | undefined,
      default: undefined
    },
    type: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: undefined
    }
  }
})