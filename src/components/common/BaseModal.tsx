import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { FaXmark } from "react-icons/fa6";

export const Modal = ({
  visible,
  title,
  titleClassName,
  closeButton,
  className,
  children,
  onCancel,
}: {
  visible: boolean;
  title?: string;
  titleClassName?: string;
  closeButton?: boolean;
  className?: string;
  children: React.ReactNode;
  onCancel: () => void;
}): JSX.Element => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "transform overflow-hidden p-6 sm:p-8 sm:w-fit sm:min-w-[400px] align-middle transition-all bg-white rounded-2xl",
                  className
                )}
              >
                {closeButton && (
                  <div className="absolute top-5 right-5">
                    <FaXmark
                      width={20}
                      height={20}
                      onClick={onCancel}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                {title && (
                  <Dialog.Title className={twMerge(titleClassName)}>
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
