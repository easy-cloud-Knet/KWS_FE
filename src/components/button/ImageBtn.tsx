import React from "react";

import "./ImageBtn.css";

interface ImageBtnProps {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
  id?: string;
  size?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

/**
 * 이미지 버튼 component
 * @param {*} props
 * @param {string} props.src - 이미지 src
 * @param {string} props.alt - 이미지 alt
 * @param {function} props.onClick - 버튼 onClick
 * @param {string} [props.className] - 버튼 className
 * @param {string} [props.id] - 버튼 id
 * @param {string} [props.size] - 이미지 width, height
 * @param {React.ImgHTMLAttributes<HTMLImageElement>} [props.imgProps] - 이미지 추가 전달 props. imgProps={{ style: { width: "100px" } }}
 * @returns {React.ReactElement}
 */
const ImageBtn: React.FC<ImageBtnProps> = ({
  src,
  alt,
  onClick,
  className = "",
  id = "",
  size,
  imgProps = {},
}) => {
  const { style: imgStyle, ...restImgProps } = imgProps;

  return (
    <button id={id} className={`${className} image-btn c-pointer`} onClick={onClick}>
      <img
        src={src}
        alt={alt}
        style={size ? { width: `${size}`, height: `${size}`, ...imgStyle } : { ...imgStyle }}
        {...restImgProps}
      />
    </button>
  );
};

export default ImageBtn;
