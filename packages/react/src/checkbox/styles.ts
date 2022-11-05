import { css, keyframes } from '@stitches/react'

export const checkbox = css({
  display: 'inline-flex',
  alignItems: 'flex-start',
  lineHeight: '18px',
  fontSize: 14,
  variants: {
    disabled: {
      false: {
        cursor: 'pointer',
      },
      true: {
        cursor: 'not-allowed',
        opacity: 0.6,
      },
    },
  },
})

export const label = css({
  paddingLeft: 8,
  cursor: 'inherit',
})

export const checkboxInner = css({
  position: 'relative',
  width: 18,
  height: 18,
  color: '#fff',
  flex: 'none',
  variants: {
    disabled: {
      true: {
        color: 'rgba(0,0,0,.4)',
      },
    },
  },
})

export const checkedIconWrapper = css({
  position: 'absolute',
  inset: 0,
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  variants: {
    disabled: {
      true: {
        color: 'rgba(0,0,0,.4)',
      },
    },
  },
})

export const checkedIcon = css({
  display: 'block',
  fill: 'currentColor',
  width: '1em',
  height: '1em',
  fontSize: 10,
})

export const checkedKeyframes = keyframes({
  '0%': {
    opacity: 0,
    transform: 'scale(0)',
  },

  '90%': {
    opacity: 1,
    transform: 'scale(1.1)',
  },

  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
})

export const checkedMotion = css({
  '&-enter': {
    opacity: 0,
  },
  '&-enter-active': {
    animation: `${checkedKeyframes} 0.24s cubic-bezier(0.22, 0.61, 0.36, 1)`,
    animationDelay: '0.2s',
  },
  '&-leave': {
    animation: `${checkedKeyframes} 0.24s cubic-bezier(0.22, 0.61, 0.36, 1) reverse`,
  },
})

export const checkboxInput = css({
  appearance: 'none',
  position: 'relative',
  margin: 0,
  padding: 0,
  display: 'inline-block',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  border: '1px solid #d6d6d6',
  borderRadius: 4,
  outline: 0,
  backgroundColor: '#fff',
  cursor: 'inherit',
  transition: 'background-color 0.2s ease-in, border-color 0.2s ease-in',

  '&::before': {
    content: '',
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 'inherit',
    backgroundColor: '#fff',
    transform: 'scale(1)',
    transition: 'transform 0.2s ease-in',
  },

  variants: {
    checked: {
      true: {
        borderColor: 'var(--are-color-blue)',
        backgroundColor: 'var(--are-color-blue)',

        '&::before': {
          transform: 'scale(0)',
        },
      },
    },
    checkedDisabled: {
      true: {
        borderColor: '#ccc',
        backgroundColor: '#ddd',

        '&::before': {
          transform: 'scale(0)',
        },
      },
    },
    disabled: {
      false: {
        '&:hover': {
          borderColor: 'var(--are-color-blue)',
        },
      },
      true: {
        borderColor: '#ccc',
        backgroundColor: '#ddd',
      },
    },
  },
})
