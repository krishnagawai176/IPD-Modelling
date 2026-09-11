type PageTitleProps = {
  eyebrow?: string;
  title: string;
  subtitle: string;
};

export default function PageTitle({ eyebrow, title, subtitle }: PageTitleProps) {
  return (
    <div className="page-title">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}
