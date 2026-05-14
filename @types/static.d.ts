declare type SvgrComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const svgComponent: SvgrComponent;
  export default svgComponent;
}

declare module '*.ico' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
