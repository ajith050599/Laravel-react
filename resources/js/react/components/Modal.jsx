import { createPortal } from "react-dom";

const Modal = ({
    isOpen,
    onClose,
    header,
    body,
    footer,
    children,
    width = "max-w-md" // default small size
}) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-xl shadow-xl w-[90%] ${width} p-6 relative`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                {children ? children : (
                    <>
                        {header && <div className="text-lg font-semibold text-gray-800 mb-3">{header}</div>}
                        {body && <div className="text-gray-700 mb-4">{body}</div>}
                        {footer && (
                            <div className="flex justify-end gap-2  pt-3 mt-3">
                                {footer}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};


export default Modal;
