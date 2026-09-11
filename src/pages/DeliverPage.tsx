import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIPD } from "../context/IPDContext";
import ModelViewer from "../components/ModelViewer";
import PageTitle from "../components/common/PageTitle";

export default function DeliverPage() {
  const { selectedModel, selected, variant } = useIPD();
  const navigate = useNavigate();
  return (
    <div className="deliver-page">
      <PageTitle
        eyebrow="STEP 04 / DELIVERY"
        title="Your IPD Model is Ready"
        subtitle="Your unit-specific 3D assembly has been generated successfully."
      />
      <div className="delivery-grid">
        <section className="delivery-viewer">
          <div className="viewer-heading">
            <span className="live-tag">
              <span className="live-dot" /> GENERATED MODEL
            </span>
            <button className="icon-button" aria-label="Fullscreen viewer">
              ⛶
            </button>
          </div>
          <ModelViewer />
        </section>
        <aside className="delivery-info">
          <span className="success-chip">
            <Check size={14} /> Generated successfully
          </span>
          <h2>{selectedModel?.id || "496-7140-MASTER MODEL"}</h2>
          <p>{selectedModel?.description || "Master model · full 3D assembly"}</p>
          <div className="delivery-stats">
            <div>
              <b>{selected.size}</b>
              <span>Components</span>
            </div>
            <div>
              <b>8</b>
              <span>Assemblies</span>
            </div>
            <div>
              <b>{variant ? 1 : 0}</b>
              <span>Variants</span>
            </div>
          </div>
          <button
            className="primary wide"
            onClick={() =>
              alert("CAD export will be available once AutoCAD integration is connected.")
            }
          >
            Download 3D model <ArrowRight size={17} />
          </button>
          <button className="secondary wide" onClick={() => navigate("/select-model")}>
            Start new configuration
          </button>
          <small className="export-note">
            CAD export will be available once AutoCAD integration is connected.
          </small>
        </aside>
      </div>
    </div>
  );
}
