import { useState } from "react";

function InfoIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 bg-gray-400 rounded-full text-white text-[9px] font-bold ml-1 cursor-default">
      i
    </span>
  );
}

function SelectCaret() {
  return (
    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
      <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    </span>
  );
}

export default function AddTaskModal({ onClose, onSave, day }) {
  const [project, setProject] = useState("");
  const [type, setType] = useState("Bug fixes");
  const [desc, setDesc] = useState("");
  const [hours, setHours] = useState(12);
  const [saving, setSaving] = useState(false);

  function handleSubmit() {
    if (!project) return;
    setSaving(true);
    setTimeout(() => {
      onSave({ id: Date.now(), date: day, description: desc || "New Task", hours, project });
      setSaving(false);
    }, 300);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg bg-white rounded-md  shadow-lg overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900 tracking-tight">Add New Entry</span>
            <button
              onClick={onClose}
              className="w-7 h-7 bg-transparent border-none text-gray-400 rounded-md flex items-center justify-center cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
         
        </div>

        {/* Body */}
        <div className="px-6 pb-4 flex flex-col gap-4 ">
          {/* Select Project */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-2">
              Select Project * <InfoIcon />
            </label>
            <div className="relative max-w-[280px]">
              <select
                value={project}
                onChange={e => setProject(e.target.value)}
                className={`${project ? 'text-gray-700' : 'text-gray-400'} w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm outline-none cursor-pointer transition-colors`}
              >
                <option value="" disabled>Project Name</option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
                <option value="Project C">Project C</option>
              </select>
              <SelectCaret />
            </div>
          </div>

          {/* Type of Work */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-800 mb-2">
              Type of Work * <InfoIcon />
            </label>
            <div className="relative max-w-[280px]">
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-gray-700 outline-none cursor-pointer transition-colors"
              >
                <option value="Bug fixes">Bug fixes</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="QA">QA</option>
              </select>
              <SelectCaret />
            </div>
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Task description *</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Write text here ..."
              rows={6}
              className="w-full resize-none border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 leading-6 outline-none transition"
            />
            <p className="mt-1 text-xs text-gray-400">A note for extra info</p>
          </div>

          {/* Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Hours *</label>
            <div className="flex items-center w-fit border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setHours(v => Math.max(1, v - 1))}
                className="w-9 h-9 bg-white border-none text-gray-900 font-semibold flex items-center justify-center cursor-pointer"
              >−</button>
              <div className="min-w-[44px] text-center text-sm font-medium text-gray-400 border-l border-r border-gray-300 h-9 leading-[36px] bg-white">
                {hours}
              </div>
              <button
                type="button"
                onClick={() => setHours(v => v + 1)}
                className="w-9 h-9 bg-white border-none text-gray-900 font-semibold flex items-center justify-center cursor-pointer"
              >+</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
         
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className={`flex-1 bg-blue-600 text-white rounded-lg py-3 text-sm font-medium shadow-md ${saving ? 'opacity-60 cursor-default' : 'cursor-pointer'}`}>
              {saving ? "Adding..." : "Add entry"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-lg py-3 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}