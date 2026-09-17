const fs = require('fs');

const jsContent = `(function(){const y=document.createElement("link").relList;if(y&&y.supports&&y.supports("modulepreload"))return;for(const w of document.querySelectorAll('link[rel="modulepreload"]'))d(w);new MutationObserver(w=>{for(const B of w)if(B.type==="childList")for(const V of B.addedNodes)V.tagName==="LINK"&&V.rel==="modulepreload"&&d(V)}).observe(document,{childList:!0,subtree:!0});function O(w){const B={};return w.integrity&&(B.integrity=w.integrity),w.referrerPolicy&&(B.referrerPolicy=w.referrerPolicy),w.crossOrigin==="use-credentials"?B.credentials="include":w.crossOrigin==="anonymous"?B.credentials="omit":B.credentials="same-origin",B}function d(w){if(w.ep)return;w.ep=!0;const B=O(w);fetch(w.href,B)}})();
// ... I need to copy the full JS here, but wait, it's too big.
`;
