import { MagicText } from "@/components/ui/magic-text";

const Demo = () => {
  return (
    <>
      <div className="relative mt-[70rem] flex items-center justify-center pb-[30rem]">
        <MagicText
          text="Hi there! I'm preet, creator of HextaUI. Thank you so much of all the support and love you've shown me. I hope you enjoy using HextaUI as much as I enjoyed creating it."
        />
      </div>
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2">Scroll Down</p>
    </>
  );
};

export { Demo };
