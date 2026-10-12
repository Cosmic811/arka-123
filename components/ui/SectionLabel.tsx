export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <p className="section-label">
      <span aria-hidden="true">/{number}</span>
      {children}
    </p>
  );
}
