declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  // eslint-disable-next-line import/no-default-export
  export default content;
}

// declare module 'reanimated-confetti';

// declare module '*.svg' {
//   import {SvgProps} from 'react-native-svg';
//   const content: React.StatelessComponent<SvgProps>;
//   export default content;
// }
