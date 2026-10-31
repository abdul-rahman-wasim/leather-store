import { ICON_NAMES } from "@/lib/icons";

export function Icon({ name, className = "", filled }: { name: string; className?: string; filled?: boolean }) {
  if (process.env.NODE_ENV !== "production" && !ICON_NAMES.has(name)) {
    console.error(`Icon "${name}" is missing from ICON_NAMES in src/lib/icons.ts; it will render as text.`);
  }
  return (
    <span aria-hidden="true" className={`icon ${filled ? "icon-filled" : ""} ${className}`}>
      {name}
    </span>
  );
}

export function Stars({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex text-secondary ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" filled className={size === 20 ? "text-[20px]" : size === 18 ? "text-[18px]" : "text-[16px]"} />
      ))}
    </div>
  );
}
