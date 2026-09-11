import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Cuboid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

export default function CreateModelPage() {
  const navigate = useNavigate();
  const [created, setCreated] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreated(true);
  };

  if (created) {
    return (
      <div className="create-model-page">
        <div className="create-success">
          <span className="success-icon">
            <Check size={24} />
          </span>
          <span className="eyebrow">MODEL LIBRARY</span>
          <h1>Model created successfully</h1>
          <p>Your model has been added to the workspace. CAD geometry can be connected later.</p>
          <button className="primary" onClick={() => navigate("/select-model")}>
            Return to model library <ArrowRight size={17} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-model-page">
      <button className="back-link" onClick={() => navigate("/select-model")}>
        <ArrowLeft size={16} /> Back to model library
      </button>
      <PageTitle
        eyebrow="MODEL LIBRARY / NEW MODEL"
        title="Create a Model"
        subtitle="Add a master model definition for future unit configurations."
      />
      <form className="create-model-form" onSubmit={submit}>
        <div className="form-heading">
          <span className="model-icon">
            <Cuboid size={23} />
          </span>
          <div>
            <h2>Model details</h2>
            <p>Enter the basic information for this master assembly.</p>
          </div>
        </div>
        <div className="form-fields">
          <label>
            Model number
            <input required placeholder="MTTH-0060-IAA-177" />
          </label>
          <label>
            Model description
            <input required placeholder="Medium Temp, Air Cooled, 6.0 HP" />
          </label>
          <fieldset>
            <legend>Overall dimensions (mm)</legend>
            <div className="dimension-fields">
              <label>
                Length
                <input required type="number" min="1" placeholder="1200" />
              </label>
              <label>
                Width
                <input required type="number" min="1" placeholder="800" />
              </label>
              <label>
                Height
                <input required type="number" min="1" placeholder="650" />
              </label>
            </div>
          </fieldset>
        </div>
        <div className="cad-note">
          <Cuboid size={17} />
          <span>
            <b>CAD geometry</b>
            <small>STEP, STL, or GLTF files can be connected after the model is created.</small>
          </span>
        </div>
        <div className="form-actions">
          <button type="button" className="secondary" onClick={() => navigate("/select-model")}>
            Cancel
          </button>
          <button type="submit" className="primary">
            Create model <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </div>
  );
}
