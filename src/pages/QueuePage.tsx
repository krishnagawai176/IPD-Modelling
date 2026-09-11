import { ArrowRight, Check, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIPD } from "../context/IPDContext";
import PageTitle from "../components/common/PageTitle";

export default function QueuePage() {
  const { selectedModel, selected, variant } = useIPD();
  const navigate = useNavigate();
  return (
    <div className="narrow-page">
      <PageTitle
        eyebrow="STEP 03 / QUEUE"
        title="Assembly Queue"
        subtitle="Your IPD modelling request is ready for processing."
      />
      <div className="queue-card">
        <div className="queue-status">
          <span className="status-icon">
            <Clock3 size={22} />
          </span>
          <div>
            <span className="eyebrow">REQUEST STATUS</span>
            <h2>Queued for generation</h2>
            <p>Your request is waiting for processing.</p>
          </div>
          <span className="queued-pill">QUEUED</span>
        </div>
        <div className="summary-grid">
          <div>
            <span>Model</span>
            <b>{selectedModel?.id || "496-7140-MASTER MODEL"}</b>
          </div>
          <div>
            <span>Components</span>
            <b>{selected.size} of 45 selected</b>
          </div>
          <div>
            <span>Assemblies</span>
            <b>8</b>
          </div>
          <div>
            <span>Variants</span>
            <b>{variant ? 1 : 0}</b>
          </div>
        </div>
        <div className="queue-metrics">
          <div>
            <span>QUEUE POSITION</span>
            <b>#2</b>
          </div>
          <div>
            <span>ESTIMATED PROCESSING</span>
            <b>~45 seconds</b>
          </div>
        </div>
        <div className="timeline">
          {["Configuration complete", "Queued", "Processing", "Generated", "Delivered"].map(
            (item, index) => (
              <div className={index < 2 ? "complete" : ""} key={item}>
                <span>{index < 1 ? <Check size={14} /> : index === 1 ? "●" : "○"}</span>
                {item}
              </div>
            ),
          )}
        </div>
        <button className="primary wide" onClick={() => navigate("/generate")}>
          Start generation <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}
