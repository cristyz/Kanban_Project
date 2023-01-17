interface BaseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function BaseButton({ children, ...props }: BaseButtonProps) {
  return (
    <button className="base_button" {...props}>
      {children}
    </button>
  );
}
