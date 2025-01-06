export const modalStyles = {
  content: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  mask: {
    backdropFilter: "blur(8px)",
    background: "rgba(0, 0, 0, 0.3)",
  },
  wrapper: {
    backgroundColor: "transparent",
  },
};

export const Glassmorphism =
  "[&_.ant-modal-content]:bg-white/70  [&_.ant-modal-content]:backdrop-blur-md [&_.ant-modal-content]:shadow-xl [&_.ant-modal-header]:bg-transparent [&_.ant-modal-footer]:bg-transparent [&_.ant-modal-mask]:bg-black/30 [&_.ant-modal-mask]:backdrop-blur-sm";

export const CustomTabs =
  "[&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-nav-wrap]:px-14 [&_.ant-tabs-tab]:mb-4 [&_.ant-tabs-nav-wrap]:border-b [&_.ant-tabs-nav-wrap]:border-[#ccc] [&_.ant-tabs-tab-active]:shadow-lg [&_.ant-tabs-tab]:rounded-md [&_.ant-tabs-tab-active]:border-blue-500 [&_.ant-tabs-tab-btn]:flex [&_.ant-tabs-tab-btn]:items-center [&_.ant-tabs-tab-btn]:text-[16px] [&_.ant-tabs-tab]:bg-white [&_.ant-tabs-nav_.ant-tabs-nav-list_.ant-tabs-tab-active]:!bg-blue-50";

export const CustomPaperCard = `h-[260px]  min-h-[260px] shadow-lg relative box-border bg-[#ffffff] bg-[linear-gradient(#ffffff_1.1rem,_#ccc_1.2rem)] [background-size:100%_1.2rem] rounded-[10px] cursor-pointer after:absolute after:content-[""] after:bottom-[10px] after:w-2/5 after:h-[10px] after:[box-shadow:0_5px_14px_rgba(0,_0,_0,_0.7)] after:[transition:all_0.3s_ease] before:left-[15px] before:-skew-x-[5deg] before:-rotate-[5deg] after:right-[15px] after:skew-x-[5deg] after:rotate-[5deg] after:[box-shadow:0_2px_14px_rgba(0,_0,_0,_0.4)]after:[box-shadow:0_2px_14px_rgba(0,_0,_0,_0.4)] `;
