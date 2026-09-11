import { useEffect, useState } from "react";
import { ArrowRight, Check, Cuboid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

export default function GeneratePage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setProgress((value) => Math.min(100, value + 5)), 500);
    return () => window.clearInterval(timer);
  }, []);
  const stageIndex =
    progress < 20
      ? 0
      : progress < 40
        ? 1
        : progress < 60
          ? 2
          : progress < 78
            ? 3
            : progress < 92
              ? 4
              : 5;
  const stages = [
    "Preparing master model",
    "Processing selected components",
    "Applying variants",
    "Building assembly",
    "Validating geometry",
    "Preparing delivery",
  ];
  return (
    <div className="generation-page">
      <PageTitle
        eyebrow="STEP 03 / GENERATION"
        title="Generating IPD Model"
        subtitle="Building your unit-specific 3D assembly."
      />
      <div className="generation-layout">
        <div className="generation-meter">
          <div className="meter-top">
            <span>{progress === 100 ? "Generation complete" : "Generating..."}</span>
            <b>{progress}%</b>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="generation-orbit">
            <div className="orbit-ring" />
            <Cuboid size={42} />
          </div>
          {progress === 100 ? (
            <div className="success-message">
              <Check size={18} /> Generation completed successfully.
            </div>
          ) : (
            <p className="generation-note">
              This mock process simulates the CAD generation pipeline.
            </p>
          )}
        </div>
        <section className="stage-panel">
          <span className="eyebrow">PROCESSING PIPELINE</span>
          {stages.map((stage, index) => (
            <div
              className={
                index < stageIndex || progress === 100
                  ? "stage done"
                  : index === stageIndex
                    ? "stage current"
                    : "stage"
              }
              key={stage}
            >
              <span>
                {index < stageIndex || progress === 100 ? (
                  <Check size={15} />
                ) : index === stageIndex ? (
                  "●"
                ) : (
                  "○"
                )}
              </span>
              <b>{stage}</b>
              <small>
                {index < stageIndex || progress === 100
                  ? "Complete"
                  : index === stageIndex
                    ? "In progress"
                    : "Waiting"}
              </small>
            </div>
          ))}
          {progress === 100 && (
            <button className="primary wide" onClick={() => navigate("/deliver")}>
              View 3D model <ArrowRight size={17} />
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
