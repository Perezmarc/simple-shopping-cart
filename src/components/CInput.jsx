import Vue from 'vue';

export const CInput = Vue.extend({
  functional: false,
  render (h) {
    const classes = 
      `${this.classes} ${this.type} ${this.disabled ? 'disabled ' : '' }`;

    return (
      <input
        class={'c-input ' + classes}
        on-input={($event) => this.$emit('input', $event.target.value)} 
        
      />
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