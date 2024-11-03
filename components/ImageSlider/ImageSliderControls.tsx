import { memo, MouseEventHandler } from "react";

type ImageSliderControlsProps = {
  className: string;
  leftControlClickHandler: MouseEventHandler<HTMLButtonElement>;
  rightControlClickHandler: MouseEventHandler<HTMLButtonElement>;
};

const ImageSliderControls = memo(
  ({
    className,
    leftControlClickHandler,
    rightControlClickHandler,
  }: ImageSliderControlsProps) => {
    console.log("rerender");
    return (
      <div className={`${className} flex justify-between items-center`}>
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={leftControlClickHandler}
        >
          &#x276E;
        </button>
        <button
          data-theme="cmyk"
          className="btn btn-circle hover:bg-primary border border-neutral"
          onClick={rightControlClickHandler}
        >
          &#x276F;
        </button>
      </div>
    );
  }
);

export default ImageSliderControls;
