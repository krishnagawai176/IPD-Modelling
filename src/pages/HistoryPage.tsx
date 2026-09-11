import { History } from "lucide-react";
import PageTitle from "../components/common/PageTitle";

const jobs = [
  ["10 Sept 2026 19:31", "496-7140-MASTER MODEL", "42 components", "Running..."],
  ["10 Sept 2026 19:13", "496-7140-MASTER MODEL", "45 components", "1 min 36 s"],
  ["10 Sept 2026 18:36", "MTTH-0036-IAA-177", "11 components", "38 s"],
  ["10 Sept 2026 17:54", "MTTL-0042-IAA-160", "12 components", "41 s"],
  ["10 Sept 2026 17:11", "Storage_Tank_ASM", "10 components", "27 s"],
  ["10 Sept 2026 16:06", "MTTH-0051-IAA-177", "11 components", "44 s"],
  ["10 Sept 2026 15:09", "M6TL-0018-IAA-118", "7 components", "31 s"],
  ["10 Sept 2026 14:13", "MTTH-0075-IAA-200", "13 components", "52 s"],
];

export default function HistoryPage() {
  return (
    <div className="history-page">
      <PageTitle
        eyebrow="OPERATIONS / HISTORY"
        title="Assembly Generation History"
        subtitle="All past jobs submitted through IPD Modelling"
      />
      <div className="history-summary">
        <div>
          <span>Total jobs</span>
          <b>8</b>
        </div>
        <div>
          <span>Completed</span>
          <b>7</b>
        </div>
        <div>
          <span>Running</span>
          <b className="orange">1</b>
        </div>
        <div>
          <span>Avg duration</span>
          <b>47 s</b>
        </div>
      </div>
      <section className="history-table">
        <div className="table-top">
          <h2>Recent jobs</h2>
          <button className="secondary">
            <History size={15} /> Refresh
          </button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Submitted</th>
                <th>Model</th>
                <th>Configuration</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job[0]}>
                  <td>{String(index + 1).padStart(2, "0")}</td>
                  <td>{job[0]}</td>
                  <td>
                    <b>{job[1]}</b>
                  </td>
                  <td>{job[2]}</td>
                  <td>{job[3]}</td>
                  <td>
                    <span className={`table-status ${index === 0 ? "running" : ""}`}>
                      {index === 0 ? "Running" : "Done"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
