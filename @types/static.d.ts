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

declare module 'eslint-plugin-react-hooks';
declare module 'eslint-plugin-simple-import-sort';
declare module 'eslint-plugin-import';
