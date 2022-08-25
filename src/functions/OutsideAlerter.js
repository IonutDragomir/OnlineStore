import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, message, setDisplay) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert(message, "You clicked outside of me!");
        if (message !== "closed") {
          setDisplay("closed");
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [message]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.display, props.closeFunction);

  return <div style={{display: "inline-block"}} ref={wrapperRef}>{props.children}</div>;
}
