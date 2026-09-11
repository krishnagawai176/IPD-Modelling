import { useState } from "react";
import { ArrowRight, Cuboid, Ruler, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockModels, type Model } from "../data/mockModels";
import { useIPD } from "../context/IPDContext";
import { Button } from "../components/ui/button";
import type { ModelSearchMode } from "../components/models/ModelSearchTabs";

function distance(model: Model, input: number[]) {
  return model.dimensions.reduce(
    (total, value, index) => total + Math.abs(value - (input[index] || value)) / value,
    0,
  );
}

function matchPercentage(model: Model, input: number[]) {
  return Math.max(0, 100 - (distance(model, input) / model.dimensions.length) * 100);
}

export default function SelectModelPage() {
  const { setSelectedModel } = useIPD();
  const navigate = useNavigate();
  const [mode, setMode] = useState<ModelSearchMode>("model");
  const [query, setQuery] = useState("");
  const [dims, setDims] = useState(["1200", "800", "650"]);
  const [searched, setSearched] = useState(false);
  let results =
    mode === "dimensions"
      ? mockModels
      : mockModels.filter(
          (model) =>
            !query ||
            model.id.toLowerCase().includes(query.toLowerCase()) ||
            model.description.toLowerCase().includes(query.toLowerCase()),
        );
  if (mode === "dimensions" && searched) {
    const input = dims.map(Number);
    results = [...mockModels]
      .sort((a, b) => distance(a, input) - distance(b, input))
      .map((model) => ({ ...model, match: matchPercentage(model, input) }));
  }
  const findByDimensions = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(true);
  };
  const choose = (model: Model) => {
    setSelectedModel(model);
    navigate("/configure");
  };
  const changeMode = (nextMode: ModelSearchMode) => {
    setMode(nextMode);
    setSearched(false);
  };

  return (
    <div className="select-page compact-model-page">
      <span className="eyebrow model-library-breadcrumb">STEP 01 / MODEL LIBRARY</span>
      <div className="model-toolbar">
        {mode === "model" && (
          <label className="search-input">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Model number or name"
            />
          </label>
        )}
        <Button className="create-model-button" onClick={() => navigate("/create-model")}>
          Create model <ArrowRight size={16} />
        </Button>
      </div>
      <div className="model-library-layout">
        <section className="results">
          <div className="results-heading">
            <div>
              <span className="eyebrow">AVAILABLE MODELS</span>
              <h2>{results.length} results</h2>
            </div>
            <span className="sort-label">
              SORTED BY <b>{mode === "dimensions" ? "CLOSEST MATCH" : "MODEL NUMBER"}</b>
            </span>
          </div>
          {results.length ? (
            results.map((model) => (
              <button className="model-card" key={model.id} onClick={() => choose(model)}>
                <span className="model-icon">
                  <Cuboid size={23} />
                </span>
                <span className="model-info">
                  <b>{model.id}</b>
                  <span>{model.description}</span>
                  <small>{model.dimensions.join(" × ")} mm</small>
                </span>
                <span className="match">
                  {model.master
                    ? "MASTER"
                    : `${model.match ? model.match.toFixed(model.match % 1 ? 1 : 0) : "—"}%`}
                  <small>{model.master ? "full assembly" : "match"}</small>
                </span>
                <ArrowRight size={18} />
              </button>
            ))
          ) : (
            <div className="empty-state">
              <Search size={25} />
              <b>No models match your search.</b>
              <span>Try a partial model number.</span>
            </div>
          )}
        </section>
        <aside className={`dimensions-sidebar ${mode === "dimensions" ? "active" : ""}`}>
          <button
            className="dimensions-trigger"
            onClick={() => changeMode(mode === "dimensions" ? "model" : "dimensions")}
          >
            <Ruler size={17} />
            <span>
              <b>Search by dimensions</b>
              <small>Find the closest matching model</small>
            </span>
            <ArrowRight size={16} />
          </button>
          {mode === "dimensions" && (
            <form className="dimension-form" onSubmit={findByDimensions}>
              {["Length", "Width", "Height"].map((label, index) => (
                <label key={label}>
                  {label} (mm)
                  <input
                    value={dims[index]}
                    onChange={(event) =>
                      setDims(
                        dims.map((item, itemIndex) =>
                          itemIndex === index ? event.target.value : item,
                        ),
                      )
                    }
                  />
                </label>
              ))}
              <button className="primary wide" type="submit">
                Find models <ArrowRight size={16} />
              </button>
              <small>Lists the closest models, not only exact matches.</small>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
