export function Icon({ name, className = "", filled }: { name: string; className?: string; filled?: boolean }) {
  return (
    <span aria-hidden="true" className={`icon ${filled ? "icon-filled" : ""} ${className}`}>
      {name}
    </span>
  );
}

export function Stars({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex text-tertiary ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" filled className={size === 20 ? "text-[20px]" : "text-[16px]"} />
      ))}
    </div>
  );
}
