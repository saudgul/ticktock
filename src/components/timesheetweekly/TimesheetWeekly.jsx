import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import InfoIcon from "./InfoIcon";
import EntryRowMenu from "./EntryRowMenu";
import SelectCaret from "./SelectCaret";
import AddTaskModal from "./AddTaskModal";
import Footer from "../Footer";
import API from "../../services/api";

const FALLBACK_WEEK = {
    week: 4,
    date: "22 - 26 January, 2024",
    startDate: "2024-01-22",
    endDate: "2024-01-26",
};

function formatDayLabel(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
}

function buildWeekDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
        return ["Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26"];
    }

    const days = [];
    const cursor = new Date(start);
    while (cursor <= end) {
        days.push(formatDayLabel(cursor));
        cursor.setDate(cursor.getDate() + 1);
    }
    return days;
}

function buildInitialEntries(weekDays, mode) {
    if (mode === "create") {
        return [];
    }

    const template = [
        "Homepage Development",
        "API Integration",
        "Code Review",
        "Bug Fixes",
        "Documentation",
    ];

    return weekDays.flatMap((day, index) => {
        const count = index % 2 === 0 ? 2 : 1;
        return Array.from({ length: count }, (_, taskIndex) => ({
            id: `${day.replace(/\s+/g, "-")}-${index}-${taskIndex}`,
            date: day,
            description: template[(index + taskIndex) % template.length],
            project: `Project ${String.fromCharCode(65 + ((index + taskIndex) % 3))}`,
            hours: ((index + taskIndex) % 8) + 1,
        }));
    });
}

export default function TimesheetWeekly() {
    const location = useLocation();
    const mode = location.state?.mode || "view";
    const selectedWeek = location.state?.week || FALLBACK_WEEK;
    const weekDays = buildWeekDays(selectedWeek.startDate, selectedWeek.endDate);

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalDay, setModalDay] = useState(null);

    useEffect(() => {
        let active = true;

        setLoading(true);
        setError("");

        if (mode === "create") {
            setEntries([]);
            setLoading(false);
            return undefined;
        }

        API.getTimesheetEntries(selectedWeek.week)
            .then((response) => {
                if (active) {
                    setEntries(response.data);
                }
            })
            .catch((requestError) => {
                if (!active) {
                    return;
                }

                setError(requestError.message || "Failed to load timesheet entries");
                setEntries([]);
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, [mode, selectedWeek.week]);

    const totalHours = entries.reduce((sum, entry) => sum + (entry.hours || 0), 0);
    const maxHours = 40;
    const progressPct = Math.min(100, Math.round((totalHours / maxHours) * 100));

    const entriesByDay = {};
    weekDays.forEach((day) => {
        entriesByDay[day] = [];
    });
    entries.forEach((entry) => {
        if (entriesByDay[entry.date]) entriesByDay[entry.date].push(entry);
    });

    function handleDelete(id) {
        API.deleteTimesheetEntry(selectedWeek.week, id).then(() => {
            setEntries((prev) => prev.filter((entry) => entry.id !== id));
        });
    }

    function handleSave(newEntry) {
        API.createTimesheetEntry(selectedWeek.week, newEntry).then((response) => {
            setEntries((prev) => [...prev, response.data]);
            setShowModal(false);
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-6 px-6">
         
          
            <main className="flex flex-col w-full justify-center items-center">
               
                   
                        <div className="w-full max-w-7xl rounded-xl border border-gray-100 bg-white pb-4 px-4 shadow-sm">
                            <div className="mb-1 flex items-start justify-between ">
                                <h2 className="text-2xl font-bold text-gray-900 pt-4 ">This week’s timesheet</h2>
                                <div className="flex flex-col items-center gap-3 pt-2">
                                    <div className="relative rounded border border-gray-100 bg-white px-4 py-2 shadow-md">
                                        <span className="block text-center text-sm font-medium text-slate-900" >
                                            {totalHours}/{maxHours} hrs
                                        </span>
                                        <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[14px] border-t-[14px] border-x-transparent border-t-white" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-[188px] h-[4px] overflow-hidden rounded-sm bg-gray-200">
                                            <div className="h-full rounded-sm" style={{ width: `${progressPct}%`, backgroundColor: "#fb923c" }} />
                                        </div>
                                        <span className="text-right text-xs font-medium text-slate-500" style={{ fontFamily: "Inter", lineHeight: "150%", width: "40px" }}>
                                            {progressPct}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="mb-8 text-sm font-normal text-gray-500">{selectedWeek.date}</p>

                            {loading && (
                                <p className="mb-6 text-sm text-gray-500">Loading entries...</p>
                            )}

                            {error && (
                                <p className="mb-6 text-sm text-red-500">{error}</p>
                            )}

                            <div className="flex flex-col gap-6">
                                {weekDays.map((day) => {
                                    const dayEntries = entriesByDay[day];

                                    return (
                                        <div key={day} className="grid grid-cols-[96px_1fr] gap-4 items-start">
                                            <div className="pt-2 text-lg font-semibold text-gray-900">{day}</div>

                                            <div className="flex flex-col">
                                                {dayEntries.map((entry) => (
                                                    <div key={entry.id} className="mb-3 rounded-lg border border-gray-200 bg-white px-4 py-3 ">
                                                        <div className="flex items-center">
                                                            <span className="flex-1 text-base font-medium text-gray-900">{entry.description}</span>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm font-normal text-gray-400">{entry.hours} hrs</span>
                                                                <span className="whitespace-nowrap rounded-md px-2.5 py-0.5 text-xs font-medium text-blue-800 border border-blue-200 bg-blue-100">
                                                                    {entry.project}
                                                                </span>
                                                                <EntryRowMenu onDelete={() => handleDelete(entry.id)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    onClick={() => { setModalDay(day); setShowModal(true); }}
                                                    className="mt-1 flex h-12 w-full items-center justify-center gap-1.5 rounded-lg border-2 hover:border border-dashed hover:border-blue-700 border-gray-300 hover:bg-blue-100 text-base font-medium hover:text-blue-500 text-gray-500 transition-colors"
                                                >
                                                    <span className="text-base leading-none">+</span>
                                                    <span>Add new task</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                          

                            {showModal && <AddTaskModal day={modalDay} onClose={() => setShowModal(false)} onSave={handleSave} />}
                        </div>
                  
               
            </main>
            <Footer/>
          
        </div>
    );
}