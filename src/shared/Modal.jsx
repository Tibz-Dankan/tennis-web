import React, { useState, Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "../icons/CloseIcon";

const ModalOverlay = (props) => {
  return (
    <div
      className="fixed inset-0 top-0 left-0 z-[800] h-full w-full 
      bg-[rgba(0,0,0,0.5)]"
      onClick={props.onClose}
    />
  );
};

const ModalContent = (props) => {
  return (
    <div
      className={twMerge(
        `z-[1000] rounded-md bg-gray-100 p-0  relative
         transition-all animate-pops shadow-[0px_10px_20px_rgba(0,0,0,0.25)]`,
        props.className
      )}
    >
      <span onClick={props.onClose} className="absolute top-2 right-2">
        <CloseIcon className="text-gray-600 cursor-pointer" />
      </span>
      {props.content}
    </div>
  );
};

export const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = () => setIsOpen(() => !isOpen);
  const onCloseHandler = () => setIsOpen(() => !isOpen);

  const createAppendPortalElement = () => {
    const portalElement = document.createElement("div");

    portalElement.setAttribute("id", "portal");
    const body = document.body;
    body.appendChild(portalElement);
  };
  createAppendPortalElement();

  useEffect(() => {
    const autoCloseHandler = () => {
      const isClosed = props.closed !== undefined && props.closed;
      if (!isClosed) return;
      setIsOpen(() => !isClosed);
    };

    autoCloseHandler();
  }, [props.closed]);

  return (
    <Fragment>
      <>
        <div onClick={() => onOpenHandler()}>{props?.openModalElement}</div>

        {isOpen &&
          ReactDOM.createPortal(
            <div
              className="fixed top-0 left-0 z-[800] flex h-[100vh] 
              w-[100vw] items-center justify-center transition-all"
            >
              <ModalOverlay onClose={() => onCloseHandler()} />
              <ModalContent
                content={props.children}
                onClose={() => onCloseHandler()}
                className={props?.className}
              />
            </div>,
            document.getElementById("portal")
          )}
      </>
    </Fragment>
  );
};
