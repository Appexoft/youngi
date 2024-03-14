import * as React from "react";
import { SvgXml } from "react-native-svg";

const getXmlString = (
  width?: number,
  height?: number,
  color?: string
): string => {
  return `
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1028_6446)">
  <path d="M9.48633 22.0972C10.0386 22.0972 10.4863 21.6495 10.4863 21.0972C10.4863 20.5449 10.0386 20.0972 9.48633 20.0972C8.93404 20.0972 8.48633 20.5449 8.48633 21.0972C8.48633 21.6495 8.93404 22.0972 9.48633 22.0972Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.4863 22.0972C21.0386 22.0972 21.4863 21.6495 21.4863 21.0972C21.4863 20.5449 21.0386 20.0972 20.4863 20.0972C19.934 20.0972 19.4863 20.5449 19.4863 21.0972C19.4863 21.6495 19.934 22.0972 20.4863 22.0972Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1.48633 1.09717H5.48633L8.16633 14.4872C8.25777 14.9476 8.50824 15.3611 8.87387 15.6555C9.23951 15.9498 9.69703 16.1062 10.1663 16.0972H19.8863C20.3556 16.1062 20.8131 15.9498 21.1788 15.6555C21.5444 15.3611 21.7949 14.9476 21.8863 14.4872L23.4863 6.09717H6.48633" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_1028_6446">
  <rect width="24" height="24" fill="white" transform="translate(0.486328 0.097168)"/>
  </clipPath>
  </defs>
  </svg>  
  `;
};

export default ({ width, height, color }: any) => (
  <SvgXml xml={getXmlString(width, height, color)} />
);
