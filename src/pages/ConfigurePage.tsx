import { useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, X } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { parts, useIPD } from "../context/IPDContext";
import PageTitle from "../components/common/PageTitle";
import ModelViewer from "../components/ModelViewer";

const namedParts = [
  "005-0947-01-D_004_COVER-TERMINAL",
  "014-COMMON-IPD-001",
  "022-0490-14-D_002",
  "024-0252-00-D_003",
  "028-8478-08-D_021",
  "028-9060-00-D_002",
  "032-7003-01-D_020",
  "050-0298-02-D_008",
  "052-7152-00-D_005",
  "074-0904-02-D_008",
  "074-7234-03-D_003",
  "077-0074-00-D_010",
  "083-0122-00-D_006",
];

function VariantModal({ close, save }: { close: () => void; save: (value: string) => void }) {
  const [value, setValue] = useState("497-2844-00-D_022-A");
  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={close} aria-label="Close">
          <X size={18} />
        </button>
        <span className="eyebrow">COMPONENT VARIANT</span>
        <h2>Choose a variant</h2>
        <p>497-2844-00-D_022 has 2 variants — pick one.</p>
        {[
          ["497-2844-00-D_022-A", "Manifold Assembly - Left Hand"],
          ["497-2844-00-D_022-B", "Manifold Assembly - Right Hand"],
        ].map(([id, description]) => (
          <label className={`variant-option ${value === id ? "active" : ""}`} key={id}>
            <input
              type="radio"
              name="variant"
              checked={value === id}
              onChange={() => setValue(id)}
            />
            <span>
              <b>{id}</b>
              <small>{description}</small>
            </span>
            <span className="radio-mark" />
          </label>
        ))}
        <div className="modal-actions">
          <button onClick={close}>Cancel</button>
          <button className="primary" onClick={() => save(value)}>
            Save variant <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfigurePage() {
  const { selectedModel, selected, setSelected, setVariant } = useIPD();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [assemblyExpanded, setAssemblyExpanded] = useState(true);
  const [modal, setModal] = useState(false);
  if (!selectedModel) return <Navigate to="/select-model" replace />;
  const toggle = (part: string) => {
    const next = new Set(selected);
    next.has(part) ? next.delete(part) : next.add(part);
    setSelected(next);
  };
  const group = [parts[13], ...parts.slice(14, 18)];
  const toggleAssembly = () => {
    const next = new Set(selected);
    const allSelected = group.every((part) => selected.has(part));
    group.forEach((part) => (allSelected ? next.delete(part) : next.add(part)));
    setSelected(next);
  };
  return (
    <div className="configure-page">
      <PageTitle
        eyebrow="STEP 02 / CONFIGURATION"
        title="Configure Model"
        subtitle="Choose the components and variants for this unit-specific assembly."
      />
      <div className="selected-strip">
        <span>SELECTED MASTER MODEL</span>
        <b>{selectedModel.id}</b>
        <span>{selectedModel.description}</span>
        <button className="text-button" onClick={() => navigate("/select-model")}>
          Change model
        </button>
      </div>
      <div className="configure-grid">
        <section className="tree-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">ASSEMBLY TREE</span>
              <h2>Components</h2>
            </div>
            <span className="tree-count">45 nodes · 8 assemblies</span>
          </div>
          <div className="tree-actions">
            <button onClick={() => setSelected(new Set(parts))}>Select all</button>
            <button onClick={() => setSelected(new Set())}>Unselect all</button>
          </div>
          <div className="tree-root">
            <button className="tree-group" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <b>{selectedModel.id}</b>
              <span>8 assemblies</span>
            </button>
            {expanded && (
              <div className="tree-children">
                {parts.map((part, index) =>
                  index > 13 && index < 18 ? null : index === 13 ? (
                    <div className="tree-branch" key={part}>
                      <div className="tree-item assembly">
                        <button
                          className="tree-toggle"
                          onClick={() => setAssemblyExpanded(!assemblyExpanded)}
                          aria-label={`${assemblyExpanded ? "Collapse" : "Expand"} assembly`}
                        >
                          {assemblyExpanded ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>
                        <input
                          type="checkbox"
                          checked={group.every((item) => selected.has(item))}
                          onChange={toggleAssembly}
                        />
                        <b>497-2844-00-D_022</b>
                        <span className="node-type">ASSEMBLY</span>
                      </div>
                      {assemblyExpanded && (
                        <div className="nested-children">
                          {parts.slice(14, 18).map((child) => (
                            <label className="tree-item nested" key={child}>
                              <input
                                type="checkbox"
                                checked={selected.has(child)}
                                onChange={() => toggle(child)}
                              />
                              <span className="part-dot" />
                              {child}
                              <span className="node-type">PART</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <label className="tree-item" key={part}>
                      <input
                        type="checkbox"
                        checked={selected.has(part)}
                        onChange={() => toggle(part)}
                      />
                      <span className="part-dot" />
                      {index < 13 ? namedParts[index] : part}
                      <span className="node-type">PART</span>
                    </label>
                  ),
                )}
              </div>
            )}
          </div>
          <div className="tree-footer">
            <span>
              <b>{selected.size}</b> of 45 selected
            </span>
            <span>37 components</span>
          </div>
        </section>
        <section className="preview-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">3D PREVIEW</span>
              <h2>Master assembly</h2>
            </div>
            <span className="live-tag">
              <span className="live-dot" /> INTERACTIVE
            </span>
          </div>
          <ModelViewer />
          <div className="preview-footer">
            <span>Drag to rotate · scroll to zoom</span>
            <button onClick={() => setModal(true)} className="variant-button">
              <span className="variant-dot" /> 1 variant available <ChevronRight size={15} />
            </button>
          </div>
        </section>
      </div>
      <div className="bottom-bar">
        <span style={{ paddingLeft: 8 }}>
          <b>{selected.size}</b> components selected <small>· Ready to queue</small>
        </span>
        <button className="primary" disabled={!selected.size} onClick={() => navigate("/generate")}>
          Start generation <ArrowRight size={17} />
        </button>
      </div>
      {modal && (
        <VariantModal
          close={() => setModal(false)}
          save={(value) => {
            setVariant(value);
            setModal(false);
          }}
        />
      )}
    </div>
  );
}
