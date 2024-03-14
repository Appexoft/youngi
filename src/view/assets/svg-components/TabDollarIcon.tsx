import * as React from "react";
import { SvgXml } from "react-native-svg";

const getXmlString = (
  width?: number,
  height?: number,
  color?: string
): string => {
  return `
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1028_6443)">
  <path d="M12.4863 1.09717V23.0972" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.4863 5.09717H9.98633C9.05807 5.09717 8.16783 5.46592 7.51145 6.12229C6.85508 6.77867 6.48633 7.66891 6.48633 8.59717C6.48633 9.52543 6.85508 10.4157 7.51145 11.072C8.16783 11.7284 9.05807 12.0972 9.98633 12.0972H14.9863C15.9146 12.0972 16.8048 12.4659 17.4612 13.1223C18.1176 13.7787 18.4863 14.6689 18.4863 15.5972C18.4863 16.5254 18.1176 17.4157 17.4612 18.072C16.8048 18.7284 15.9146 19.0972 14.9863 19.0972H6.48633" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
  <clipPath id="clip0_1028_6443">
  <rect width="24" height="24" fill="white" transform="translate(0.486328 0.097168)"/>
  </clipPath>
  </defs>
  </svg>
  
  `;
};

export default ({ width, height, color }: any) => (
  <SvgXml xml={getXmlString(width, height, color)} />
);
