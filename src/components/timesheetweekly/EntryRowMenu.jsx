import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

export default function EntryRowMenu({ onEdit, onDelete }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((value) => !value)}
                aria-label="Open entry menu"
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
                <MoreHorizontal className="w-4 h-4" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-7 z-20 w-24 rounded-lg border border-gray-200 bg-white py-1 shadow-md">
                        <button
                            onClick={() => { setOpen(false); onEdit && onEdit(); }}
                            className="w-full px-4 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => { setOpen(false); onDelete && onDelete(); }}
                            className="w-full px-4 py-1.5 text-left text-sm text-red-500 hover:bg-gray-50"
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
