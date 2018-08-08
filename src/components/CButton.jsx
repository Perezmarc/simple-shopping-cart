import Vue from 'vue';

export const CButton = Vue.extend({
  functional: true,

  render (h, ctx) {
    const classes = 
      `c-button ${ctx.props.color} ${ctx.props.outline ? 'outline' : '' } ${ctx.props.disabled ? 'disabled' : '' }`
    return h(
      'button',
      {
        class: classes,
        on: ctx.props.disabled ? undefined : ctx.listeners
      },
      [ctx.children]
    )
  }
})