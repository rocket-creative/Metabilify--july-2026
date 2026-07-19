import Link from "next/link";
import { Logo } from "./Logo";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "on-green";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "on-green"
        ? "btn-on-green"
        : "btn-primary";

  return (
    <Link href={href} className={`btn ${variantClass} ${className}`}>
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export function FormButton({
  type = "submit",
  children,
  disabled,
  className = "",
}: {
  type?: "submit" | "button";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-primary disabled:opacity-60 ${className}`}
    >
      <span>{children}</span>
      <span className="arrow" aria-hidden="true">
        →
      </span>
    </button>
  );
}

export { Logo };
