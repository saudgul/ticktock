import React from "react";

const BrandPanel = () => {
  return (
    <div className="hidden md:flex flex-col justify-center px-12 lg:px-20 bg-brand text-brand-foreground">
      <h2 className="mb-4 font-sans text-[40px] font-semibold tracking-normal align-middle">
        ticktock
      </h2>
      <p className="max-w-xl font-sans text-base font-normal leading-[150%] tracking-normal text-gray-200">
        Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
      </p>
    </div>
  );
};

export default BrandPanel;