export function copyColors(colors) {
  if (!colors) {
    return
  }

  navigator.clipboard?.writeText?.(
    `background-image: linear-gradient(135deg, ${colors.join(', ')})`
  )
}
