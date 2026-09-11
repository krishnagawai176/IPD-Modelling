import { Check } from "lucide-react";

const steps = ["Select Model", "Configure", "Generate", "Deliver"];

export default function WorkflowStepper({ currentPath }: { currentPath: string }) {
  const current =
    steps.findIndex((step) => currentPath.includes(step.toLowerCase().replace(" ", "-"))) + 1;

  return (
    <nav className="stepper" aria-label="IPD workflow">
      {steps.map((step, index) => (
        <span
          className={current === index + 1 ? "active" : current > index + 1 ? "done" : ""}
          key={step}
        >
          <i>{current > index + 1 ? <Check size={13} /> : index + 1}</i>
          {step}
        </span>
      ))}
    </nav>
  );
}
