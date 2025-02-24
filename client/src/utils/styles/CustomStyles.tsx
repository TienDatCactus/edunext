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
