import * as React from "react";
import { SvgXml } from "react-native-svg";

const getXmlString = (
  width?: number,
  height?: number,
  color?: string
): string => {
  return `
  <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="1.92578" cy="2.44641" r="1.5" fill="url(#paint0_linear_1954_2597)"/>
  <circle cx="1.92578" cy="8.21008" r="1.5" fill="url(#paint1_linear_1954_2597)"/>
  <circle cx="1.92578" cy="13.9757" r="1.5" fill="url(#paint2_linear_1954_2597)"/>
  <defs>
  <linearGradient id="paint0_linear_1954_2597" x1="2.90943" y1="-0.507724" x2="0.631659" y2="-0.156906" gradientUnits="userSpaceOnUse">
  <stop stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  </linearGradient>
  <linearGradient id="paint1_linear_1954_2597" x1="2.90943" y1="5.25595" x2="0.631659" y2="5.60677" gradientUnits="userSpaceOnUse">
  <stop stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  </linearGradient>
  <linearGradient id="paint2_linear_1954_2597" x1="2.90943" y1="11.0216" x2="0.631659" y2="11.3724" gradientUnits="userSpaceOnUse">
  <stop stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  <stop offset="1" stop-color="${color}"/>
  </linearGradient>
  </defs>
  </svg>  
  `;
};

export default ({ width, height, color }: any) => (
  <SvgXml xml={getXmlString(width, height, color)} />
);
