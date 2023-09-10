import { MyImageProps } from './MyImage'

export const shimmer = (w: number = 1280, h: number = 720) =>
  `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`

export const normalizeImageProps = (props: MyImageProps) => {
  const newProps = {}
  const wrongProps = ['wrapperWidth', 'wrapperHeigth', 'ar']

  Object.keys(props).forEach(prop => {
    if (!wrongProps.includes(prop)) {
      // @ts-ignore
      newProps[prop] = props[prop]
    }
  })

  return newProps
}
