import "./style.scss";
import ReactDOM from "react-dom";

export interface BaseModalProps {
  title: string;
  children?: React.ReactNode;
  isOpenState: [boolean, (isOpen: boolean) => void];
}

export function BaseModal({
  title,
  children,
  isOpenState: [isOpen, setIsOpen],
}: BaseModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div onClick={() => setIsOpen(false)} className="base_modal__backdrop">
      <div className="base_modal" onClick={(e) => e.stopPropagation()}>
        <div className="base_modal__header">
          <h2 className="base_modal__header__title">{title}</h2>
          <button
            className="base_modal__header__close"
            onClick={() => setIsOpen(false)}
          >
            &#10006;
          </button>
        </div>

        <div className="base_modal__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}
