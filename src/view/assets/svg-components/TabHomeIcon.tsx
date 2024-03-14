import * as React from "react";
import { SvgXml } from "react-native-svg";

const getXmlString = (width?: number, height?: number, color?: string): string => {
  return `
  <svg width="21" height="23" viewBox="0 0 21 23" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.4867 0.722656C10.2746 0.722656 10.0698 0.799632 9.91032 0.939276L0.576987 9.10594C0.483218 9.18802 0.408064 9.28919 0.356556 9.40267C0.305048 9.51615 0.278375 9.63932 0.27832 9.76394V21.4306C0.27832 21.6627 0.370507 21.8852 0.534602 22.0493C0.698696 22.2134 0.921256 22.3056 1.15332 22.3056H6.98665C7.21872 22.3056 7.44128 22.2134 7.60537 22.0493C7.76947 21.8852 7.86165 21.6627 7.86165 21.4306V16.7639C7.86165 16.0677 8.13822 15.4001 8.6305 14.9078C9.12278 14.4155 9.79046 14.1389 10.4867 14.1389C11.1828 14.1389 11.8505 14.4155 12.3428 14.9078C12.8351 15.4001 13.1117 16.0677 13.1117 16.7639V21.4306C13.1117 21.6627 13.2038 21.8852 13.3679 22.0493C13.532 22.2134 13.7546 22.3056 13.9867 22.3056H19.82C20.0521 22.3056 20.2746 22.2134 20.4387 22.0493C20.6028 21.8852 20.695 21.6627 20.695 21.4306V9.76394C20.6949 9.63932 20.6683 9.51615 20.6168 9.40267C20.5652 9.28919 20.4901 9.18802 20.3963 9.10594L11.063 0.939276C10.9035 0.799632 10.6987 0.722656 10.4867 0.722656Z" fill="url(#paint0_linear_1028_6451)"/>
  <defs>
  <linearGradient id="paint0_linear_1028_6451" x1="17.181" y1="-9.73885" x2="1.64157" y2="-7.47484" gradientUnits="userSpaceOnUse">
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
